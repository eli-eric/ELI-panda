package main

import (
	"os"

	"panda/apigateway/handlers"
	"panda/apigateway/models"
	"panda/apigateway/routes"
	"panda/apigateway/services"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

func main() {

	//here we recognize if we run in production via app start argument
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
	swaggerGroup := e.Group("")
	swaggerGroup.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "swagger",
		Browse: true,
	}))
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

	//Group of routes for Systems
	systemGroup := e.Group("/system")
	systemGroup.Use(jwtMiddleware)
	systemsService := services.NewSystemsService(neo4jDriver)
	systemsHandlers := handlers.NewSystemsHandlers(systemsService)
	routes.MapSystemsRoutes(systemGroup, systemsHandlers)

	//Group of routes for Catalogue
	catalogueGroup := e.Group("/catalogue")
	catalogueGroup.Use(jwtMiddleware)
	catalogueService := services.NewCatalogueService()
	catalogueHandlers := handlers.NewCatalogueHandlers(catalogueService)
	routes.MapCatalogueRoutes(catalogueGroup, catalogueHandlers)

	e.Logger.Fatal(e.Start(port))
}
