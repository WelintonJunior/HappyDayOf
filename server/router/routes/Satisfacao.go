package routes

import (
	"net/http"

	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type SatisfacaoHandlers struct {
	service *application.SatisfacaoService
}

func NewSatisfacaoHandlers(service *application.SatisfacaoService) *SatisfacaoHandlers {
	return &SatisfacaoHandlers{service: service}
}

func (h *SatisfacaoHandlers) VerifySatisfacaoAtendimento(context *gin.Context) {
	var s domain.Satisfacao

	if err := context.ShouldBindJSON(&s); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}
	s, err := h.service.VerifySatisfacaoAtendimento(s.SatIdCliente, s.SatIdAcademia)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Verificar dados"})
		return
	}

	context.JSON(http.StatusOK, s)
}

func (h *SatisfacaoHandlers) VerificarAtendimento(context *gin.Context) {
	var s domain.Satisfacao

	if err := context.ShouldBindJSON(&s); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	s, err := h.service.VerificarAtendimento(s.SatIdCliente, s.SatIdAcademia)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Verificar dados"})
		return
	}

	context.JSON(http.StatusOK, s)
}

func (h *SatisfacaoHandlers) UpdateSatisfacao(context *gin.Context) {
	var s domain.Satisfacao

	if err := context.ShouldBindJSON(&s); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.UpdateSatisfacao(s); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Dados"})
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}
