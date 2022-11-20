package main

import (
	"fmt"
	securityService "panda/apigateway/services/security-service"
	"panda/apigateway/services/security-service/models"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"
)

func main() {

	// configuration settings
	// application expects appsettings.yaml file in the root of the app
	viper.SetConfigName("appsettings")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig()
	if err != nil {
		fmt.Println(err)
		//if there was no config file presented in root folder we will use some defaults - its ok only for local development
		viper.SetDefault("PANDA_API_GATEWAY_PORT", "50000")
		viper.SetDefault("PANDA_API_GATEWAY_JWT_SECRET", "12554114ad74624b588c910f6fa2bbc0")
		viper.SetDefault("PANDA_API_GATEWAY_SECURITY_SERVICE_NEO4J_URI", "bolt://127.0.0.1:7600")
		viper.SetDefault("PANDA_API_GATEWAY_SECURITY_SERVICE_NEO4J_USER", "neo4j")
		viper.SetDefault("PANDA_API_GATEWAY_SECURITY_SERVICE_NEO4J_PASSWORD", "elipanda2022")

	}

	//init settings
	apiPort := ":" + viper.GetString("PANDA_API_GATEWAY_PORT")
	jwtSecret := viper.GetString("PANDA_API_GATEWAY_JWT_SECRET")

	e := echo.New()

	// Middlewares

	//Swagger documentation served from open-api-specification
	swaggerGroup := e.Group("")
	swaggerGroup.Use(middleware.StaticWithConfig(middleware.StaticConfig{
		Root:   "open-api-specification",
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

	//JWT middleware - Configure middleware with the custom claims type
	config := middleware.JWTConfig{
		Claims:     &models.JwtCustomClaims{},
		SigningKey: []byte(jwtSecret),
		ErrorHandler: func(err error) error {
			if err != nil {
				return echo.ErrUnauthorized
			} else {
				return nil
			}
		},
	}
	jwtMiddleware := middleware.JWTWithConfig(config)

	//security services used in handlers and maped in routes...
	securitySvc := securityService.NewSecurityService()
	securityHandlers := securityService.NewSecurityHandlers(securitySvc)
	securityService.MapSecurityRoutes(e, securityHandlers, jwtMiddleware)

	e.Logger.Fatal(e.Start(apiPort))
}
