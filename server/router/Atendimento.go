package router

import (
	"fmt"
	"net/http"

	ATENDIMENTO "example.com/fitConnect/models/Atendimento"
	"github.com/gin-gonic/gin"
)

func ReadStatusAtendimento(context *gin.Context) {

	var a ATENDIMENTO.Atendimento

	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimento, err := ATENDIMENTO.ReadStatusAtendimento(a.AteIdCliente, a.AteIdAcad, a.AteDateInicio)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro Pesquisar dados"})
		return
	}

	context.JSON(http.StatusOK, atendimento)

}

func ReadAtendimentoInfo(context *gin.Context) {
	var a ATENDIMENTO.Atendimento
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimento, err := ATENDIMENTO.ReadAtendimentoInfo(a.AteId)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro Pesquisar dados"})
		return
	}

	context.JSON(http.StatusOK, atendimento)

}
