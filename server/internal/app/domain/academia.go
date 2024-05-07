package domain

type Academia struct {
	AcaId           int64 `json:"AcaId"`
	AcaCnpj         string
	AcaNome         string
	AcaDataCadastro string
	AcaStatus       int64
	AcaCelular      string
	AcaCep          string
	AcaCor          string
	AcaTelefone     string
}
