package CLIENTE

import (
	"database/sql"

	"example.com/fitConnect/database"
	"golang.org/x/crypto/bcrypt"
)

type Cliente struct {
	CliId        int64
	CliNome      string
	CliCelular   string
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
		if err := rows.Scan(&c.CliId, &c.CliNome, &c.CliCelular, &c.CliCep, &c.CliCidade, &c.CliEstado, &c.CliRua, &c.CliNumeroRua, &c.CliSexo, &c.CliCpf, &c.CliEmail, &c.CliDataCmc, &c.CliStatus, &c.CliPlano, &c.CliIdAcad, &c.CliSenha); err != nil {
			return nil, err
		}
		clientes = append(clientes, c)
	}

	return clientes, nil

}

func ReadClienteDet(CliId, idAcad int64) (Cliente, error) {
	query := "select * from tblCliente where cliId = ? and cliIdAcad = ?"

	row := database.DB.QueryRow(query, CliId, idAcad)

	var c Cliente
	if err := row.Scan(&c.CliId, &c.CliNome, &c.CliCelular, &c.CliCep, &c.CliCidade, &c.CliEstado, &c.CliRua, &c.CliNumeroRua, &c.CliSexo, &c.CliCpf, &c.CliEmail, &c.CliDataCmc, &c.CliStatus, &c.CliPlano, &c.CliIdAcad, &c.CliSenha); err != nil {
		if err == sql.ErrNoRows {
			return Cliente{}, nil
		}
		return Cliente{}, err
	}

	return c, nil

}

func (c Cliente) New() error {
	query := "insert into tblCliente values (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	hashed, err := bcrypt.GenerateFromPassword([]byte(c.CliSenha), 14)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(c.CliNome, c.CliCelular, c.CliCep, c.CliCidade, c.CliEstado, c.CliRua, c.CliNumeroRua, c.CliSexo, c.CliCpf, c.CliEmail, c.CliDataCmc, c.CliStatus, c.CliPlano, c.CliIdAcad, hashed)

	if err != nil {
		return err
	}

	return nil
}

func ArchiveCliente(CliId int64) error {
	query := "update tblCliente set cliStatus = ? where cliId = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(0, CliId)

	if err != nil {
		return err
	}

	return nil
}

func (c Cliente) UpdateClienteDetalhes() error {
	query := "update tblCliente set cliNome = ?, cliCelular = ?, cliCep = ?, cliCidade = ?, cliEstado = ?, cliRua = ?, cliNumeroRua = ?, cliSexo = ?, cliCpf = ?, cliEmail = ?, cliDataCmc = ?, cliStatus = ?, cliPlano = ? where cliId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(c.CliNome, c.CliCelular, c.CliCep, c.CliCidade, c.CliEstado, c.CliRua, c.CliNumeroRua, c.CliSexo, c.CliCpf, c.CliEmail, c.CliDataCmc, c.CliStatus, c.CliPlano, c.CliId)

	if err != nil {
		return err
	}

	return nil

}

// func AtivarCliente(CliId int64) {
// 	query := ""
// }
