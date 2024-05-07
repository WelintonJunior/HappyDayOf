package domain

type ClienteFicha struct {
	ClienteExisteNaFicha int64
	Cliente
}

type Ficha struct {
	FicId             int64
	FicIdCliente      int64
	FicIdFuncionario  int64
	FicIdAcademia     int64
	FicIntervalo      string
	FicRestricoes     int64
	FicTipoRestricoes string
}

type FichaDetalhes struct {
	DetId        int64
	DetVariacao  string
	DetCarga     int64
	DetSerie     int64
	DetRepeticao int64
	DetIdFicha   int64
	DetTreino    string
}

type FicDet struct {
	Ficha
	FichaDetalhes
}

type CampoFicha struct {
	DetCampo string
	DetValor string
	DetId    int64
}
