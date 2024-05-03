package router

import (
	"net/http"

	UTILSFRT "example.com/fitConnect/models/Utils"
	"github.com/gin-gonic/gin"
)

type CpfData struct {
	Id     int64
	Cpf    string
	Modulo string
}
type EmailData struct {
	Id     int64
	Email  string
	Modulo string
}

func VerificarCpfCadastrado(context *gin.Context) {
	var c CpfData
	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := UTILSFRT.VerificarCpfCadastrado(c.Modulo, c.Cpf, c.Id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func VerificarCpfCadastradoGeral(context *gin.Context) {
	var c CpfData
	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := UTILSFRT.VerificarCpfCadastradoGeral(c.Modulo, c.Cpf)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func VerificarEmailCadastrado(context *gin.Context) {
	var e EmailData
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := UTILSFRT.VerificarEmailCadastrado(e.Modulo, e.Email, e.Id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func VerificarEmailCadastradoGeral(context *gin.Context) {
	var e EmailData
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := UTILSFRT.VerificarEmailCadastradoGeral(e.Modulo, e.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}
