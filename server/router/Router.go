package router

import (
	UTILS "example.com/fitConnect/Utils"
	routes "example.com/fitConnect/router/routes"
	"github.com/gin-gonic/gin"
)

func LoginRoutes(server *gin.Engine, handlers *routes.LoginHandlers) {

	server.POST("/LoginCliente", handlers.LoginCliente)
	server.POST("/LoginFuncionario", handlers.LoginFuncionario)
}

func UtilsRoutes(server *gin.Engine, handlers *routes.UtilsHandlers) {
	server.POST("/VerificarCpfCadastrado", handlers.VerificarCpfCadastrado)
	server.POST("/VerificarCpfCadastradoGeral", handlers.VerificarCpfCadastradoGeral)
	server.POST("/VerificarEmailCadastrado", handlers.VerificarEmailCadastrado)
	server.POST("/VerificarEmailCadastradoGeral", handlers.VerificarEmailCadastradoGeral)
	server.POST("/EnviarEmail", handlers.EnviarEmail)
	server.POST("/VerificarCodigo", handlers.VerificarCodigo)
	server.POST("/TrocarSenha", handlers.TrocarSenha)
	server.GET("/ws", UTILS.HandleConnections)
}

func AtendimentoRoutes(server *gin.Engine, handlers *routes.AtendimentoHandlers) {
	server.POST("/Atendimento/ReadStatusAtendimento", handlers.ReadStatusAtendimento)
	server.POST("/Atendimento/ReadAtendimentoInfo", handlers.ReadAtendimentoInfo)
	server.POST("/Atendimento/ReadAtendimento", handlers.ReadAtendimento)
	server.POST("/Atendimento/RegisterAtendimento", handlers.RegisterAtendimento)
	server.POST("/Atendimento/ValidacaoAtendimento", handlers.ValidacaoAtendimento)
	server.POST("/Atendimento/UpdateStatusAtendimento", handlers.UpdateStatusAtendimento)
	server.GET("/Atendimento/Quantidade", handlers.VerificarQuantidadeAtendimento)

}

func SatisfacaoRoutes(server *gin.Engine, handlers *routes.SatisfacaoHandlers) {
	server.POST("/Satisfacao/VerifySatisfacaoAtendimento", handlers.VerifySatisfacaoAtendimento)
	server.POST("/Satisfacao/VerificarAtendimento", handlers.VerificarAtendimento)
	server.POST("/Satisfacao/UpdateSatisfacao", handlers.UpdateSatisfacao)

}

func DesempenhoRoutes(server *gin.Engine, handlers *routes.DesempenhoHandlers) {
	server.POST("/Desempenho/ReadDesempenho", handlers.ReadDesempenho)
	server.POST("/Desempenho/ReadExerciciosForDesempenho", handlers.ReadExerciciosForDesempenho)
	server.POST("/Desempenho/ReadExerciciosFichaCliente", handlers.ReadExerciciosFichaCliente)
}

func MetaRoutes(server *gin.Engine, handlers *routes.MetaHandlers) {
	server.POST("/Meta/ReadMetas", handlers.ReadMetas)
	server.POST("/Meta/RegisterMeta", handlers.RegisterMeta)
	server.POST("/Meta/UpdateMeta", handlers.UpdateMeta)
	server.POST("/Meta/ReadMetaAtual", handlers.ReadMetaAtual)
}

func ClienteRoutes(server *gin.Engine, handlers *routes.ClienteHandlers) {
	server.POST("/Cliente/ReadClientes", handlers.ReadClientes)
	server.POST("/Cliente/ReadClienteDet", handlers.ReadClienteDet)
	server.POST("/Cliente/RegisterCliente", handlers.RegisterCliente)
	server.POST("/Cliente/ArchiveCliente", handlers.ArchiveCliente)
	server.POST("/Cliente/AtivarCliente", handlers.AtivarCliente)
	server.POST("/Cliente/UpdateClienteDetalhes", handlers.UpdateClienteDetalhes)
}

func AparelhoRoutes(server *gin.Engine, handlers *routes.AparelhoHandlers) {
	server.POST("/Aparelho/ReadAparelhos", handlers.GetAparelhoList)
	server.POST("/Aparelho/ReadAparelhoDet", handlers.ReadAparelhoDet)
	server.POST("/Aparelho/RegisterAparelho", handlers.RegisterAparelho)
	server.POST("/Aparelho/ArchiveAparelho", handlers.ArchiveAparelho)
	server.POST("/Aparelho/AtivarAparelho", handlers.AtivarAparelho)
	server.POST("/Aparelho/UpdateAparelhoDetalhes", handlers.UpdateAparelhoDetalhes)
}

