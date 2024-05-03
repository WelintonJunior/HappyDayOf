package LOGIN

import (
	"errors"

	"example.com/fitConnect/database"
)

type Cliente struct {
	CliId     int64
	CliNome   string
	CliIdAcad int64
	CliEmail  string `binding:"required" json:"email"`
	CliSenha  string `binding:"required" json:"senha"`
	Token     string
}

type Funcionario struct {
	FunId     int64
	FunNome   string
	FunIdAcad int64
	FunEmail  string `binding:"required" json:"email"`
	FunSenha  string `binding:"required" json:"senha"`
	FunNivel  int64
	Token     string
}

func (c Cliente) ValidateCredentials() (Cliente, error) {
	query := "select cliId, cliNome, cliIdAcad,  cliSenha from tblCliente where cliEmail = ?"
	row := database.DB.QueryRow(query, c.CliEmail)
	var retrievedPassword string
	err := row.Scan(&c.CliId, &c.CliNome, &c.CliIdAcad, &retrievedPassword)
	if err != nil {
		return Cliente{}, err
	}

	if retrievedPassword == c.CliSenha {
		return c, nil
	} else {
		return Cliente{}, errors.New("Senhas divergentes")
	}

	// 	if validateCredential := utils.CheckHashPassword(c.CliPassword, retrievedPassword); validateCredential {
	// 		return nil
	// 	} else {
	// 		return errors.New("Credentials invalid")
	// 	}
}

func (f Funcionario) ValidateCredentials() (Funcionario, error) {
	query := "select funId, funNome, funIdAcad,  funSenha, funNivel from tblFuncionario where funEmail = ?"
	row := database.DB.QueryRow(query, f.FunEmail)
	var retrievedPassword string
	err := row.Scan(&f.FunId, &f.FunNome, &f.FunIdAcad, &retrievedPassword, &f.FunNivel)
	if err != nil {
		return Funcionario{}, err
	}

	if retrievedPassword == f.FunSenha {
		return f, nil
	} else {
		return Funcionario{}, errors.New("Senhas divergentes")
	}

	// 	if validateCredential := utils.CheckHashPassword(c.CliPassword, retrievedPassword); validateCredential {
	// 		return nil
	// 	} else {
	// 		return errors.New("Credentials invalid")
	// 	}
}
