package routes

import (
	"fmt"
	"net/http"

	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type MetaHandlers struct {
	service *application.MetaService
}

func NewMetaHandlers(service *application.MetaService) *MetaHandlers {
	return &MetaHandlers{service: service}
}

func (h *MetaHandlers) ReadMetas(context *gin.Context) {
	var m domain.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	metas, err := h.service.ReadMetas(m.MetIdCliente)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, metas)
}

func (h *MetaHandlers) RegisterMeta(context *gin.Context) {
	var m domain.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.CreateMeta(m); err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *MetaHandlers) UpdateMeta(context *gin.Context) {
	var m domain.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.UpdateMeta(m); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *MetaHandlers) ReadMetaAtual(context *gin.Context) {
	var m domain.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	meta, err := h.service.ReadMetaAtual(m.MetIdCliente, m.MetIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, meta)
}
