package routes

import (
	"net/http"

	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type UtilsHandlers struct {
	service *application.UtilsService
}

func NewUtilsHandlers(service *application.UtilsService) *UtilsHandlers {
	return &UtilsHandlers{service: service}
}

func (h *UtilsHandlers) VerificarCpfCadastrado(context *gin.Context) {
	var c domain.CpfData
	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := h.service.VerificarCpfCadastrado(c.Modulo, c.Cpf, c.Id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func (h *UtilsHandlers) VerificarCpfCadastradoGeral(context *gin.Context) {
	var c domain.CpfData
	if err := context.ShouldBindJSON(&c); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := h.service.VerificarCpfCadastradoGeral(c.Modulo, c.Cpf)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func (h *UtilsHandlers) VerificarEmailCadastrado(context *gin.Context) {
	var e domain.EmailData
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := h.service.VerificarEmailCadastrado(e.Modulo, e.Email, e.Id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func (h *UtilsHandlers) VerificarEmailCadastradoGeral(context *gin.Context) {
	var e domain.EmailData
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := h.service.VerificarEmailCadastradoGeral(e.Modulo, e.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar dados"})
		return
	}

	context.JSON(http.StatusOK, result)
}
