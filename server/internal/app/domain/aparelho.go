package domain

type Aparelho struct {
	ApaId          int64
	ApaNome        string
	ApaDataEntrada string
	ApaDataSaida   *string
	ApaStatus      int64
	ApaIdAcad      int64
}
