package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/xuri/excelize/v2"
)

var categorySheetsCount int
var itemsSheetsCount int
var catalogueCategories []CatalogueCategory

type Configuration struct {
	PostgresqlHost     string
	PostgresqlUsername string
	PostgresqlPassword string
	PostgresqlDatabase string
}

type CatalogueCategory struct {
	ID        int32
	ID_parent *int32
	Name      string
	Code      string
	Groups    []CatalogueCatgeoryGroup
}

type CatalogueCatgeoryGroup struct {
	ID         int32
	Name       string
	Properties []CatalogueCategoryProperty
}

type CatalogueCategoryProperty struct {
	ID       int32
	Name     string
	ID_group int32
}

type CatalogCategoryPropertyType struct {
	ID    int32
	Name  string
	IsLOV bool
}

var pgPool *pgxpool.Pool
var connErr error

var excelFile *excelize.File
var execlErr error

var totalStart time.Time

func main() {

	if len(os.Args) == 1 {
		fmt.Println("Please specify the file name as a first cmd-line argument")
	} else {
		totalStart = time.Now()
		//init excel file
		fileName := os.Args[1]

		fmt.Printf("Process file: %s", fileName)
		fmt.Println()
		fmt.Println("_________________________________________________________________________")

		excelFile, execlErr = excelize.OpenFile(fileName)
		if execlErr != nil {
			fmt.Println(execlErr)
			return
		}
		defer func() {
			if execlErr := excelFile.Close(); execlErr != nil {
				fmt.Println(execlErr)
			}
		}()

		//load configuration
		file, _ := os.Open("settings.json")
		defer file.Close()
		decoder := json.NewDecoder(file)
		configuration := Configuration{}
		errC := decoder.Decode(&configuration)
		if errC != nil {
			fmt.Println("error:", errC)
		}

		//init postgresql
		connString := "postgres://" + configuration.PostgresqlUsername + ":" + configuration.PostgresqlPassword + "@" + configuration.PostgresqlHost + "/" + configuration.PostgresqlDatabase
		pgPool, connErr = pgxpool.Connect(context.Background(), connString)
		if connErr != nil {
			fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", connErr)
			os.Exit(1)
		}
		defer pgPool.Close()

		//we get all catgories from DB and cache it in memory to speedup the process - minimize DB access
		getAndCacheAllCategories()

		//so we have regular excel file and now we can process this file
		//we will start by extracting sheet names
		sheetNames := excelFile.GetSheetList()

		// we expect two types of sheets:
		// 1. Catalogue category definition sheet - this type of sheet has to have "Property name" on position A1 and "Category" on the position B1
		// 2. Catalogue items data sheet - this type of sheet has to have "Catalogue items" in the name - could be wherever you want
		// We are processing the sheets in the index order in the Workbook so it is recommended to have the sheets with a definition of categories first and then the catalogue items sheets
		for _, name := range sheetNames {

			//lets detect the type of sheet and depending on the type do the job
			sheetType := detectTypeOfSheet(name)

			switch sheetType {
			case 0:
				fmt.Printf("Sheet %s ignored - not valid sheet.", name)
				fmt.Println()
				fmt.Println("_________________________________________________________________________")
			case 1:
				processCatalogueCategorySheet(name)
			}

			//fmt.Println("_________________________________________________________________________")
		}

		totalEnd := time.Now()
		fmt.Println("Total category sheets processed: ", categorySheetsCount)
		fmt.Println("Total duration: ", totalEnd.Sub(totalStart).String())
	}
}

