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

func (h *UtilsHandlers) EnviarEmail(context *gin.Context) {
	var EmailData domain.EmailData
	if err := context.ShouldBindJSON(&EmailData); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.EnviarEmail(EmailData.Email, EmailData.Modulo); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao enviar email"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *UtilsHandlers) VerificarCodigo(context *gin.Context) {
	var ReqCodigo int64
	if err := context.ShouldBindJSON(&ReqCodigo); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	recSenha, err := h.service.VerificarCodigo(ReqCodigo)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao verificar código"})
		return
	}

	context.JSON(http.StatusOK, recSenha)
}

func (h *UtilsHandlers) TrocarSenha(context *gin.Context) {
	var recData domain.RecuperarSenhaData
	if err := context.ShouldBindJSON(&recData); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := h.service.TrocarSenha(recData.Email, recData.Senha, recData.Modulo)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Trocar Senha"})
		return
	}

	context.JSON(http.StatusOK, result)
}
