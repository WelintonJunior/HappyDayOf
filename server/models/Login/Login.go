package LOGIN

import (
	"errors"

	UTILS "example.com/fitConnect/Utils"
	"example.com/fitConnect/database"
)

type Cliente struct {
	CliId     int64
	CliNome   string
	CliIdAcad int64
	CliEmail  string `binding:"required" json:"email"`
	CliSenha  string `binding:"required" json:"senha"`
	DateNow   string
	Token     string
}

type Funcionario struct {
	FunId     int64
	FunNome   string
	FunIdAcad *int64
	FunEmail  string `binding:"required" json:"email"`
	FunSenha  string `binding:"required" json:"senha"`
	FunNivel  int64
	Token     string
}

func EngajamentoAlunos(CliId, IdAcademia int64, DateNow string) error {
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

func (c Cliente) ValidateCredentials() (Cliente, error) {
	query := "select cliId, cliNome, cliIdAcad,  cliSenha from tblCliente where cliEmail = ?"
	row := database.DB.QueryRow(query, c.CliEmail)
	var retrievedPassword string
	err := row.Scan(&c.CliId, &c.CliNome, &c.CliIdAcad, &retrievedPassword)
	if err != nil {
		return Cliente{}, err
	}

	validateCredential, err := UTILS.CheckHashPassword(c.CliSenha, retrievedPassword)

	if err != nil {
		return Cliente{}, errors.New("Senhas divergentes")
	}

	if validateCredential {
		return c, nil
	} else {
		return Cliente{}, errors.New("Senhas divergentes")
	}
}

func (f Funcionario) ValidateCredentials() (Funcionario, error) {
	query := "select funId, funNome, funIdAcad,  funSenha, funNivel from tblFuncionario where funEmail = ?"
	row := database.DB.QueryRow(query, f.FunEmail)
	var retrievedPassword string
	err := row.Scan(&f.FunId, &f.FunNome, &f.FunIdAcad, &retrievedPassword, &f.FunNivel)
	if err != nil {
		return Funcionario{}, err
	}

	validateCredential, err := UTILS.CheckHashPassword(f.FunSenha, retrievedPassword)

	if err != nil {
		return Funcionario{}, err
	}

	if validateCredential {
		return f, nil
	} else {
		return Funcionario{}, errors.New("Credentials invalid")
	}
}