func getAndCacheAllCategories() error {
	rows, err := pgPool.Query(context.Background(), `SELECT tcc.id , tcc.id_parent , tcc.name , tcc.code  FROM panda.t_catalog_category tcc;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()
		fmt.Println("Start reading all categories: ", nextRow)
		for {
			if nextRow {
				category := CatalogueCategory{}
				errScan := rows.Scan(&category.ID, &category.ID_parent, &category.Name, &category.Code)
				if errScan == nil {
					catalogueCategories = append(catalogueCategories, category)
				} else {
					fmt.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	return nil
}

//this funtion check if the category exists by passing name as a parameter
func existCategoryByName(name string) (bool, int32) {
	var resultExists bool
	var resultID int32

	for i := range catalogueCategories {

		if strings.Contains(strings.ToLower(catalogueCategories[i].Name), strings.ToLower(name)) {
			resultExists = true
			resultID = catalogueCategories[i].ID

			break
		}
	}

	return resultExists, resultID
}

func processCatalogueCategorySheet(sheetName string) {

	//job start log
	fmt.Printf("Job: Process catalogue category sheet: %s", sheetName)
	fmt.Println()
	start := time.Now()
	fmt.Printf("Started at: %s", start.String())
	fmt.Println()

	//get category and parent cateogry names
	categoryName, _ := excelFile.GetCellValue(sheetName, "B4")
	parentCategoryName, _ := excelFile.GetCellValue(sheetName, "C4")

	//lets find if this category exist - if so do nothing
	var categoryExists, categoryID = existCategoryByName(categoryName)
	//if category doesnt exist -> create into the DB -> get back new id and store in memory
	if !categoryExists {
		id, err := createCatalogueCategory(categoryName)
		categoryID = id
		if err != nil {
			fmt.Println("ERROR: ", err)
		}
	}
	//now lets have a look on parent category
	//check if already exists such a category
	//if parent name is empty do nothing
	if parentCategoryName != "" {

		var parentExists, parentID = existCategoryByName(parentCategoryName)

		//if doesnt create this category first
		if !parentExists {
			id, err := createCatalogueCategory(parentCategoryName)
			if err != nil {
				fmt.Println("ERROR: ", err)
			}
			parentID = id
		}
		//finally set parent id to the category - we are doing it everytime for sure
		setCategoryParentID(categoryID, parentID)

	}
	//job end log
	end := time.Now()
	fmt.Printf("Finished at: %s", end.String())
	fmt.Println()
	fmt.Printf("Job duration: %s", end.Sub(start).String())
	fmt.Println()
	fmt.Println("_________________________________________________________________________")
	categorySheetsCount++
}

func setCategoryParentID(categoryID, parentID int32) error {
	//first set it into the DB
	updateQuery := `UPDATE panda.t_catalog_category SET id_parent = $2 WHERE id = $1`
	_, err := pgPool.Exec(context.Background(), updateQuery, categoryID, parentID)
	if err != nil {
		return err
	}
	//then to the memory
	for i := range catalogueCategories {

		if catalogueCategories[i].ID == categoryID {
			catalogueCategories[i].ID_parent = &parentID
			break
		}
	}

	return nil
}

func createCatalogueCategory(categoryName string) (int32, error) {
	var newID int32
	//one thing is to add category into the database
	//in the second step we have to add category to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		insertQuery := `INSERT INTO panda.t_catalog_category (id_parent, "name", code) VALUES (NULL,$1, $1)`
		_, err := tx.Exec(context.Background(), insertQuery, categoryName)
		if err != nil {
			return newID, err
		}
		//we are interested in a new record id
		newIdQuery := `SELECT LASTVAL()`
		newIdRowErr := tx.QueryRow(context.Background(), newIdQuery).Scan(&newID)
		if newIdRowErr != nil {
			return newID, newIdRowErr
		}
		commitErr := tx.Commit(context.Background())
		if commitErr != nil {
			return newID, commitErr
		}
		//so after succesfull insert into db we can add the record to the memory
		newCategory := CatalogueCategory{}
		newCategory.Name = categoryName
		newCategory.Code = categoryName
		newCategory.ID = newID
		catalogueCategories = append(catalogueCategories, newCategory)
	} else {
		return newID, txErr
	}

	return newID, nil
}

// detection of the sheet type
// we return 0,1,2 :
// 0 = nor category def. or items data sheet
// 1 = Catalogue category definition sheet
// 2 = Catalogue items data sheet
func detectTypeOfSheet(sheetName string) int {
	if strings.Contains(strings.ToLower(sheetName), "catalogue items") {
		return 2
	} else {
		A1, err := excelFile.GetCellValue(sheetName, "A1")
		if err != nil {
			return 0
		}
		B1, err := excelFile.GetCellValue(sheetName, "B1")
		if err != nil {
			return 0
		}
		if strings.Contains(strings.ToLower(A1), "property name") && strings.Contains(strings.ToLower(B1), "category") {
			return 1
		}

		return 0
	}
}

func normalizeHeader(headerValue string) string {
	result := headerValue

	if brIdx := strings.Index(headerValue, "["); brIdx > -1 {
		result = headerValue[0:brIdx]
	}
	result = strings.TrimSpace(result)

	return result
}
