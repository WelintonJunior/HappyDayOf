package routes

import (
	"net/http"

	META "example.com/fitConnect/models/Meta"
	"github.com/gin-gonic/gin"
)

func ReadMeta(context *gin.Context) {
	var m META.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	meta, err := META.ReadMeta(m.MetIdCliente)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, meta)
}

func RegisterMeta(context *gin.Context) {
	var m META.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := m.New(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func UpdateMeta(context *gin.Context) {
	var m META.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := m.Update(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func ReadMetaAtual(context *gin.Context) {
	var m META.Meta

	if err := context.ShouldBindJSON(&m); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	meta, err := META.ReadMetaAtual(m.MetIdCliente, m.MetIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, meta)
}
