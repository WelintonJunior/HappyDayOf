package router

import (
	"fmt"
	"net/http"

	SATISFACAO "example.com/fitConnect/models/Satisfacao"
	"github.com/gin-gonic/gin"
)

func VerifySatisfacaoAtendimento(context *gin.Context) {
	var s SATISFACAO.Satisfacao

	if err := context.ShouldBindJSON(&s); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	s, err := SATISFACAO.VerifySatisfacaoAtendimento(s.SatIdCliente, s.SatIdAcademia)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Verificar dados"})
		return
	}

	context.JSON(http.StatusOK, s)

}

func VerificarAtendimento(context *gin.Context) {
	var s SATISFACAO.Satisfacao

	if err := context.ShouldBindJSON(&s); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	s, err := SATISFACAO.VerificarAtendimento(s.SatIdCliente, s.SatIdAcademia)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Verificar dados"})
		return
	}

	context.JSON(http.StatusOK, s)

}

func UpdateSatisfacao(context *gin.Context) {
	var s SATISFACAO.Satisfacao

	if err := context.ShouldBindJSON(&s); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := s.Update(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Dados"})
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}
