package routes

import (
	"net/http"

	ACADEMIA "example.com/fitConnect/models/Academia"
	ADMINISTRADOR "example.com/fitConnect/models/Administrador"
	"github.com/gin-gonic/gin"
)

func ReadAcademiaLista(context *gin.Context) {
	Academias, err := ACADEMIA.ReadAcademiaLista()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Academias)
}

func ReadAcademiaDet(context *gin.Context) {
	var a ACADEMIA.Academia
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Academia, err := ACADEMIA.ReadAcademiaDet(a.AcaId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Academia)
}

func CreateAcademia(context *gin.Context) {
	var a ACADEMIA.Academia
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

func AddAdministrador(context *gin.Context) {
	var adm ADMINISTRADOR.Administrador
	if err := context.ShouldBindJSON(&adm); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := ACADEMIA.AddAdministrador(adm); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao cadastrar adm"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func InsertAcademiaToTheOptions(context *gin.Context) {
	result, err := ACADEMIA.InsertAcademiaToTheOptions()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao cadastrar adm"})
		return
	}

	context.JSON(http.StatusOK, result)
}

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
