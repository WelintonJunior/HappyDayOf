package router

import (
	"fmt"
	"net/http"

	APARELHO "example.com/fitConnect/models/Aparelho"
	"github.com/gin-gonic/gin"
)

type ApaIdData struct {
	ApaId int64 `json:"ApaId"`
}

func ReadAparelhos(context *gin.Context) {
	var a ApaIdData
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Aparelhos, err := APARELHO.ReadAparelhos(a.ApaId)

	if err != nil {
		fmt.Print(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Aparelhos)
}

func ReadAparelhoDet(context *gin.Context) {
	var a APARELHO.Aparelho
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Aparelho, err := APARELHO.ReadAparelhoDet(a.ApaId, a.ApaIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Aparelho)
}

func RegisterAparelho(context *gin.Context) {
	var a APARELHO.Aparelho
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := a.New(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func ArchiveAparelho(context *gin.Context) {
	var ApaId ApaIdData
	if err := context.ShouldBindJSON(&ApaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := APARELHO.ArchiveAparelho(ApaId.ApaId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Aparelho"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})

}

func UpdateAparelhoDetalhes(context *gin.Context) {
	var a APARELHO.Aparelho
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := a.UpdateAparelhoDetalhes(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Aparelho"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
}
