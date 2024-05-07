package main

import (
	"net/http"

	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/router"
	"example.com/fitConnect/router/routes"
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

	server.Static("/public", "../../public")
	server.StaticFile("/", "../../index.html")
	server.StaticFile("/Login", "../../pages/login.html")
	server.StaticFile("/Administrador", "../../pages/administrador.html")
	server.StaticFile("/Cliente", "../../pages/cliente.html")
	server.StaticFile("/Equipe", "../../pages/equipe.html")
	server.StaticFile("/Funcionario", "../../pages/funcionario.html")

	server.LoadHTMLGlob("../../pages/*")

	server.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusNotFound, "404.html", gin.H{"title": "Page Not Found"})
	})

	// router.LoginRoutes(server)
	// router.AcademiaRoutes(server)
	// router.AparelhoRoutes(server)
	// router.AtendimentoRoutes(server)
	// router.ClienteRoutes(server)
	// router.SatisfacaoRoutes(server)
	// router.DashboardRoutes(server)
	// router.DesempenhoRoutes(server)
	// router.ExercicioRoutes(server)
	// router.FichaRoutes(server)
	// router.FuncionarioRoutes(server)
	// router.MetaRoutes(server)
	// router.PlanoRoutes(server)
	// router.UtilsRoutes(server)

	repoLogin := repository.NewLocalLoginRepository()
	loginService := application.NewLoginService(repoLogin)
	loginHandlers := routes.NewLoginHandlers(loginService)
	router.LoginRoutes(server, loginHandlers)

	repoUtils := repository.NewLocalUtilsRepository()
	utilsService := application.NewUtilsService(repoUtils)
	utilsHandlers := routes.NewUtilsHandlers(utilsService)
	router.UtilsRoutes(server, utilsHandlers)

	repoPlano := repository.NewLocalPlanoRepository()
	planoService := application.NewPlanoService(repoPlano)
	planoHandlers := routes.NewPlanoHandlers(planoService)
	router.PlanoRoutes(server, planoHandlers)

	repoMeta := repository.NewLocalMetaRepository()
	metaService := application.NewMetaService(repoMeta)
	metaHandlers := routes.NewMetaHandlers(metaService)
	router.MetaRoutes(server, metaHandlers)

	repoFuncionario := repository.NewLocalFuncionarioRepository()
	funcionarioService := application.NewFuncionarioService(repoFuncionario)
	funcionarioHandlers := routes.NewFuncionarioHandlers(funcionarioService)
	router.FuncionarioRoutes(server, funcionarioHandlers)

	repoFicha := repository.NewLocalFichaRepository()
	fichaService := application.NewFichaService(repoFicha)
	fichaHandlers := routes.NewFichaHandlers(fichaService)
	router.FichaRoutes(server, fichaHandlers)

	repoExercicio := repository.NewLocalExercicioRepository()
	exercicioService := application.NewExercicioService(repoExercicio)
	exercicioHandlers := routes.NewExercicioHandlers(exercicioService)
	router.ExercicioRoutes(server, exercicioHandlers)

	repoDesempenho := repository.NewLocalDesempenhoRepository()
	desempenhoService := application.NewDesempenhoService(repoDesempenho)
	desempenhoHandlers := routes.NewDesempenhoHandlers(desempenhoService)
	router.DesempenhoRoutes(server, desempenhoHandlers)

	repoDashboard := repository.NewLocalDashboardRepository()
	dashboardService := application.NewDashBoardService(repoDashboard)
	dashboardHandlers := routes.NewDashBoardHandlers(dashboardService)
	router.DashboardRoutes(server, dashboardHandlers)

	repoSatisfacao := repository.NewLocalSatisfacaoRepository()
	satisfacaoService := application.NewSatisfacaoService(repoSatisfacao)
	satisfacaoHandlers := routes.NewSatisfacaoHandlers(satisfacaoService)
	router.SatisfacaoRoutes(server, satisfacaoHandlers)

	repoCliente := repository.NewLocalClienteRepository()
	clienteService := application.NewClienteService(repoCliente)
	clienteHandlers := routes.NewClienteHandlers(clienteService)
	router.ClienteRoutes(server, clienteHandlers)

	repoAtendimento := repository.NewLocalAtendimentoRepository()
	atendimentoService := application.NewAtendimentoService(repoAtendimento)
	atendimentoHandlers := routes.NewAtendimentoHandlers(atendimentoService)
	router.AtendimentoRoutes(server, atendimentoHandlers)

	repoAparelho := repository.NewLocalAparelhoRepository()
	aparelhoService := application.NewAparelhoService(repoAparelho)
	aparelhoHandlers := routes.NewAparelhoHandlers(aparelhoService)
	router.AparelhoRoutes(server, aparelhoHandlers)

	repoAcademia := repository.NewLocalAcademiaRepository()
	academiaService := application.NewAcademiaService(repoAcademia)
	academiaHandlers := routes.NewAcademiaHandlers(academiaService)
	router.AcademiaRoutes(server, academiaHandlers)

	server.Run(":3000")
}
