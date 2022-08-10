package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/fatih/color"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/xuri/excelize/v2"
)

var categorySheetsCount int
var itemsSheetsCount int
var catalogueCategories []CatalogueCategory
var catalogueUnits []CatalogCategoryPropertyUnit
var cataloguePropertyTypes []CatalogCategoryPropertyType
var catalogueLOVs []CatalogCategoryPropertyTypeLOV
var manufacturers []Manufacturer
var catalogueItems []CatalogueItem
var catalogueItemValues []CatalogueItemValue

// var catalogueCategoryGroups []CatalogueCatgeoryGroup
// var catalogueCatgeoryProperties []CatalogueCategoryProperty

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
	ID          int32
	Name        string
	ID_category int32
	Properties  []CatalogueCategoryProperty
}

type CatalogueCategoryProperty struct {
	ID               int32
	Name             string
	AllowCustomValue bool
	DefaultValue     *string
	ID_group         int32
	ID_unit          *int32
	ID_property_type int32
}

type CatalogCategoryPropertyUnit struct {
	ID   int32
	Name string
}

type CatalogCategoryPropertyType struct {
	ID    int32
	Name  string
	IsLOV bool
}

type CatalogCategoryPropertyTypeLOV struct {
	ID               int32
	Name             string
	ID_property_type int32
}

type Manufacturer struct {
	ID   int32
	Name string
}

type CatalogueItem struct {
	ID         int32
	Name       string
	CategoryID int32
}

type CatalogueItemValue struct {
	ID_item     int32
	ID_property int32
}

var pgPool *pgxpool.Pool
var connErr error

var excelFile *excelize.File
var execlErr error

var totalStart time.Time

var okPrint, errPrint, infoPrint, warningPrint color.Color

func main() {

	okPrint = *color.New(color.FgGreen)
	errPrint = *color.New(color.FgRed)
	infoPrint = *color.New(color.FgHiBlue)
	warningPrint = *color.New(color.FgYellow)

	if len(os.Args) == 1 {
		errPrint.Println("Please specify the file name as a first cmd-line argument")
	} else {
		totalStart = time.Now()
		//init excel file
		fileName := os.Args[1]

		infoPrint.Printf("Process file: %s", fileName)
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
			errPrint.Fprintf(os.Stderr, "Unable to connect to database: %v\n", connErr)
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
				warningPrint.Printf("Sheet %s ignored.", name)
				fmt.Println()
				infoPrint.Println("_________________________________________________________________________")
			case 1:
				processCatalogueCategorySheet(name)
			case 2:
				processCatalogueItemsSheet(name)
			}
		}
	}

	totalEnd := time.Now()
	infoPrint.Println("Total category sheets processed: ", categorySheetsCount)
	infoPrint.Println("Total catalogue items sheets processed: ", itemsSheetsCount)
	infoPrint.Println("Total duration: ", totalEnd.Sub(totalStart).String())
}

