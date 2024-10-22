package routes

import (
	"encoding/json"
	"net/http"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type AtendimentoHandlers struct {
	service *application.AtendimentoService
}

func NewAtendimentoHandlers(service *application.AtendimentoService) *AtendimentoHandlers {
	return &AtendimentoHandlers{service: service}
}

func (h *AtendimentoHandlers) ReadStatusAtendimento(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var a domain.Atendimento

	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimento, err := h.service.ReadStatusAtendimento(a.AteIdCliente, a.AteIdAcad, a.AteDateInicio)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro Pesquisar dados"})
		return
	}

	context.JSON(http.StatusOK, atendimento)
}

func (h *AtendimentoHandlers) ReadAtendimentoInfo(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var a domain.Atendimento
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimento, err := h.service.ReadAtendimentoInfo(a.AteId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro Pesquisar dados"})
		return
	}

	context.JSON(http.StatusOK, atendimento)

}

type AteAcad struct {
	AteIdAcad        int64
	AteIdFuncionario int64
}

func (h *AtendimentoHandlers) ReadAtendimento(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var ateAcad AteAcad
	if err := context.ShouldBindJSON(&ateAcad); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	results, err := h.service.ReadAtendimento(ateAcad.AteIdAcad, ateAcad.AteIdFuncionario)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro Pesquisar dados"})
		return
	}

	context.JSON(http.StatusOK, results)

}

func (h *AtendimentoHandlers) RegisterAtendimento(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var atendimento domain.Atendimento

	if err := context.ShouldBindJSON(&atendimento); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.CreateAtendimento(atendimento); err != nil {
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

func (h *AtendimentoHandlers) ValidacaoAtendimento(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var atendimento domain.Atendimento

	if err := context.ShouldBindJSON(&atendimento); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	result, err := h.service.Validar(atendimento)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao validar Atendimento"})
		return
	}

	context.JSON(http.StatusOK, result)
}

func (h *AtendimentoHandlers) UpdateStatusAtendimento(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var atendimento domain.Atendimento

	if err := context.ShouldBindJSON(&atendimento); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.UpdateStatusAtendimento(atendimento); err != nil {
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

func (h *AtendimentoHandlers) VerificarQuantidadeAtendimento(c *gin.Context) {
	qtd, err := h.service.VerificarQuantidadeAtendimento()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar quantidade de atendimento"})
		return
	}

	c.JSON(http.StatusOK, qtd)
}
