package domain

type FunIdData struct {
	FunId int64 `json:"FunId"`
}

type CliIdData struct {
	CliId int64 `json:"CliId"`
}

type IdAcadData struct {
	IdAcad int64 `json:"IdAcad"`
}

type DetIdData struct {
	DetId int64 `json:"DetId"`
}

type AteIdData struct {
	AteId int64
}

type ExeIdData struct {
	ExeId int64 `json:"ExeId"`
}

type CliTipo struct {
	CliId             int64
	Tipo              string
	DetHoraAdicionado string
}

type CliFicha struct {
	CliId  int64
	IdAcad int64
}

type CpfData struct {
	Id     int64
	Cpf    string
	Modulo string
}
type EmailData struct {
	Id     int64
	Email  string
	Modulo string
}

type RecuperarSenhaData struct {
	Email  string
	Modulo string
	Senha  string
}
