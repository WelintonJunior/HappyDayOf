package router

import (
	"fmt"
	"net/http"

	EXERCICIO "example.com/fitConnect/models/Exercicio"
	"github.com/gin-gonic/gin"
)

type ExeIdData struct {
	ExeId int64 `json:"ExeId"`
}

func ReadExercicios(context *gin.Context) {
	var e EXERCICIO.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Exercicios, err := EXERCICIO.ReadExercicios(e.ExeIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Exercicios)
}

func ReadExercicioDet(context *gin.Context) {
	var e EXERCICIO.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Exercicio, err := EXERCICIO.ReadExercicioDet(e.ExeId, e.ExeIdAcad)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Exercicio)
}

func RegisterExercicio(context *gin.Context) {
	var e EXERCICIO.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := e.New(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func ArchiveExercicio(context *gin.Context) {
	var ExeId ExeIdData
	if err := context.ShouldBindJSON(&ExeId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := EXERCICIO.ArchiveExercicio(ExeId.ExeId); err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Exercicio"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})

}

func UpdateExercicioDetalhes(context *gin.Context) {
	var e EXERCICIO.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := e.UpdateExercicioDetalhes(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Exercicio"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
}
