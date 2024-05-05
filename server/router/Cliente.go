package router

import (
	"fmt"
	"net/http"

	CLIENTE "example.com/fitConnect/models/Cliente"
	"github.com/gin-gonic/gin"
)

func ReadClientes(context *gin.Context) {
	var c CLIENTE.Cliente

	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	clientes, err := CLIENTE.ReadClientes(c.CliIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, clientes)
}

func ReadClienteDet(context *gin.Context) {
	var c CLIENTE.Cliente
	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	cliente, err := CLIENTE.ReadClienteDet(c.CliId, c.CliIdAcad)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, cliente)
}

func RegisterCliente(context *gin.Context) {
	var c CLIENTE.Cliente
	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := c.New(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func ArchiveCliente(context *gin.Context) {
	var CliId CliIdData
	if err := context.ShouldBindJSON(&CliId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := CLIENTE.ArchiveCliente(CliId.CliId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Cliente"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})

}

func UpdateClienteDetalhes(context *gin.Context) {
	var c CLIENTE.Cliente
	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := c.UpdateClienteDetalhes(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Cliente"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
}

// func AtivarCliente(context *gin.Context) {
// 	var CliId CliIdData
// 	if err := context.ShouldBindJSON(&CliId); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// }
