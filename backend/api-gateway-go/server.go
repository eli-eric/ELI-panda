package main

import (
	"flag"
	"log"
	"os"

	"panda/apigateway/handlers"
	"panda/apigateway/models"
	"panda/apigateway/routes"
	"panda/apigateway/services"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	microSystems "panda/apigateway/services/systems"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {

	//here we recognize if we run in localhost via app start argument
	isLocalhost := false //otherwise it is in container and comuniate via docker network using dns
	if len(os.Args) > 0 {
		for _, arg := range os.Args {
			if arg == "localhost" {
				isLocalhost = true
			}
		}
	}

	apiPort := ":50000" //default api gateway port
	// msCatalogueAddrClient  := flag.String("address", "localhost:50010", "Catalogue microservice address")
	// msCatalogueServiceName := flag.String("serviceName", "CatalogueService", "Name of the microservice")

	mySystemsAddr := "pandaMicroservicesSystemsService"
	if isLocalhost {
		mySystemsAddr = "localhost"
	}
	msSystemsAddrClient := flag.String("address", mySystemsAddr+":50020", "Systems microservice address")

	//lets define microservices
	//Systems service

	connSystemsService, err := grpc.Dial(*msSystemsAddrClient, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Printf("%s did not connect: %v", microSystems.SystemsService_ServiceDesc.ServiceName, err)
	}
	defer connSystemsService.Close()
	systemsServiceClient := microSystems.NewSystemsServiceClient(connSystemsService)

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
	systemsHandlers := handlers.NewSystemsHandlers(systemsServiceClient)
	routes.MapSystemsRoutes(systemGroup, systemsHandlers)

	//Group of routes for Catalogue
	catalogueGroup := e.Group("/catalogue")
	catalogueGroup.Use(jwtMiddleware)
	catalogueService := services.NewCatalogueService()
	catalogueHandlers := handlers.NewCatalogueHandlers(catalogueService)
	routes.MapCatalogueRoutes(catalogueGroup, catalogueHandlers)

	e.Logger.Fatal(e.Start(apiPort))
}
