package main

import (
	"net/http"

	"example.com/fitConnect/database"
	"example.com/fitConnect/router"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	database.InitDB()

	server := gin.Default()
	server.Use(CORSMiddleware())

	server.Static("/public", "../public")
	server.StaticFile("/", "../index.html")
	server.StaticFile("/Login", "../pages/login.html")
	server.StaticFile("/Administrador", "../pages/administrador.html")
	server.StaticFile("/Cliente", "../pages/cliente.html")
	server.StaticFile("/Equipe", "../pages/equipe.html")
	server.StaticFile("/Funcionario", "../pages/funcionario.html")

	server.LoadHTMLGlob("../pages/*")

	server.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusNotFound, "404.html", gin.H{"title": "Page Not Found"})
	})

	router.LoginRoutes(server)
	router.AtendimentoRoutes(server)
	router.SatisfacaoRoutes(server)
	router.DesempenhoRoutes(server)
	router.MetaRoutes(server)
	router.ClienteRoutes(server)
	router.AparelhoRoutes(server)
	router.ExercicioRoutes(server)
	router.FuncionarioRoutes(server)
	router.PlanoRoutes(server)
	router.AcademiaRoutes(server)
	router.FichaRoutes(server)
	router.DashboardRoutes(server)
	router.UtilsRoutes(server)

	server.Run(":3000")
}
