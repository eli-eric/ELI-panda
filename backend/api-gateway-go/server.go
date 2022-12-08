package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"panda/apigateway/config"
	"panda/apigateway/ioutils"
	securityService "panda/apigateway/services/security-service"
	"panda/apigateway/services/security-service/models"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	// configuration settings
	// application expects appsettings.yaml file in the root of the app
	settings, err := config.ReadConfig("config.json")
	ioutils.PanicOnError(err)

	//new http Echo instance
	e := echo.New()

	// Middlewares ************************************************************************************

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
		SigningKey: []byte(settings.JwtSecret),
		ErrorHandler: func(err error) error {
			if err != nil {
				fmt.Println(err)
				return echo.ErrUnauthorized
			} else {
				return nil
			}
		},
	}
	jwtMiddleware := middleware.JWTWithConfig(config)

	// Middlewares END **********************************************************************************

	//security services used in handlers and maped in routes...
	securitySvc := securityService.NewSecurityService(settings)
	securityHandlers := securityService.NewSecurityHandlers(securitySvc)
	securityService.MapSecurityRoutes(e, securityHandlers, jwtMiddleware)
	log.Println("Security service initialized successfully.")

	// Start server
	go func() {
		if err := e.Start(":" + settings.Port); err != nil && err != http.ErrServerClosed {
			e.Logger.Fatal("Shutting down the server: ELI - PANDA - API Gateway")
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with a timeout of 10 seconds.
	// Use a buffered channel to avoid missing signals as recommended for signal.Notify
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}