func processCatalogueItemsSheet(sheetName string) {
	//job start log
	infoPrint.Printf("Job: Process catalogue items sheet: %s", sheetName)
	fmt.Println()
	start := time.Now()
	fmt.Printf("Started at: %s", start.String())
	fmt.Println()
	itemsProcessed := 0
	//first get category and its properties(to the top most parent)
	categoryName, catErr := excelFile.GetCellValue(sheetName, "A1")
	if catErr != nil {
		errPrint.Println("Cant read category from the sheet: ", sheetName)
	} else {
		catExists, categoryID := existCategoryByName(categoryName)
		if !catExists {
			errPrint.Println("Cant find category by name: ", categoryName)
		} else {
			var allCategories []CatalogueCategory
			cateogry := existingCategoryByID(categoryID)
			allCategories = append(allCategories, *cateogry)
			var parentID *int32 = cateogry.ID_parent
			for parentID != nil {
				cateogry = existingCategoryByID(*parentID)
				allCategories = append(allCategories, *cateogry)
				parentID = cateogry.ID_parent
			}
			// //now we have all relevant categories, so we can start to process excel rows
			rows, _ := excelFile.GetRows(sheetName)
			if len(rows) > 2 {
				//read header
				headerRow := rows[1]
				var headerProps map[int]string = make(map[int]string)
				if len(headerRow) > 5 {
					for c := 5; c < len(headerRow); c++ {
						headerProps[c] = normalizeHeader(headerRow[c])
					}
				}
				//go row by row
				for r := 2; r < len(rows); r++ {
					//first 5 columns are fixed - general catalogue item properties
					itemName := strings.TrimSpace(rows[r][0])
					itemDescription := strings.TrimSpace(rows[r][1])
					manufacturerName := strings.TrimSpace(rows[r][2])
					manufacturerPartNumber := strings.TrimSpace(rows[r][3])
					manufacturerURL := strings.TrimSpace(rows[r][4])
					//check manufacturer
					manufacturerID, manErr := checkAndGetManufacturerID(manufacturerName)
					if manErr != nil {
						errPrint.Println(manErr)
					} else {
						//lets check and/or create catalogue item
						catalogueItemID, catErr := checkAndGetCatalogueItemID(categoryID, itemName, itemDescription, manufacturerID, manufacturerPartNumber, manufacturerURL)
						if catErr != nil {
							errPrint.Println(catErr)
						} else {
							itemsProcessed++

							//now we will go column by column and process each property
							for c := 5; c < len(rows[r]); c++ {
								propName := headerProps[c]
								if propName != "" {
									var propFound bool
									for catIdx := 0; catIdx < len(allCategories); catIdx++ {
										propExists, propID := existCategoryGroupPropertyByCategoryIDAndPropName(allCategories[catIdx].ID, propName)
										if propExists {
											propValErr := checkAndCreateCatalogueItemValue(catalogueItemID, propID, strings.TrimSpace(rows[r][c]))
											if propValErr != nil {
												errPrint.Println(propValErr)
											} else {
												propFound = true
											}
										}
									}
									if !propFound && !strings.Contains(propName, "EUN") {
										errPrint.Println("Property not found: ", propName)
									}
								}
							}
						}
					}
				}
			}
		}
	}

	//job end log
	end := time.Now()

	fmt.Println("Catalogue items processed: ", itemsProcessed)
	fmt.Printf("Finished at: %s", end.String())
	fmt.Println()
	fmt.Printf("Job duration: %s", end.Sub(start).String())
	fmt.Println()

	infoPrint.Println("_________________________________________________________________________")
	itemsSheetsCount++
}

