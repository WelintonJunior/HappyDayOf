package router

import (
	"encoding/json"
	"fmt"
	"net/http"

	UTILS "example.com/fitConnect/Utils"
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

type AteAcad struct {
	AteIdAcad        int64
	AteIdFuncionario int64
}

func ReadAtendimento(context *gin.Context) {
	var ateAcad AteAcad
	if err := context.ShouldBindJSON(&ateAcad); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	results, err := ATENDIMENTO.ReadAtendimento(ateAcad.AteIdAcad, ateAcad.AteIdFuncionario)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro Pesquisar dados"})
		return
	}

	context.JSON(http.StatusOK, results)

}

func RegisterAtendimento(context *gin.Context) {
	var atendimento ATENDIMENTO.Atendimento

	if err := context.ShouldBindJSON(&atendimento); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := atendimento.New(); err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro Cadastrar Atendimento"})
		return
	}

	messageRegister, _ := json.Marshal(gin.H{
		"event":               "UpdateStatusAtendimento",
		"AteId":               atendimento.AteId,
		"AteIdCliente":        atendimento.AteIdCliente,
		"AteDateEncerramento": atendimento.AteDateInicio,
		"AteIdAcad":           atendimento.AteIdAcad,
	})

	UTILS.BroadcastMessage(messageRegister)

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func ValidacaoAtendimento(context *gin.Context) {
	var atendimento ATENDIMENTO.Atendimento

	if err := context.ShouldBindJSON(&atendimento); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := atendimento.Validar()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao validar Atendimento"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func UpdateStatusAtendimento(context *gin.Context) {
	var atendimento ATENDIMENTO.Atendimento

	if err := context.ShouldBindJSON(&atendimento); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := atendimento.UpdateStatusAtendimento(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar Atendimento"})
		return
	}

	messageUpdate, _ := json.Marshal(gin.H{
		"event":               "UpdateStatusAtendimento",
		"AteId":               atendimento.AteId,
		"AteIdCliente":        atendimento.AteIdCliente,
		"AteDateEncerramento": atendimento.AteDateEncerramento,
		"AteIdAcad":           atendimento.AteIdAcad,
	})

	UTILS.BroadcastMessage(messageUpdate)

	messageClose, _ := json.Marshal(gin.H{
		"event":               "EncerrarAtendimento",
		"AteId":               atendimento.AteId,
		"AteIdCliente":        atendimento.AteIdCliente,
		"AteDateEncerramento": atendimento.AteDateEncerramento,
		"AteIdAcad":           atendimento.AteIdAcad,
	})

	UTILS.BroadcastMessage(messageClose)

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}
