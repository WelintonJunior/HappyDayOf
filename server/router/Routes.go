package router

import (
	"github.com/gin-gonic/gin"
)

func LoginRoutes(server *gin.Engine) {
	server.POST("/LoginCliente", LoginCliente)
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
	server.POST("/Cliente/UpdateClienteDetalhes/", UpdateClienteDetalhes)

}
