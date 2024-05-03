package router

import (
	"net/http"

	DESEMPENHO "example.com/fitConnect/models/Desempenho"
	"github.com/gin-gonic/gin"
)

func ReadDesempenho(context *gin.Context) {
	var CliId CliIdData
	if err := context.ShouldBindJSON(&CliId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	desempenho, err := DESEMPENHO.ReadDesempenho(CliId.CliId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler desempenho"})
		return
	}

	context.JSON(http.StatusOK, desempenho)
}
