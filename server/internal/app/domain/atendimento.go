package domain

type Atendimento struct {
	AteId               int64
	AteIdCliente        int64
	AteIdFuncionario    int64
	AteDateInicio       string
	AteIdAcad           int64
	AteStatus           int64
	AteDateEncerramento *string
}

type ResultReadAtendimento struct {
	Atendimento
	Cliente
	Funcionario
}
