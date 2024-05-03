package router

import (
	"github.com/gin-gonic/gin"
)

func LoginRoutes(server *gin.Engine) {
	server.POST("/LoginCliente", LoginCliente)
	server.POST("/LoginFuncionario", LoginFuncionario)
}

func UtilsRoutes(server *gin.Engine) {
	server.POST("/VerificarCpfCadastrado", VerificarCpfCadastrado)
	server.POST("/VerificarCpfCadastradoGeral", VerificarCpfCadastradoGeral)
	server.POST("/VerificarEmailCadastrado", VerificarEmailCadastrado)
	server.POST("/VerificarEmailCadastradoGeral", VerificarEmailCadastradoGeral)
}

func AtendimentoRoutes(server *gin.Engine) {
	server.POST("/Atendimento/ReadStatusAtendimento/", ReadStatusAtendimento)
	server.POST("/Atendimento/ReadAtendimentoInfo/", ReadAtendimentoInfo)

}

func SatisfacaoRoutes(server *gin.Engine) {
	server.POST("/Satisfacao/VerifySatisfacaoAtendimento/", VerifySatisfacaoAtendimento)
	server.POST("/Satisfacao/VerificarAtendimento/", VerificarAtendimento)
	server.POST("/Satisfacao/UpdateSatisfacao/", UpdateSatisfacao)

}

func DesempenhoRoutes(server *gin.Engine) {
	server.POST("/Desempenho/ReadDesempenho/", ReadDesempenho)
}

func MetaRoutes(server *gin.Engine) {
	server.POST("/Meta/ReadMeta/", ReadMeta)
	server.POST("/Meta/RegisterMeta/", RegisterMeta)
	server.POST("/Meta/UpdateMeta/", UpdateMeta)
	server.POST("/Meta/ReadMetaAtual/", ReadMetaAtual)
}

func ClienteRoutes(server *gin.Engine) {
	server.POST("/Cliente/ReadClientes/", ReadClientes)
	server.POST("/Cliente/ReadClienteDet/", ReadClienteDet)
	server.POST("/Cliente/RegisterCliente/", RegisterCliente)
	server.POST("/Cliente/ArchiveCliente/", ArchiveCliente)
	// server.POST("/Cliente/AtivarCliente/", AtivarCliente)
	server.POST("/Cliente/UpdateClienteDetalhes/", UpdateClienteDetalhes)
}

func AparelhoRoutes(server *gin.Engine) {
	server.POST("/Aparelho/ReadAparelhos/", ReadAparelhos)
	server.POST("/Aparelho/ReadAparelhoDet/", ReadAparelhoDet)
	server.POST("/Aparelho/RegisterAparelho/", RegisterAparelho)
	server.POST("/Aparelho/ArchiveAparelho/", ArchiveAparelho)
	server.POST("/Aparelho/UpdateAparelhoDetalhes/", UpdateAparelhoDetalhes)
}

func ExercicioRoutes(server *gin.Engine) {
	server.POST("/Exercicio/ReadExercicios/", ReadExercicios)
	server.POST("/Exercicio/ReadExercicioDet/", ReadExercicioDet)
	server.POST("/Exercicio/RegisterExercicio/", RegisterExercicio)
	server.POST("/Exercicio/ArchiveExercicio/", ArchiveExercicio)
	server.POST("/Exercicio/UpdateExercicioDetalhes/", UpdateExercicioDetalhes)
}

func FuncionarioRoutes(server *gin.Engine) {
	server.POST("/Funcionario/ReadFuncionarios/", ReadFuncionarios)
	server.POST("/Funcionario/ReadFuncionarioDet/", ReadFuncionarioDet)
	server.POST("/Funcionario/RegisterFuncionario/", RegisterFuncionario)
	server.POST("/Funcionario/ArchiveFuncionario/", ArchiveFuncionario)
	server.POST("/Funcionario/UpdateFuncionarioDetalhes/", UpdateFuncionarioDetalhes)
}

func PlanoRoutes(server *gin.Engine) {
	server.POST("/Plano/ReadPlanos/", ReadPlanos)
	// server.POST("/Plano/ReadPlanoDet/", ReadPlanoDet)
	// server.POST("/Plano/RegisterPlano/", RegisterPlano)
	// server.POST("/Plano/ArchivePlano/", ArchivePlano)
	// server.POST("/Plano/UpdatePlanoDetalhes/", UpdatePlanoDetalhes)
}

func AcademiaRoutes(server *gin.Engine) {
	// server.POST("/Academia/ReadAcademias/", ReadAcademias)
	server.POST("/Academia/ReadAcademiaDet/", ReadAcademiaDet)
	// server.POST("/Academia/RegisterAcademia/", RegisterAcademia)
	// server.POST("/Academia/ArchiveAcademia/", ArchiveAcademia)
	// server.POST("/Academia/UpdateAcademiaDetalhes/", UpdateAcademiaDetalhes)
}

func FichaRoutes(server *gin.Engine) {
	server.POST("/Ficha/ReadClienteFicha/", ReadClienteFicha)
	server.POST("/Ficha/ReadFicha/", ReadFicha)
	server.POST("/Ficha/ReadFichaDetalhes/", ReadFichaDetalhes)
	server.POST("/Ficha/ReadFichaDetalhesGeral/", ReadFichaDetalhesGeral)
	server.POST("/Ficha/RegisterFicha/", RegisterFicha)
	server.POST("/Ficha/RegisterDetalhesFicha/", RegisterDetalhesFicha)
	server.POST("/Ficha/UpdateDetalhesFicha/", UpdateDetalhesFicha)
	server.POST("/Ficha/UpdateCampoFicha/", UpdateCampoFicha)
	server.POST("/Ficha/DeleteCampoFicha/", DeleteCampoFicha)
}

func DashboardRoutes(server *gin.Engine) {
	// server.POST("/DashBoard/TaxaAdocao/", TaxaAdocao)
	server.POST("/DashBoard/ReadSatisfacao/", ReadSatisfacao)
	server.POST("/DashBoard/ReadAtendimentos/", ReadAtendimentos)
	server.POST("/DashBoard/ReadAllAtendimentos/", ReadAllAtendimentos)
	server.POST("/DashBoard/ReadFuncNome/", ReadFuncNome)
	server.POST("/DashBoard/ReadAllEngajamentos/", ReadAllEngajamentos)
	// server.POST("/DashBoard/AvaliacaoPerformance/", AvaliacaoPerformance)
	// server.POST("/DashBoard/Roi/", Roi)
}
