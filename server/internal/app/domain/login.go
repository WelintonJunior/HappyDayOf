package domain

type ClienteLogin struct {
	CliId     int64
	CliNome   string
	CliIdAcad int64
	CliEmail  string `binding:"required" json:"email"`
	CliSenha  string `binding:"required" json:"senha"`
	DateNow   string
	Token     string
}

type FuncionarioLogin struct {
	FunId     int64
	FunNome   string
	FunIdAcad *int64
	FunEmail  string `binding:"required" json:"email"`
	FunSenha  string `binding:"required" json:"senha"`
	FunNivel  int64
	Token     string
}
