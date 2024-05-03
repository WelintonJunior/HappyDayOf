package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ReadDesempenho(context *gin.Context) {
	var IdCliente int64
	if err := context.ShouldBindJSON(&IdCliente); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

}
