package router

import (
	UTILS "example.com/fitConnect/Utils"
	routes "example.com/fitConnect/router/routes"
	"github.com/gin-gonic/gin"
)

func LoginRoutes(server *gin.Engine) {

	server.POST("/LoginCliente", routes.LoginCliente)
	server.POST("/LoginFuncionario", routes.LoginFuncionario)
}

func UtilsRoutes(server *gin.Engine) {
	server.POST("/VerificarCpfCadastrado", routes.VerificarCpfCadastrado)
	server.POST("/VerificarCpfCadastradoGeral", routes.VerificarCpfCadastradoGeral)
	server.POST("/VerificarEmailCadastrado", routes.VerificarEmailCadastrado)
	server.POST("/VerificarEmailCadastradoGeral", routes.VerificarEmailCadastradoGeral)
	server.GET("/ws", UTILS.HandleConnections)
}

func AtendimentoRoutes(server *gin.Engine) {
	server.POST("/Atendimento/ReadStatusAtendimento", routes.ReadStatusAtendimento)
	server.POST("/Atendimento/ReadAtendimentoInfo", routes.ReadAtendimentoInfo)
	server.POST("/Atendimento/ReadAtendimento", routes.ReadAtendimento)
	server.POST("/Atendimento/RegisterAtendimento", routes.RegisterAtendimento)
	server.POST("/Atendimento/ValidacaoAtendimento", routes.ValidacaoAtendimento)
	server.POST("/Atendimento/UpdateStatusAtendimento", routes.UpdateStatusAtendimento)

}

func SatisfacaoRoutes(server *gin.Engine) {
	server.POST("/Satisfacao/VerifySatisfacaoAtendimento", routes.VerifySatisfacaoAtendimento)
	server.POST("/Satisfacao/VerificarAtendimento", routes.VerificarAtendimento)
	server.POST("/Satisfacao/UpdateSatisfacao", routes.UpdateSatisfacao)

}

func DesempenhoRoutes(server *gin.Engine) {
	server.POST("/Desempenho/ReadDesempenho", routes.ReadDesempenho)
}

func MetaRoutes(server *gin.Engine) {
	server.POST("/Meta/ReadMeta", routes.ReadMeta)
	server.POST("/Meta/RegisterMeta", routes.RegisterMeta)
	server.POST("/Meta/UpdateMeta", routes.UpdateMeta)
	server.POST("/Meta/ReadMetaAtual", routes.ReadMetaAtual)
}

func ClienteRoutes(server *gin.Engine) {
	server.POST("/Cliente/ReadClientes", routes.ReadClientes)
	server.POST("/Cliente/ReadClienteDet", routes.ReadClienteDet)
	server.POST("/Cliente/RegisterCliente", routes.RegisterCliente)
	server.POST("/Cliente/ArchiveCliente", routes.ArchiveCliente)
	// server.POST("/Cliente/AtivarCliente", routes.AtivarCliente)
	server.POST("/Cliente/UpdateClienteDetalhes", routes.UpdateClienteDetalhes)
}

func AparelhoRoutes(server *gin.Engine) {
	server.POST("/Aparelho/ReadAparelhos", routes.ReadAparelhos)
	server.POST("/Aparelho/ReadAparelhoDet", routes.ReadAparelhoDet)
	server.POST("/Aparelho/RegisterAparelho", routes.RegisterAparelho)
	server.POST("/Aparelho/ArchiveAparelho", routes.ArchiveAparelho)
	server.POST("/Aparelho/UpdateAparelhoDetalhes", routes.UpdateAparelhoDetalhes)
}

func ExercicioRoutes(server *gin.Engine) {
	server.POST("/Exercicio/ReadExercicios", routes.ReadExercicios)
	server.POST("/Exercicio/ReadExercicioDet", routes.ReadExercicioDet)
	server.POST("/Exercicio/RegisterExercicio", routes.RegisterExercicio)
	server.POST("/Exercicio/ArchiveExercicio", routes.ArchiveExercicio)
	server.POST("/Exercicio/UpdateExercicioDetalhes", routes.UpdateExercicioDetalhes)
}

func FuncionarioRoutes(server *gin.Engine) {
	server.POST("/Funcionario/ReadFuncionarios", routes.ReadFuncionarios)
	server.POST("/Funcionario/ReadFuncionarioDet", routes.ReadFuncionarioDet)
	server.POST("/Funcionario/RegisterFuncionario", routes.RegisterFuncionario)
	server.POST("/Funcionario/ArchiveFuncionario", routes.ArchiveFuncionario)
	server.POST("/Funcionario/UpdateFuncionarioDetalhes", routes.UpdateFuncionarioDetalhes)
	server.POST("/Funcionario/MeuDesempenho", routes.FuncionarioMeuDesempenho)
}

func PlanoRoutes(server *gin.Engine) {
	server.POST("/Plano/ReadPlanos", routes.ReadPlanos)
	// server.POST("/Plano/ReadPlanoDet", routes.ReadPlanoDet)
	// server.POST("/Plano/RegisterPlano", routes.RegisterPlano)
	// server.POST("/Plano/ArchivePlano", routes.ArchivePlano)
	// server.POST("/Plano/UpdatePlanoDetalhes", routes.UpdatePlanoDetalhes)
}

func AcademiaRoutes(server *gin.Engine) {
	server.POST("/Academia/ReadAcademiaDet", routes.ReadAcademiaDet)
	server.POST("/Academia/ReadAcademiaLista", routes.ReadAcademiaLista)
	server.POST("/Academia/CreateAcademia", routes.CreateAcademia)
	server.POST("/Academia/AddAdministrador", routes.AddAdministrador)
	server.POST("/Academia/InsertAcademiaToTheOptions", routes.InsertAcademiaToTheOptions)
}

func FichaRoutes(server *gin.Engine) {
	server.POST("/Ficha/ReadClienteFicha", routes.ReadClienteFicha)
	server.POST("/Ficha/ReadFicha", routes.ReadFicha)
	server.POST("/Ficha/ReadFichaDetalhes", routes.ReadFichaDetalhes)
	server.POST("/Ficha/ReadFichaDetalhesGeral", routes.ReadFichaDetalhesGeral)
	server.POST("/Ficha/RegisterFicha", routes.RegisterFicha)
	server.POST("/Ficha/RegisterDetalhesFicha", routes.RegisterDetalhesFicha)
	server.POST("/Ficha/UpdateDetalhesFicha", routes.UpdateDetalhesFicha)
	server.POST("/Ficha/UpdateCampoFicha", routes.UpdateCampoFicha)
	server.POST("/Ficha/DeleteCampoFicha", routes.DeleteCampoFicha)
}

func DashboardRoutes(server *gin.Engine) {
	// server.POST("/DashBoard/TaxaAdocao", routes.TaxaAdocao)
	server.POST("/DashBoard/ReadSatisfacao", routes.ReadSatisfacao)
	server.POST("/DashBoard/ReadAtendimentos", routes.ReadAtendimentos)
	server.POST("/DashBoard/ReadAllAtendimentos", routes.ReadAllAtendimentos)
	server.POST("/DashBoard/ReadFuncNome", routes.ReadFuncNome)
	server.POST("/DashBoard/ReadAllEngajamentos", routes.ReadAllEngajamentos)
	// server.POST("/DashBoard/AvaliacaoPerformance", routes.AvaliacaoPerformance)
	// server.POST("/DashBoard/Roi", routes.Roi)
}