func processCatalogueCategorySheet(sheetName string) {

	//job start log
	infoPrint.Printf("Job: Process catalogue category sheet: %s", sheetName)
	fmt.Println()
	start := time.Now()
	fmt.Printf("Started at: %s", start.String())
	fmt.Println()

	//get category and parent cateogry names
	categoryName, _ := excelFile.GetCellValue(sheetName, "B4")
	parentCategoryName, _ := excelFile.GetCellValue(sheetName, "C4")

	//lets find if this category exist - if so do nothing
	//we have to traverse up the tree to the root category - id_parent == NULL
	var categoryExists, categoryID = existCategoryByName(categoryName)
	//if category doesnt exist -> create into the DB -> get back new id and store in memory
	if !categoryExists {
		id, err := createCatalogueCategory(categoryName)
		categoryID = id
		if err != nil {
			errPrint.Println("ERROR: ", err)
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
				errPrint.Println("ERROR: ", err)
			}
			parentID = id
		}
		//finally set parent id to the category - we are doing it everytime for sure
		setCategoryParentID(categoryID, parentID)

	}

	//next step is to read all category properties and their groups
	//properties continues in the sheet from the position "D1"([0][3])
	allColumns, _ := excelFile.GetCols(sheetName)
	if len(allColumns) > 3 {
		//if the lenght of the field of the columns is more then 3, it means there are some other properties for this category, so lets process them
		for c := 3; c < len(allColumns); c++ {
			//skip white spaces columns
			if strings.TrimSpace(allColumns[c][0]) != "" {
				prop := CatalogueCategoryProperty{}
				//we will comapre property name, type and group so we have to trim white spaces
				prop.Name = strings.TrimSpace(allColumns[c][0])
				propType := strings.TrimSpace(allColumns[c][1])
				propLOVs := strings.TrimSpace(allColumns[c][2])
				propDefaultValue := strings.TrimSpace(allColumns[c][3])
				propCustomValue := strings.TrimSpace(allColumns[c][4])
				propUnit := strings.TrimSpace(allColumns[c][5])
				groupName := strings.TrimSpace(allColumns[c][6])
				//we check if a group of this name exists for processing category
				groupExist, groupID := existCategoryGroupByName(categoryID, groupName)
				//if it already exists we can assign existing groupID to the property
				if groupExist {
					prop.ID_group = groupID
				} else {
					//otherwise we creta new group for this category
					newGroupID, errGroup := createCatalogueCategoryGroup(categoryID, groupName)
					if errGroup != nil {
						fmt.Println(errGroup)
					} else {
						prop.ID_group = newGroupID
					}
				}

				//check unit
				if propUnit != "" {
					unitExists, unitID := existCategoryPropUnitByName(propUnit)
					if unitExists {
						prop.ID_unit = &unitID
					} else {
						unitID, unitErr := createCatalogueCategoryPropertyUnit(propUnit)
						if unitErr != nil {
							errPrint.Println("ERROR: ", unitErr)
							break
						} else {
							prop.ID_unit = &unitID
						}
					}
				}

				//check property type
				//if its list check list of values types
				if strings.ToLower(propType) == "list" {
					lovTypeExists, lovTypeID := existCategoryPropTypeByName(prop.Name)
					if lovTypeExists {
						prop.ID_property_type = lovTypeID
					} else {
						//if lov type doesnt exist we will create this type for lovs
						propTypeLovID, propTypeLOVerr := createCatalogueCategoryPropertyTypeLOV(prop.Name)
						if propTypeLOVerr != nil {
							errPrint.Println("ERROR: ", propTypeLOVerr)
							break
						} else {
							prop.ID_property_type = propTypeLovID
						}
					}

					//and then we can process LOV items
					lovs := strings.Split(propLOVs, ";")
					for _, lov := range lovs {
						//check lov item if exists, if not create it
						lovExists, _ := existCategoryPropTypeLOVByName(strings.ToLower(strings.TrimSpace(lov)), prop.ID_property_type)
						if !lovExists {
							createCatalogueCategoryPropertyLOV(lov, prop.ID_property_type)
						}
					}

				} else {
					//else check standard types
					propTypeExists, propTypeID := existCategoryPropTypeByName(propType)
					if propTypeExists {
						prop.ID_property_type = propTypeID
					} else {
						errPrint.Println("ERROR: This property type doesnt exist: ", propType)
						break
					}
				}

				//set default value
				if propDefaultValue != "" {
					prop.DefaultValue = &propDefaultValue
				}
				//sett if prop allow custom vlaues
				if propCustomValue == "1" || strings.EqualFold(propCustomValue, "true") {
					prop.AllowCustomValue = true
				}

				//finally chekc if this property alread exists or not
				propExists, _ := existCategoryGroupPropertyByGroupIDAndName(prop.ID_group, prop.Name)
				if !propExists {
					_, errProp := createCatalogueCategoryProperty(prop)
					if errProp != nil {
						errPrint.Println("ERROR: ", errProp)
						break
					}
				}
			}
		}
	}

	//job end log
	end := time.Now()
	fmt.Printf("Finished at: %s", end.String())
	fmt.Println()
	fmt.Printf("Job duration: %s", end.Sub(start).String())
	fmt.Println()
	infoPrint.Println("_________________________________________________________________________")
	categorySheetsCount++
}