func ExercicioRoutes(server *gin.Engine, handlers *routes.ExercicioHandlers) {
	server.POST("/Exercicio/ReadExercicios", handlers.ReadExercicios)
	server.POST("/Exercicio/ReadExercicioDet", handlers.ReadExercicioDet)
	server.POST("/Exercicio/RegisterExercicio", handlers.RegisterExercicio)
	server.POST("/Exercicio/ArchiveExercicio", handlers.ArchiveExercicio)
	server.POST("/Exercicio/AtivarExercicio", handlers.AtivarExercicio)
	server.POST("/Exercicio/UpdateExercicioDetalhes", handlers.UpdateExercicioDetalhes)
}

func FuncionarioRoutes(server *gin.Engine, handlers *routes.FuncionarioHandlers) {
	server.POST("/Funcionario/ReadFuncionarios", handlers.ReadFuncionarios)
	server.POST("/Funcionario/ReadFuncionarioDet", handlers.ReadFuncionarioDet)
	server.POST("/Funcionario/RegisterFuncionario", handlers.RegisterFuncionario)
	server.POST("/Funcionario/ArchiveFuncionario", handlers.ArchiveFuncionario)
	server.POST("/Funcionario/AtivarFuncionario", handlers.AtivarFuncionario)
	server.POST("/Funcionario/UpdateFuncionarioDetalhes", handlers.UpdateFuncionarioDetalhes)
	server.POST("/Funcionario/MeuDesempenho", handlers.FuncionarioMeuDesempenho)
}

func PlanoRoutes(server *gin.Engine, handlers *routes.PlanoHandlers) {
	server.POST("/Plano/ReadPlanos", handlers.ReadPlanos)
	// server.POST("/Plano/ReadPlanoDet", routes.ReadPlanoDet)
	// server.POST("/Plano/RegisterPlano", routes.RegisterPlano)
	// server.POST("/Plano/ArchivePlano", routes.ArchivePlano)
	// server.POST("/Plano/UpdatePlanoDetalhes", routes.UpdatePlanoDetalhes)
}

func AcademiaRoutes(server *gin.Engine, handlers *routes.AcademiaHandlers) {
	server.POST("/Academia/ReadAcademiaDet", handlers.GetAcademiaDet)
	server.POST("/Academia/ReadAcademiaLista", handlers.GetAcademiaLista)
	server.POST("/Academia/CreateAcademia", handlers.CreateAcademia)
	server.POST("/Academia/AddAdministrador", handlers.AddAdministrador)
	server.POST("/Academia/InsertAcademiaToTheOptions", handlers.InsertAcademiaToTheOptions)
}

func FichaRoutes(server *gin.Engine, handlers *routes.FichaHandlers) {
	server.POST("/Ficha/ReadClienteFicha", handlers.ReadClienteFicha)
	server.POST("/Ficha/ReadFicha", handlers.ReadFicha)
	server.POST("/Ficha/ReadFichaDetalhes", handlers.ReadFichaDetalhes)
	server.POST("/Ficha/ReadFichaDetalhesGeral", handlers.ReadFichaDetalhesGeral)
	server.POST("/Ficha/RegisterFicha", handlers.RegisterFicha)
	server.POST("/Ficha/RegisterDetalhesFicha", handlers.RegisterDetalhesFicha)
	server.POST("/Ficha/UpdateDetalhesFicha", handlers.UpdateDetalhesFicha)
	server.POST("/Ficha/UpdateCampoFicha", handlers.UpdateCampoFicha)
	server.POST("/Ficha/DeleteCampoFicha", handlers.DeleteCampoFicha)
}

func DashboardRoutes(server *gin.Engine, handlers *routes.DashboardHandlers) {
	// server.POST("/DashBoard/TaxaAdocao", handlers.TaxaAdocao)
	server.POST("/DashBoard/ReadSatisfacao", handlers.ReadSatisfacao)
	server.POST("/DashBoard/ReadAtendimentos", handlers.ReadAtendimentos)
	server.POST("/DashBoard/ReadAllAtendimentos", handlers.ReadAllAtendimentos)
	server.POST("/DashBoard/ReadFuncNome", handlers.ReadFuncNome)
	server.POST("/DashBoard/ReadAllEngajamentos", handlers.ReadAllEngajamentos)
	// server.POST("/DashBoard/AvaliacaoPerformance", handlers.AvaliacaoPerformance)
	// server.POST("/DashBoard/Roi", handlers.Roi)
}
