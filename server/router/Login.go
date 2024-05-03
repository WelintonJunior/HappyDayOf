package router

import (
	"fmt"
	"net/http"

	UTILS "example.com/fitConnect/Utils"
	LOGIN "example.com/fitConnect/models/Login"
	"github.com/gin-gonic/gin"
)

func LoginCliente(context *gin.Context) {
	var c LOGIN.Cliente

	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados", "error": true})
		return
	}

	cliente, err := c.ValidateCredentials()
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"messsage": "Não foi possivel autenticar", "error": true})
		return
	}

	token, err := UTILS.GenerateTokenCliente(c.CliEmail, c.CliId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"messsage": "Não foi possivel autenticar", "error": true})
		return
	}

	context.JSON(http.StatusOK, gin.H{"messsage": "Sucesso", "error": false, "token": token, "dados": cliente})

}

func LoginFuncionario(context *gin.Context) {
	var f LOGIN.Funcionario

	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados", "error": true})
		return
	}

	funcionario, err := f.ValidateCredentials()
	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusUnauthorized, gin.H{"messsage": "Não foi possivel autenticar", "error": true})
		return
	}

	token, err := UTILS.GenerateTokenFuncionario(f.FunEmail, f.FunId)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"messsage": "Não foi possivel autenticar", "error": true})
		return
	}

	context.JSON(http.StatusOK, gin.H{"messsage": "Sucesso", "error": false, "token": token, "dados": funcionario})

}
