package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
	"golang.org/x/crypto/bcrypt"
)

type ClienteRepository interface {
	ReadClientes(idAcad int64) ([]domain.Cliente, error)
	ReadClienteDet(CliId, idAcad int64) (domain.Cliente, error)
	CreateCliente(c domain.Cliente) error
	ArchiveCliente(CliId int64) error
	UpdateClienteDetalhes(c domain.Cliente) error
	AtivarCliente(CliId int64) error
}

type localClienteRepository struct{}

func NewLocalClienteRepository() *localClienteRepository {
	return &localClienteRepository{}
}

func (r *localClienteRepository) ReadClientes(idAcad int64) ([]domain.Cliente, error) {
	query := "SELECT * FROM tblCliente WHERE cliIdAcad = ? ORDER BY cliStatus DESC, cliNome ASC"

	rows, err := database.DB.Query(query, idAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var clientes []domain.Cliente

	for rows.Next() {
		var c domain.Cliente
		if err := rows.Scan(&c.CliId, &c.CliNome, &c.CliCelular, &c.CliCep, &c.CliCidade, &c.CliEstado, &c.CliRua, &c.CliNumeroRua, &c.CliSexo, &c.CliCpf, &c.CliEmail, &c.CliDataCmc, &c.CliStatus, &c.CliPlano, &c.CliIdAcad, &c.CliSenha); err != nil {
			return nil, err
		}
		clientes = append(clientes, c)
	}

	return clientes, nil
}

func (r *localClienteRepository) ReadClienteDet(CliId, idAcad int64) (domain.Cliente, error) {
	query := "select * from tblCliente where cliId = ? and cliIdAcad = ?"

	row := database.DB.QueryRow(query, CliId, idAcad)

	var c domain.Cliente
	if err := row.Scan(&c.CliId, &c.CliNome, &c.CliCelular, &c.CliCep, &c.CliCidade, &c.CliEstado, &c.CliRua, &c.CliNumeroRua, &c.CliSexo, &c.CliCpf, &c.CliEmail, &c.CliDataCmc, &c.CliStatus, &c.CliPlano, &c.CliIdAcad, &c.CliSenha); err != nil {
		if err == sql.ErrNoRows {
			return domain.Cliente{}, nil
		}
		return domain.Cliente{}, err
	}

	return c, nil
}

func (r *localClienteRepository) CreateCliente(c domain.Cliente) error {
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

	_, err = stmt.Exec(c.CliNome, c.CliCelular, c.CliCep, c.CliCidade, c.CliEstado, c.CliRua, c.CliNumeroRua, c.CliSexo, c.CliCpf, c.CliEmail, c.CliDataCmc, 1, c.CliPlano, c.CliIdAcad, hashed)

	if err != nil {
		return err
	}

	return nil
}

func (r *localClienteRepository) ArchiveCliente(CliId int64) error {
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

func (r *localClienteRepository) UpdateClienteDetalhes(c domain.Cliente) error {
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

func (r *localClienteRepository) AtivarCliente(CliId int64) error {
	query := "update tblCliente set cliStatus = 1 where cliId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(CliId)

	if err != nil {
		return err
	}

	return nil
}
