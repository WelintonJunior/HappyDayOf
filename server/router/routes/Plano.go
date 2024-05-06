package routes

import (
	"net/http"

	PLANO "example.com/fitConnect/models/Plano"
	"github.com/gin-gonic/gin"
)

func ReadPlanos(context *gin.Context) {
	var p PLANO.Plano
	if err := context.ShouldBindJSON(&p); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	Planos, err := PLANO.ReadPlanos(p.PlaIdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, Planos)
}

// func ReadPlanoDet(context *gin.Context) {
// 	var p PLANO.Plano
// 	if err := context.ShouldBindJSON(&p); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	Plano, err := PLANO.ReadPlanoDet(p.PlaId, p.PlaIdAcad)

// 	if err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, Plano)
// }

// func RegisterPlano(context *gin.Context) {
// 	var p PLANO.Plano
// 	if err := context.ShouldBindJSON(&p); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	if err := p.New(); err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
// }

// func ArchivePlano(context *gin.Context) {
// 	var PlaId int64
// 	if err := context.ShouldBindJSON(&PlaId); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	if err := PLANO.ArchivePlano(PlaId); err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Arquivar Plano"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, gin.H{"message": "Arquivado com sucesso"})

// }

// func UpdatePlanoDetalhes(context *gin.Context) {
// 	var p PLANO.Plano
// 	if err := context.ShouldBindJSON(&p); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
// 		return
// 	}

// 	if err := p.UpdatePlanoDetalhes(); err != nil {
// 		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes do Plano"})
// 		return
// 	}

// 	context.JSON(http.StatusOK, gin.H{"message": "Atualizado com sucesso"})
// }