func getAndCacheAllCategories() error {
	//get and cache categories
	rows, err := pgPool.Query(context.Background(), `SELECT tcc.id , tcc.id_parent , tcc.name , tcc.code  FROM panda.t_catalog_category tcc;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				category := CatalogueCategory{}
				errScan := rows.Scan(&category.ID, &category.ID_parent, &category.Name, &category.Code)
				if errScan == nil {
					catalogueCategories = append(catalogueCategories, category)
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}

		for _, cat := range catalogueCategories {
			var parentCategories []string
			parentCategories = append(parentCategories, cat.Name)
			parentID := cat.ID_parent

			for parentID != nil {
				category := existingCategoryByID(*parentID)
				if category != nil {
					parentCategories = append(parentCategories, category.Name)
					parentID = category.ID_parent
				} else {
					break
				}
			}

			okPrint.Println(strings.Join(parentCategories, ";"))
		}
	}
	//get and cache category groups
	rows, err = pgPool.Query(context.Background(), `SELECT tcg.id, tcg.name , tcg.id_category  FROM panda.t_catalog_category_property_group tcg;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				categoryGroup := CatalogueCatgeoryGroup{}
				errScan := rows.Scan(&categoryGroup.ID, &categoryGroup.Name, &categoryGroup.ID_category)
				if errScan == nil {
					category := existingCategoryByID(categoryGroup.ID_category)
					if category != nil {
						category.Groups = append(category.Groups, categoryGroup)
					} else {
						errPrint.Println("CATEGORY NOT FOUND: ", categoryGroup.ID)
					}
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	//get and cache units
	rows, err = pgPool.Query(context.Background(), `SELECT unit.id , unit.name FROM panda.t_catalog_category_property_unit unit;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				unit := CatalogCategoryPropertyUnit{}
				errScan := rows.Scan(&unit.ID, &unit.Name)
				if errScan == nil {
					catalogueUnits = append(catalogueUnits, unit)
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	//get and cache property types
	rows, err = pgPool.Query(context.Background(), `SELECT tp.id , tp.name, tp.is_lov  FROM panda.t_catalog_category_property_type tp;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				propType := CatalogCategoryPropertyType{}
				errScan := rows.Scan(&propType.ID, &propType.Name, &propType.IsLOV)
				if errScan == nil {
					cataloguePropertyTypes = append(cataloguePropertyTypes, propType)
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	//get and cache property LOVs
	rows, err = pgPool.Query(context.Background(), `SELECT lov.id , lov.name, lov.id_property_type  FROM panda.t_catalog_category_property_lov lov;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				lov := CatalogCategoryPropertyTypeLOV{}
				errScan := rows.Scan(&lov.ID, &lov.Name, &lov.ID_property_type)
				if errScan == nil {
					catalogueLOVs = append(catalogueLOVs, lov)
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	//get and cache properties
	rows, err = pgPool.Query(context.Background(), `SELECT tccp.id,tccp.name, tccp.id_group, tccp.id_unit, tccp.id_property_type  FROM panda.t_catalog_category_property tccp;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				categoryGroupProperty := CatalogueCategoryProperty{}
				errScan := rows.Scan(&categoryGroupProperty.ID, &categoryGroupProperty.Name, &categoryGroupProperty.ID_group, &categoryGroupProperty.ID_unit, &categoryGroupProperty.ID_property_type)
				if errScan == nil {
					group := existingCategoryGroupByID(categoryGroupProperty.ID_group)
					if group != nil {
						group.Properties = append(group.Properties, categoryGroupProperty)
					} else {
						errPrint.Println("PROPERTY NOT FOUND: ", categoryGroupProperty.ID)
					}
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	//get and cache manufacturers
	rows, err = pgPool.Query(context.Background(), `SELECT m.id , m.name FROM panda.t_manufacturer m;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				newItem := Manufacturer{}
				errScan := rows.Scan(&newItem.ID, &newItem.Name)
				if errScan == nil {
					manufacturers = append(manufacturers, newItem)
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	//get and cache catalogue items - only id , id_category and name
	rows, err = pgPool.Query(context.Background(), `SELECT c.id , c.id_category, c.name FROM panda.t_catalog_item c;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				newItem := CatalogueItem{}
				errScan := rows.Scan(&newItem.ID, &newItem.CategoryID, &newItem.Name)
				if errScan == nil {
					catalogueItems = append(catalogueItems, newItem)
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	//get and cache catalogue item values
	rows, err = pgPool.Query(context.Background(), `SELECT c.id_item , c.id_property FROM panda.t_catalog_item_property_value c;`)
	if err != nil {
		fmt.Println(err)
		return err
	} else {
		var nextRow bool = rows.Next()

		for {
			if nextRow {
				newItem := CatalogueItemValue{}
				errScan := rows.Scan(&newItem.ID_item, &newItem.ID_property)
				if errScan == nil {
					catalogueItemValues = append(catalogueItemValues, newItem)
				} else {
					errPrint.Println(errScan)
				}
			} else {
				break
			}
			nextRow = rows.Next()
		}
	}
	return nil
}

func existingCategoryGroupByID(id_group int32) *CatalogueCatgeoryGroup {
	var result *CatalogueCatgeoryGroup

mainLoop:
	for c := range catalogueCategories {
		for g := range catalogueCategories[c].Groups {
			if catalogueCategories[c].Groups[g].ID == id_group {
				result = &catalogueCategories[c].Groups[g]
				break mainLoop
			}
		}
	}

	return result
}

func existingCategoryByID(id_category int32) *CatalogueCategory {
	var result *CatalogueCategory

	for i := range catalogueCategories {

		if catalogueCategories[i].ID == id_category {
			result = &catalogueCategories[i]
			break
		}
	}

	return result
}

//this funtion check if the category exists by passing name as a parameter
func existCategoryByName(name string) (bool, int32) {
	var resultExists bool
	var resultID int32

	for i := range catalogueCategories {

		if strings.EqualFold(catalogueCategories[i].Name, name) {
			resultExists = true
			resultID = catalogueCategories[i].ID

			break
		}
	}

	return resultExists, resultID
}

func checkAndGetManufacturerID(name string) (int32, error) {
	var resultExists bool
	var resultID int32

	for i := range manufacturers {

		if strings.EqualFold(manufacturers[i].Name, name) {
			resultExists = true
			resultID = manufacturers[i].ID

			break
		}
	}
	if !resultExists {
		id, err := createManufacturer(name)
		if err != nil {
			return 0, err
		} else {
			resultID = id
		}
	}

	return resultID, nil
}

func checkAndGetCatalogueItemID(id_category int32, itemName, itemDescription string, manufacturerID int32, manufacturerPartNumber, manufacturerURL string) (int32, error) {
	var resultExists bool
	var resultID int32

	for i := range catalogueItems {

		if catalogueItems[i].CategoryID == id_category && strings.EqualFold(catalogueItems[i].Name, itemName) {
			resultExists = true
			resultID = catalogueItems[i].ID

			break
		}
	}
	if !resultExists {
		id, err := createCatalogueItem(id_category, itemName, itemDescription, manufacturerID, manufacturerPartNumber, manufacturerURL)
		if err != nil {
			return 0, err
		} else {
			resultID = id
		}
	}

	return resultID, nil
}

func existCategoryPropUnitByName(name string) (bool, int32) {
	var resultExists bool
	var resultID int32

	for i := range catalogueUnits {

		if strings.Contains(strings.ToLower(catalogueUnits[i].Name), strings.ToLower(name)) {
			resultExists = true
			resultID = catalogueUnits[i].ID

			break
		}
	}

	return resultExists, resultID
}

func existCategoryPropTypeByName(name string) (bool, int32) {
	var resultExists bool
	var resultID int32

	for i := range cataloguePropertyTypes {

		if strings.EqualFold(strings.TrimSpace(cataloguePropertyTypes[i].Name), name) {
			resultExists = true
			resultID = cataloguePropertyTypes[i].ID

			break
		}
	}

	return resultExists, resultID
}

func checkAndCreateCatalogueItemValue(id_item int32, id_property int32, value string) error {
	var resultExists bool

	for i := range catalogueItemValues {

		if catalogueItemValues[i].ID_item == id_item && catalogueItemValues[i].ID_property == id_property {
			resultExists = true
			break
		}
	}
	value = strings.ReplaceAll(value, `"`, `\"`)

	valueJson := `{ "value" : "` + value + `" }`
	if !resultExists {
		tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
		if txErr == nil {

			insertQuery := `INSERT INTO panda.t_catalog_item_property_value (id_item, id_property, value) VALUES ($1, $2, $3)`
			_, err := tx.Exec(context.Background(), insertQuery, id_item, id_property, valueJson)
			if err != nil {
				tx.Rollback(context.Background())
				return err
			}
			commitErr := tx.Commit(context.Background())
			if commitErr != nil {
				return commitErr
			}
			//so after succesfull insert into db we can add the record to the memory
			newItem := CatalogueItemValue{}
			newItem.ID_item = id_item
			newItem.ID_property = id_property
			catalogueItemValues = append(catalogueItemValues, newItem)
		} else {
			return txErr
		}
	} else {
		tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
		if txErr == nil {
			insertQuery := `UPDATE panda.t_catalog_item_property_value SET value = $3 WHERE id_item = $1 AND id_property = $2`
			_, err := tx.Exec(context.Background(), insertQuery, id_item, id_property, valueJson)
			if err != nil {
				tx.Rollback(context.Background())
				return err
			}
			commitErr := tx.Commit(context.Background())
			if commitErr != nil {
				return commitErr
			}
		} else {
			return txErr
		}
	}

	return nil
}

func existCategoryPropTypeLOVByName(name string, id_property_type int32) (bool, int32) {
	var resultExists bool
	var resultID int32

	for i := range catalogueLOVs {

		if id_property_type == catalogueLOVs[i].ID_property_type && strings.Contains(strings.ToLower(catalogueLOVs[i].Name), strings.ToLower(name)) {
			resultExists = true
			resultID = catalogueLOVs[i].ID

			break
		}
	}

	return resultExists, resultID
}

//this funtion check if the category group exists by passing name as a parameter and id of the category
func existCategoryGroupByName(id_category int32, name string) (bool, int32) {
	var resultExists bool
	var resultID int32

mainLoop:
	for i := range catalogueCategories {
		for g := range catalogueCategories[i].Groups {
			if catalogueCategories[i].ID == id_category && strings.Contains(strings.ToLower(catalogueCategories[i].Groups[g].Name), strings.ToLower(name)) {
				resultExists = true
				resultID = catalogueCategories[i].Groups[g].ID

				break mainLoop
			}
		}
	}

	return resultExists, resultID
}

//this funtion check if the property exists by passing property name as a parameter and id of the group
func existCategoryGroupPropertyByGroupIDAndName(id_group int32, name string) (bool, int32) {
	var resultExists bool
	var resultID int32

mainLoop:
	for i := range catalogueCategories {
		for g := range catalogueCategories[i].Groups {
			for p := range catalogueCategories[i].Groups[g].Properties {
				if catalogueCategories[i].Groups[g].ID == id_group && strings.EqualFold(catalogueCategories[i].Groups[g].Properties[p].Name, name) {
					resultExists = true
					resultID = catalogueCategories[i].Groups[g].Properties[p].ID

					break mainLoop
				}
			}
		}
	}

	return resultExists, resultID
}

func existCategoryGroupPropertyByCategoryIDAndPropName(id_category int32, name string) (bool, int32) {
	var resultExists bool
	var resultID int32

mainLoop:
	for i := range catalogueCategories {
		for g := range catalogueCategories[i].Groups {
			for p := range catalogueCategories[i].Groups[g].Properties {
				if catalogueCategories[i].Groups[g].ID_category == id_category && strings.EqualFold(catalogueCategories[i].Groups[g].Properties[p].Name, name) {
					resultExists = true
					resultID = catalogueCategories[i].Groups[g].Properties[p].ID

					break mainLoop
				}
			}
		}
	}

	return resultExists, resultID
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

func createManufacturer(name string) (int32, error) {
	var newID int32
	//one thing is to add category into the database
	//in the second step we have to add category to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		insertQuery := `INSERT INTO panda.t_manufacturer ("name") VALUES ($1)`
		_, err := tx.Exec(context.Background(), insertQuery, name)
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
		newItem := Manufacturer{}
		newItem.ID = newID
		newItem.Name = name
		manufacturers = append(manufacturers, newItem)
	} else {
		return newID, txErr
	}

	return newID, nil
}

func createCatalogueItem(id_category int32, itemName, itemDescription string, manufacturerID int32, manufacturerPartNumber, manufacturerURL string) (int32, error) {
	var newID int32
	//one thing is to add category into the database
	//in the second step we have to add category to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		insertQuery := `INSERT INTO panda.t_catalog_item ("name", id_category, note, id_manufacturer, manufacturerpartnumber, manufactureritemurl)
		VALUES($1, $2, $3, $4, $5, $6);`
		_, err := tx.Exec(context.Background(), insertQuery, itemName, id_category, itemDescription, manufacturerID, manufacturerPartNumber, manufacturerURL)
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
		newItem := CatalogueItem{}
		newItem.ID = newID
		newItem.Name = itemName
		newItem.CategoryID = id_category
		catalogueItems = append(catalogueItems, newItem)
	} else {
		return newID, txErr
	}

	return newID, nil
}

func createCatalogueCategoryPropertyTypeLOV(name string) (int32, error) {
	var newID int32
	//one thing is to add property type of LOVs into the database
	//in the second step we have to add this item to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		insertQuery := `INSERT INTO panda.t_catalog_category_property_type ("name", is_lov) VALUES ($1, True)`
		_, err := tx.Exec(context.Background(), insertQuery, name)
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
		newItem := CatalogCategoryPropertyType{}
		newItem.Name = name
		newItem.ID = newID
		newItem.IsLOV = true
		cataloguePropertyTypes = append(cataloguePropertyTypes, newItem)
	} else {
		return newID, txErr
	}

	return newID, nil
}

func createCatalogueCategoryPropertyLOV(name string, id_property_type int32) (int32, error) {
	var newID int32
	//one thing is to add LOV item into the database
	//in the second step we have to add thi item to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		insertQuery := `INSERT INTO panda.t_catalog_category_property_lov ("name", id_property_type) VALUES ($1, $2)`
		_, err := tx.Exec(context.Background(), insertQuery, name, id_property_type)
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
		newItem := CatalogCategoryPropertyTypeLOV{}
		newItem.Name = name
		newItem.ID = newID
		newItem.ID_property_type = id_property_type
		catalogueLOVs = append(catalogueLOVs, newItem)
	} else {
		return newID, txErr
	}

	return newID, nil
}

func createCatalogueCategoryPropertyUnit(name string) (int32, error) {
	var newID int32
	//one thing is to add LOV item into the database
	//in the second step we have to add thi item to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		insertQuery := `INSERT INTO panda.t_catalog_category_property_unit ("name") VALUES ($1)`
		_, err := tx.Exec(context.Background(), insertQuery, name)
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
		newItem := CatalogCategoryPropertyUnit{}
		newItem.Name = name
		newItem.ID = newID
		catalogueUnits = append(catalogueUnits, newItem)
	} else {
		return newID, txErr
	}

	return newID, nil
}

func createCatalogueCategoryGroup(categoryID int32, groupName string) (int32, error) {
	var newID int32
	//one thing is to add category into the database
	//in the second step we have to add category to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		insertQuery := `INSERT INTO panda.t_catalog_category_property_group ("name", id_category) VALUES ($1, $2)`
		_, err := tx.Exec(context.Background(), insertQuery, groupName, categoryID)
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
		newGroup := CatalogueCatgeoryGroup{}
		newGroup.Name = groupName
		newGroup.ID_category = categoryID
		newGroup.ID = newID
		//we have a instance of the new group and now we have to find existing category and add this group to the Groups list
		existingCategory := existingCategoryByID(categoryID)
		if existingCategory != nil {
			existingCategory.Groups = append(existingCategory.Groups, newGroup)
		} else {
			return 0, errors.New("Can not find specified category by ID: " + strconv.Itoa(int(categoryID)))
		}

	} else {
		return newID, txErr
	}

	return newID, nil
}

func createCatalogueCategoryProperty(property CatalogueCategoryProperty) (int32, error) {
	var newID int32
	//one thing is to add category into the database
	//in the second step we have to add category to local cache
	tx, txErr := pgPool.BeginTx(context.Background(), pgx.TxOptions{})
	if txErr == nil {
		if property.DefaultValue != nil {
			defVal := `{"value":"` + *property.DefaultValue + `"}`
			property.DefaultValue = &defVal
		}
		insertQuery := `INSERT INTO panda.t_catalog_category_property ("name", id_group, id_property_type, id_unit, default_value, AllowCustomValue) VALUES ($1, $2, $3, $4, $5, $6)`
		_, err := tx.Exec(context.Background(), insertQuery, property.Name, property.ID_group, property.ID_property_type, property.ID_unit, property.DefaultValue, property.AllowCustomValue)
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

		property.ID = newID

		existingCategoryGroup := existingCategoryGroupByID(property.ID_group)
		if existingCategoryGroup != nil {
			existingCategoryGroup.Properties = append(existingCategoryGroup.Properties, property)
		} else {
			return 0, errors.New("Can not find specified category group by ID: " + strconv.Itoa(int(property.ID_group)))
		}

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

// add mssql:
// go get github.com/denisenkom/go-mssqldb
// example:
// package main

// import (
// 	"database/sql"
// 	"flag"
// 	"fmt"
// 	"log"

// 	_ "github.com/denisenkom/go-mssqldb"
// )

// var (
// 	debug         = flag.Bool("debug", false, "enable debugging")
// 	password      = flag.String("password", "Praha2006+2008", "the database password")
// 	port     *int = flag.Int("port", 1433, "the database port")
// 	server        = flag.String("server", "10.1.4.9", "the database server")
// 	user          = flag.String("user", "apl_pbs", "the database user")
// )

// func main() {
// 	flag.Parse()

// 	if *debug {
// 		fmt.Printf(" password:%s\n", *password)
// 		fmt.Printf(" port:%d\n", *port)
// 		fmt.Printf(" server:%s\n", *server)
// 		fmt.Printf(" user:%s\n", *user)
// 	}

// 	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d", *server, *user, *password, *port)
// 	if *debug {
// 		fmt.Printf(" connString:%s\n", connString)
// 	}
// 	conn, err := sql.Open("mssql", connString)
// 	if err != nil {
// 		log.Fatal("Open connection failed:", err.Error())
// 	}
// 	defer conn.Close()

// 	stmt, err := conn.Prepare("SELECT COUNT(*) FROM Laser2.dbo.Item")
// 	if err != nil {
// 		log.Fatal("Prepare failed:", err.Error())
// 	}
// 	defer stmt.Close()

// 	row := stmt.QueryRow()
// 	var somenumber int64

// 	err = row.Scan(&somenumber)
// 	if err != nil {
// 		log.Fatal("Scan failed:", err.Error())
// 	}
// 	fmt.Printf("Items count:%d\n", somenumber)

// 	fmt.Printf("bye\n")
// }
