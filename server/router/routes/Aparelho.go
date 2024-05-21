package routes

import (
	"net/http"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type ApaIdData struct {
	ApaId int64 `json:"ApaId"`
}

type AparelhoHandlers struct {
	service *application.AparelhoService
}

func NewAparelhoHandlers(service *application.AparelhoService) *AparelhoHandlers {
	return &AparelhoHandlers{service: service}
}

func (h *AparelhoHandlers) GetAparelhoList(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var a ApaIdData
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Aparelhos, err := h.service.GetAparelhoList(a.ApaId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Aparelhos)
}

func (h *AparelhoHandlers) ReadAparelhoDet(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var a domain.Aparelho
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Aparelho, err := h.service.GetAparelhoDetails(a.ApaId, a.ApaIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Aparelho)
}

func (h *AparelhoHandlers) RegisterAparelho(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var a domain.Aparelho
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.CreateAparelho(a); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *AparelhoHandlers) ArchiveAparelho(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var ApaId ApaIdData
	if err := context.ShouldBindJSON(&ApaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.ArchiveAparelho(ApaId.ApaId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Aparelho"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})
}

func (h *AparelhoHandlers) UpdateAparelhoDetalhes(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var a domain.Aparelho
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.UpdateAparelhoDetalhes(a); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Aparelho"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
}

func (h *AparelhoHandlers) AtivarAparelho(context *gin.Context) {
	var ApaId int64
	if err := context.ShouldBindJSON(&ApaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.AtivarAparelho(ApaId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ativar aparelho"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}
