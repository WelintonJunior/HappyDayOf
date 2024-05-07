package routes

import (
	"net/http"

	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type DashboardHandlers struct {
	service *application.DashboardService
}

func NewDashBoardHandlers(service *application.DashboardService) *DashboardHandlers {
	return &DashboardHandlers{service: service}
}

func (h *DashboardHandlers) ReadSatisfacao(context *gin.Context) {
	var AcaId domain.IdAcadData

	if err := context.ShouldBindJSON(&AcaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	satisfacoes, err := h.service.ReadSatisfacao(AcaId.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, satisfacoes)
}

func (h *DashboardHandlers) ReadAtendimentos(context *gin.Context) {
	var AteId domain.AteIdData

	if err := context.ShouldBindJSON(&AteId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimentos, err := h.service.ReadAtendimentos(AteId.AteId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, atendimentos)

}

func (h *DashboardHandlers) ReadFuncNome(context *gin.Context) {
	var FunId domain.FunIdData
	if err := context.ShouldBindJSON(&FunId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	FunNome, err := h.service.ReadFuncNome(FunId.FunId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, FunNome)

}

func (h *DashboardHandlers) ReadAllAtendimentos(context *gin.Context) {
	var AcaId domain.IdAcadData
	if err := context.ShouldBindJSON(&AcaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	atendimentos, err := h.service.ReadAllAtendimentos(AcaId.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, atendimentos)

}

func (h *DashboardHandlers) ReadAllEngajamentos(context *gin.Context) {
	var AcaId domain.IdAcadData
	if err := context.ShouldBindJSON(&AcaId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	engajamentos, err := h.service.ReadAllEngajamentos(AcaId.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, engajamentos)
}
