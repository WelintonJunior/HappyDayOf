package repository

import (
	"errors"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type LoginRepository interface {
	ValidateCredentialsCliente(c domain.ClienteLogin) (domain.ClienteLogin, error)
	ValidateCredentialsFuncionario(f domain.FuncionarioLogin) (domain.FuncionarioLogin, error)
	EngajamentoAlunos(CliId, IdAcademia int64, DateNow string) error
}

type localLoginRepository struct{}

func NewLocalLoginRepository() *localLoginRepository {
	return &localLoginRepository{}
}

func (r *localLoginRepository) ValidateCredentialsCliente(c domain.ClienteLogin) (domain.ClienteLogin, error) {
	query := "select cliId, cliNome, cliIdAcad,  cliSenha from tblCliente where cliEmail = ?"
	row := database.DB.QueryRow(query, c.CliEmail)
	var retrievedPassword string
	err := row.Scan(&c.CliId, &c.CliNome, &c.CliIdAcad, &retrievedPassword)
	if err != nil {
		return domain.ClienteLogin{}, err
	}

	validateCredential, err := UTILS.CheckHashPassword(c.CliSenha, retrievedPassword)

	if err != nil {
		return domain.ClienteLogin{}, errors.New("Senhas divergentes")
	}

	if validateCredential {
		return c, nil
	} else {
		return domain.ClienteLogin{}, errors.New("Senhas divergentes")
	}
}

func (r *localLoginRepository) ValidateCredentialsFuncionario(f domain.FuncionarioLogin) (domain.FuncionarioLogin, error) {
	query := "select funId, funNome, funIdAcad,  funSenha, funNivel from tblFuncionario where funEmail = ?"
	row := database.DB.QueryRow(query, f.FunEmail)
	var retrievedPassword string
	err := row.Scan(&f.FunId, &f.FunNome, &f.FunIdAcad, &retrievedPassword, &f.FunNivel)
	if err != nil {
		return domain.FuncionarioLogin{}, err
	}

	validateCredential, err := UTILS.CheckHashPassword(f.FunSenha, retrievedPassword)

	if err != nil {
		return domain.FuncionarioLogin{}, err
	}

	if validateCredential {
		return f, nil
	} else {
		return domain.FuncionarioLogin{}, errors.New("Credentials invalid")
	}
}

func (r *localLoginRepository) EngajamentoAlunos(CliId, IdAcademia int64, DateNow string) error {
	query := "insert into tblEngajamento values (default, ?, ?, ?)"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(CliId, DateNow, IdAcademia)

	if err != nil {
		return err
	}

	return nil
}
