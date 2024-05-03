package CLIENTE

import "example.com/fitConnect/database"

type Cliente struct {
	CliId        int64
	CliNome      string
	CliCep       string
	CliCidade    string
	CliEstado    string
	CliRua       string
	CliNumeroRua int64
	CliSexo      string
	CliCpf       string
	CliEmail     string
	CliDataCmc   string
	CliStatus    int64
	CliPlano     int64
	CliIdAcad    int64
	CliSenha     string
}

func ReadClientes(idAcad int64) ([]Cliente, error) {
	query := "SELECT * FROM tblCliente WHERE cliIdAcad = ? ORDER BY cliStatus DESC, cliNome ASC"

	rows, err := database.DB.Query(query, idAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var clientes []Cliente

	for rows.Next() {
		var c Cliente
		if err := rows.Scan(&c.CliId, &c.CliNome, &c.CliCep, &c.CliCidade, &c.CliEstado, &c.CliRua, &c.CliNumeroRua, &c.CliSexo, &c.CliCpf, &c.CliEmail, &c.CliDataCmc, &c.CliStatus, &c.CliPlano, &c.CliIdAcad, &c.CliSenha)
	}

}
