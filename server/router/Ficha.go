package router

import (
	"fmt"
	"net/http"

	FICHA "example.com/fitConnect/models/Ficha"
	"github.com/gin-gonic/gin"
)

type CliIdData struct {
	CliId int64 `json:"CliId"`
}

type IdAcadData struct {
	IdAcad int64 `json:"IdAcad"`
}

type DetIdData struct {
	DetId int64 `json:"DetId"`
}

func ReadClienteFicha(context *gin.Context) {
	var IdAcad IdAcadData
	if err := context.ShouldBindJSON(&IdAcad); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	clientesFichas, err := FICHA.ReadClienteFicha(IdAcad.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, clientesFichas)

}

type CliFicha struct {
	CliId  int64
	IdAcad int64
}

func ReadFicha(context *gin.Context) {
	var cliFicha CliFicha

	if err := context.ShouldBindJSON(&cliFicha); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	ficha, err := FICHA.ReadFicha(cliFicha.CliId, cliFicha.IdAcad)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, ficha)
}

type CliTipo struct {
	CliId int64
	Tipo  string
}

func ReadFichaDetalhes(context *gin.Context) {
	var cliTipo CliTipo

	if err := context.ShouldBindJSON(&cliTipo); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	ficha, err := FICHA.ReadFichaDetalhes(cliTipo.CliId, cliTipo.Tipo)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, ficha)
}

func ReadFichaDetalhesGeral(context *gin.Context) {
	var CliId CliIdData

	if err := context.ShouldBindJSON(&CliId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	ficha, err := FICHA.ReadFichaDetalhesGeral(CliId.CliId)

	if err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao ler dados"})
		return
	}

	context.JSON(http.StatusOK, ficha)
}

func RegisterFicha(context *gin.Context) {
	var ficha FICHA.Ficha

	if err := context.ShouldBindJSON(&ficha); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := ficha.New(); err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Cadastrar Ficha"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func RegisterDetalhesFicha(context *gin.Context) {
	var detFicha FICHA.FichaDetalhes

	if err := context.ShouldBindJSON(&detFicha); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := detFicha.New(); err != nil {
		fmt.Println(err)
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Cadastrar Detalhes da Ficha"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func UpdateDetalhesFicha(context *gin.Context) {
	var detFicha FICHA.FichaDetalhes

	if err := context.ShouldBindJSON(&detFicha); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := detFicha.Update(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Detalhes da Ficha"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})

}

func UpdateCampoFicha(context *gin.Context) {
	var campoFicha FICHA.CampoFicha
	if err := context.ShouldBindJSON(&campoFicha); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := campoFicha.Update(); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Atualizar Campo da Ficha"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}

func DeleteCampoFicha(context *gin.Context) {
	var DetId DetIdData
	if err := context.ShouldBindJSON(&DetId); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Erro ao receber dados"})
		return
	}

	if err := FICHA.DeleteCampoFicha(DetId.DetId); err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao Deletar Campo da Ficha"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Sucesso"})
}
