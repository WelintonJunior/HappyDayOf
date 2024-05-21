package routes

import (
	"net/http"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/internal/app/application"
	"example.com/fitConnect/internal/app/domain"
	"github.com/gin-gonic/gin"
)

type FuncionarioHandlers struct {
	service *application.FuncionarioService
}

func NewFuncionarioHandlers(service *application.FuncionarioService) *FuncionarioHandlers {
	return &FuncionarioHandlers{service: service}
}

func (h *FuncionarioHandlers) ReadFuncionarios(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var f domain.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Funcionarios, err := h.service.ReadFuncionarios(f.FunIdAcad, f.FunNivel)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Funcionarios)
}

func (h *FuncionarioHandlers) ReadFuncionarioDet(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var f domain.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Funcionario, err := h.service.ReadFuncionarioDet(f.FunId, f.FunIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Funcionario)
}

func (h *FuncionarioHandlers) RegisterFuncionario(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var f domain.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.CreateFuncionario(f); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func (h *FuncionarioHandlers) ArchiveFuncionario(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var FunId domain.FunIdData
	if err := context.ShouldBindJSON(&FunId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.ArchiveFuncionario(FunId.FunId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Funcionario"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})
}

func (h *FuncionarioHandlers) UpdateFuncionarioDetalhes(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var f domain.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.UpdateFuncionarioDetalhes(f); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Funcionario"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
}

func (h *FuncionarioHandlers) FuncionarioMeuDesempenho(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	if token == "" {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	if err := UTILS.VerifyToken(token); err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Não autorizado"})
		return
	}

	var funId domain.FunIdData
	if err := context.ShouldBindJSON(&funId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	satisfacoes, err := h.service.FuncionarioMeuDesempenho(funId.FunId)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao buscar satisfacoes do Funcionario"})
		return
	}

	context.JSON(http.StatusOK, satisfacoes)
}

func (h *FuncionarioHandlers) AtivarFuncionario(context *gin.Context) {
	var FunId int64
	if err := context.ShouldBindJSON(&FunId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := h.service.AtivarFuncionario(FunId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ativar Funcionario"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}
