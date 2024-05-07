package routes

import (
	"log"
	"net/http"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type LoginHandlers struct {
	service *application.LoginService
}

func NewLoginHandlers(service *application.LoginService) *LoginHandlers {
	return &LoginHandlers{service: service}
}

func (h *LoginHandlers) LoginCliente(context *gin.Context) {
	var c domain.ClienteLogin

	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados", "error": true})
		return
	}

	cliente, err := h.service.ValidateCredentialsCliente(c)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não foi possível autenticar", "error": true})
		return
	}

	token, err := UTILS.GenerateTokenCliente(c.CliEmail, cliente.CliId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Não foi possível gerar token", "error": true})
		return
	}

	go func() {
		if err := h.service.EngajamentoAlunos(cliente.CliId, cliente.CliIdAcad, c.DateNow); err != nil {
			log.Printf("Erro ao registrar engajamento: %v", err)
		}
	}()

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso", "error": false, "token": token, "dados": cliente})
}

func (h *LoginHandlers) LoginFuncionario(context *gin.Context) {
	var f domain.FuncionarioLogin

	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados", "error": true})
		return
	}

	funcionario, err := h.service.ValidateCredentialsFuncionario(f)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"messsage": "Não foi possivel autenticar", "error": true})
		return
	}

	token, err := UTILS.GenerateTokenFuncionario(f.FunEmail, f.FunId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"messsage": "Não foi possivel autenticar", "error": true})
		return
	}

	context.JSON(http.StatusOK, gin.H{"messsage": "Sucesso", "error": false, "token": token, "dados": funcionario})

}
