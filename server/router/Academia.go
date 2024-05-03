package router

import (
	"fmt"
	"net/http"

	ACADEMIA "example.com/fitConnect/models/Academia"
	"github.com/gin-gonic/gin"
)

// func ReadAcademias(context *gin.Context) {
// 	var e Academia.Academia
// 	if err := context.ShouldBindJSON(&e); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	Academias, err := Academia.ReadAcademias(e.ExeIdAcad)

// 	if err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, Academias)
// }

func ReadAcademiaDet(context *gin.Context) {
	var a ACADEMIA.Academia
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	fmt.Println(a)

	Academia, err := ACADEMIA.ReadAcademiaDet(a.AcaId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Academia)
}

// func RegisterAcademia(context *gin.Context) {
// 	var e Academia.Academia
// 	if err := context.ShouldBindJSON(&e); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	if err := e.New(); err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
// }

// func ArchiveAcademia(context *gin.Context) {
// 	var ExeId int64
// 	if err := context.ShouldBindJSON(&ExeId); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	if err := Academia.ArchiveAcademia(ExeId); err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Academia"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})

// }

// func UpdateAcademiaDetalhes(context *gin.Context) {
// 	var e Academia.Academia
// 	if err := context.ShouldBindJSON(&e); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	if err := e.UpdateAcademiaDetalhes(); err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Academia"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
// }
