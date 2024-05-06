package routes

import (
	"net/http"

	DASHBOARD "example.com/fitConnect/models/DashBoard"
	"github.com/gin-gonic/gin"
)

func ReadSatisfacao(context *gin.Context) {
	var AcaId IdAcadData

	if err := context.ShouldBindJSON(&AcaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	satisfacoes, err := DASHBOARD.ReadSatisfacao(AcaId.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, satisfacoes)

}

type AteIdData struct {
	AteId int64
}

func ReadAtendimentos(context *gin.Context) {
	var AteId AteIdData

	if err := context.ShouldBindJSON(&AteId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimentos, err := DASHBOARD.ReadAtendimentos(AteId.AteId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, atendimentos)

}

func ReadFuncNome(context *gin.Context) {
	var FunId FunIdData
	if err := context.ShouldBindJSON(&FunId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	FunNome, err := DASHBOARD.ReadFuncNome(FunId.FunId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, FunNome)

}

func ReadAllAtendimentos(context *gin.Context) {
	var AcaId IdAcadData
	if err := context.ShouldBindJSON(&AcaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimentos, err := DASHBOARD.ReadAllAtendimentos(AcaId.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, atendimentos)

}

func ReadAllEngajamentos(context *gin.Context) {
	var AcaId IdAcadData
	if err := context.ShouldBindJSON(&AcaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	engajamentos, err := DASHBOARD.ReadAllEngajamentos(AcaId.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, engajamentos)
}
