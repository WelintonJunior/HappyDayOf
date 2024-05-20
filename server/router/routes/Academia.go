package routes

import (
	"net/http"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type AcademiaHandlers struct {
	service *application.AcademiaService
}

func NewAcademiaHandlers(service *application.AcademiaService) *AcademiaHandlers {
	return &AcademiaHandlers{service: service}
}

func (h *AcademiaHandlers) GetAcademiaLista(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	academias, err := h.service.GetAcademiaList()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}
	context.JSON(http.StatusOK, academias)
}

func (h *AcademiaHandlers) GetAcademiaDet(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var a domain.Academia
	if err := context.ShouldBindJSON(&a); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Academia, err := h.service.GetAcademiaDetails(a.AcaId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Academia)
}

func (h *AcademiaHandlers) CreateAcademia(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var academia domain.Academia
	if err := context.ShouldBindJSON(&academia); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}
	if err := h.service.CreateAcademia(academia); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao criar academia"})
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *AcademiaHandlers) AddAdministrador(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var adm domain.Administrador
	if err := context.ShouldBindJSON(&adm); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.AddAdministrador(adm); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao cadastrar adm"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *AcademiaHandlers) InsertAcademiaToTheOptions(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	result, err := h.service.InsertAcademiaToTheOptions()
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
