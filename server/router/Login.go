package router

import (
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

	token, err := UTILS.GenerateToken(c.CliEmail, c.CliId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"messsage": "Não foi possivel autenticar", "error": true})
		return
	}

	context.JSON(http.StatusOK, gin.H{"messsage": "Sucesso", "error": false, "token": token, "dados": cliente})

}
