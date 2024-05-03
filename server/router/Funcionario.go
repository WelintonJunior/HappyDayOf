package router

import (
	"fmt"
	"net/http"

	FUNCIONARIO "example.com/fitConnect/models/Funcionario"
	"github.com/gin-gonic/gin"
)

type FunIdData struct {
	FunId int64 `json:"FunId"`
}

func ReadFuncionarios(context *gin.Context) {
	var f FUNCIONARIO.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Funcionarios, err := FUNCIONARIO.ReadFuncionarios(f.FunIdAcad, f.FunNivel)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Funcionarios)
}

func ReadFuncionarioDet(context *gin.Context) {
	var f FUNCIONARIO.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	fmt.Println(f)

	Funcionario, err := FUNCIONARIO.ReadFuncionarioDet(f.FunId, f.FunIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Funcionario)
}

func RegisterFuncionario(context *gin.Context) {
	var f FUNCIONARIO.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := f.New(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func ArchiveFuncionario(context *gin.Context) {
	var FunId FunIdData
	if err := context.ShouldBindJSON(&FunId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := FUNCIONARIO.ArchiveFuncionario(FunId.FunId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Funcionario"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})

}

func UpdateFuncionarioDetalhes(context *gin.Context) {
	var f FUNCIONARIO.Funcionario
	if err := context.ShouldBindJSON(&f); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := f.UpdateFuncionarioDetalhes(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Funcionario"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
}
