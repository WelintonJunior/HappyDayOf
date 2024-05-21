package routes

import (
	"net/http"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type ExercicioHandlers struct {
	service *application.ExercicioService
}

func NewExercicioHandlers(service *application.ExercicioService) *ExercicioHandlers {
	return &ExercicioHandlers{service: service}
}

func (h *ExercicioHandlers) ReadExercicios(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var e domain.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Exercicios, err := h.service.ReadExercicios(e.ExeIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Exercicios)
}

func (h *ExercicioHandlers) ReadExercicioDet(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var e domain.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Exercicio, err := h.service.ReadExercicioDet(e.ExeId, e.ExeIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Exercicio)
}

func (h *ExercicioHandlers) RegisterExercicio(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var e domain.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.CreateExercicio(e); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *ExercicioHandlers) ArchiveExercicio(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var ExeId domain.ExeIdData
	if err := context.ShouldBindJSON(&ExeId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.ArchiveExercicio(ExeId.ExeId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Exercicio"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})
}

func (h *ExercicioHandlers) UpdateExercicioDetalhes(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var e domain.Exercicio
	if err := context.ShouldBindJSON(&e); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.UpdateExercicioDetalhes(e); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Exercicio"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
}

func (h *ExercicioHandlers) AtivarExercicio(context *gin.Context) {
	var ExeId int64
	if err := context.ShouldBindJSON(&ExeId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.AtivarExercicio(ExeId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ativar exercicio"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}
