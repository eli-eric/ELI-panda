package main

import (
	"net/http"
	"os"

	_ "panda/apigateway/docs"
	"panda/apigateway/handlers"
	"panda/apigateway/models"
	"panda/apigateway/routes"
	"panda/apigateway/services"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger" // echo-swagger middleware

	uuid "github.com/google/uuid"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

// CreateNewSystem godoc
// @Summary Create new standalone system
// @Description Create new System without any relationship and return its id
// @Tags Systems
// @Accept json
// @Produce json
// @Param Name formData string true "System name "
// @Success 200
// @Router /system [post]
// @Security ApiKeyAuth
func createNewSystem(driver neo4j.Driver) echo.HandlerFunc {
	return func(c echo.Context) error {

		systemItem := models.System{
			Name: c.FormValue("name"),
		}
		err := insertSystem(driver, &systemItem)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, err.Error())
		}

		return c.JSON(http.StatusOK, systemItem)
	}
}

// @title          PANDA API Gateway
// @version        0.1
// @description    This is a API Gateway to the PANDA database
// @contact.name   Jiří Švácha
// @contact.email  jiri.svacha@eli-beams.eu

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
// test token Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9uIFNub3ciLCJhZG1pbiI6dHJ1ZSwiZXhwIjoyMDEzMDUxNDQzfQ.8TiZTEriPIkTITF2DXpEsJKNL8qwE6ImxN_HJkYdGug
func main() {

	//here we recognize if we run in production via app start argument -
	isProduction := false
	if len(os.Args) > 0 {
		for _, arg := range os.Args {
			if arg == "prod" {
				isProduction = true
			}
		}
	}

	neo4jUri := "bolt://127.0.0.1:7687"
	port := ":1323"
	if isProduction {
		neo4jUri = "bolt://172.17.0.1:7687"
		port = ":5001"
	}

	useConsoleLogger := func(level neo4j.LogLevel) func(config *neo4j.Config) {
		return func(config *neo4j.Config) {
			config.Log = neo4j.ConsoleLogger(level)
		}
	}

	neo4jDriver, err := neo4j.NewDriver(neo4jUri, neo4j.BasicAuth("neo4j", "fw34-sdRF", ""), useConsoleLogger(neo4j.ERROR))

	if err != nil {
		panic(err)
	}
	// Handle driver lifetime based on your application lifetime requirements  driver's lifetime is usually
	// bound by the application lifetime, which usually implies one driver instance per application
	defer neo4jDriver.Close()

	e := echo.New()

	// Middleware
	//Swagger documentation from docs
	e.GET("/*", echoSwagger.WrapHandler)
	//CORS middleware to allow cross origin access
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{"*"},
		AllowCredentials: true,
		AllowMethods:     []string{"*"},
	}))
	//logging and autorecover from panics middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Configure middleware with the custom claims type
	config := middleware.JWTConfig{
		Claims:     &models.JwtCustomClaims{},
		SigningKey: []byte("12554114ad74624b588c910f6fa2bbc0"),
	}
	jwtMiddleware := middleware.JWTWithConfig(config)

	//security services used in handlers and maped in routes...
	securityService := services.NewSecurityService()
	securityHandlers := handlers.NewSecurityHandlers(securityService)
	routes.MapSecurityRoutes(e, securityHandlers, jwtMiddleware)

	// Restricted group for systems
	systemGroup := e.Group("/system")
	systemGroup.Use(jwtMiddleware)
	//endpoint to create new standalone system
	systemGroup.POST("", createNewSystem(neo4jDriver))

	e.Logger.Fatal(e.Start(port))
}

func insertSystem(driver neo4j.Driver, systemItem *models.System) error {
	// Sessions are short-lived, cheap to create and NOT thread safe. Typically create one or more sessions
	// per request in your web application. Make sure to call Close on the session when done.
	// For multi-database support, set sessionConfig.DatabaseName to requested database
	// Session config will default to write mode, if only reads are to be used configure session for
	// read mode.
	session := driver.NewSession(neo4j.SessionConfig{})
	defer session.Close()
	_, err := session.WriteTransaction(createSystemTx(systemItem))
	if err != nil {
		return err
	}
	return nil
}

func createSystemTx(systemItem *models.System) neo4j.TransactionWork {
	return func(tx neo4j.Transaction) (interface{}, error) {
		newUid, err := uuid.NewRandom()
		if err != nil {
			return nil, err
		}
		records, err := tx.Run("CREATE (s:System { name: $name, uid: $uid }) RETURN id(s), s.name, s.uid", map[string]interface{}{
			"name": systemItem.Name,
			"uid":  newUid.String(),
		})
		// In face of driver native errors, make sure to return them directly.
		// Depending on the error, the driver may try to execute the function again.
		if err != nil {
			return nil, err
		}
		record, err := records.Single()
		if err != nil {
			return nil, err
		}

		systemItem.Id = record.Values[0].(int64)
		systemItem.Name = record.Values[1].(string)
		systemItem.Uid = record.Values[2].(string)

		return systemItem, nil
	}
}
