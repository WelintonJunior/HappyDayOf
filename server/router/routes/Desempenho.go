package routes

import (
	"fmt"
	"net/http"

	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type DesempenhoHandlers struct {
	service *application.DesempenhoService
}

func NewDesempenhoHandlers(service *application.DesempenhoService) *DesempenhoHandlers {
	return &DesempenhoHandlers{service: service}
}

func (h *DesempenhoHandlers) ReadDesempenho(context *gin.Context) {
	var CliId domain.CliIdData
	if err := context.ShouldBindJSON(&CliId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	desempenho, err := h.service.ReadDesempenho(CliId.CliId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler desempenho"})
		return
	}

	context.JSON(http.StatusOK, desempenho)
}

func (h *DesempenhoHandlers) ReadExerciciosForDesempenho(context *gin.Context) {
	var CliId int64
	if err := context.ShouldBindJSON(&CliId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao ler id do cliente"})
		return
	}

	exercicios, err := h.service.ReadExerciciosForDesempenho(CliId)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler exercicios do desempenho"})
		return
	}

	context.JSON(http.StatusOK, exercicios)
}

func (h *DesempenhoHandlers) ReadExerciciosFichaCliente(context *gin.Context) {
	var CliId int64
	if err := context.ShouldBindJSON(&CliId); err != nil {
		fmt.Print(err)
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber id do cliente"})
		return
	}

	exercicios, err := h.service.ReadExerciciosFichaCliente(CliId)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao let exercicios da ficha do cliente"})
		return
	}

	context.JSON(http.StatusOK, exercicios)
}
