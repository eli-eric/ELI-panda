package main

import (
	securityService "panda/apigateway/services/security-service"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	//here we recognize if we run in localhost via app start argument
	// isLocalhost := false //otherwise it is in container and comuniate via docker network using dns
	// if len(os.Args) > 0 {
	// 	for _, arg := range os.Args {
	// 		if arg == "localhost" {
	// 			isLocalhost = true
	// 		}
	// 	}
	// }

	apiPort := ":50000" //default api gateway port

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
		Claims:     &securityService.JwtCustomClaims{},
		SigningKey: []byte("12554114ad74624b588c910f6fa2bbc0"),
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
