package ATENDIMENTO

import (
	"database/sql"

	"example.com/fitConnect/database"
	CLIENTE "example.com/fitConnect/models/Cliente"
	FUNCIONARIO "example.com/fitConnect/models/Funcionario"
)

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
	CLIENTE.Cliente
	FUNCIONARIO.Funcionario
}

func ReadStatusAtendimento(AteIdCliente, AteIdAcad int64, AteDateInicio string) (Atendimento, error) {
	query := "select ateStatus from tblAtendimento where ateIdCliente = ? and ateDateInicio <= ? and ateDateEncerramento is null and ateIdAcad = ?"

	row := database.DB.QueryRow(query, AteIdCliente, AteDateInicio, AteIdAcad)

	var a Atendimento
	if err := row.Scan(&a.AteStatus); err != nil {
		if err == sql.ErrNoRows {
			return Atendimento{}, nil
		}
		return Atendimento{}, err
	}

	return a, nil
}

func ReadAtendimentoInfo(AteId int64) (Atendimento, error) {
	query := "select * from tblAtendimento where ateId = ?"

	row := database.DB.QueryRow(query, AteId)

	var a Atendimento
	if err := row.Scan(&a.AteId, &a.AteIdCliente, &a.AteIdFuncionario, &a.AteDateInicio, &a.AteIdAcad, &a.AteStatus, &a.AteDateEncerramento); err != nil {
		if err == sql.ErrNoRows {
			return Atendimento{}, nil
		}
		return Atendimento{}, err
	}

	return a, nil
}

func ReadAtendimento(AteIdAcad, AteIdFuncionario int64) ([]ResultReadAtendimento, error) {
	query := "select a.*,f.funId,c.cliNome from tblAtendimento as a join tblCliente as c on a.ateIdCliente = c.cliId join tblFuncionario as f on a.ateIdFuncionario = f.funId where a.ateIdAcad = ? and a.ateIdFuncionario = ? order by a.ateStatus desc , a.ateDateInicio desc"
	rows, err := database.DB.Query(query, AteIdAcad, AteIdFuncionario)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var resultReadAtendimento []ResultReadAtendimento

	for rows.Next() {
		var r ResultReadAtendimento
		if err := rows.Scan(&r.AteId, &r.AteIdCliente, &r.AteIdFuncionario, &r.AteDateInicio, &r.AteIdAcad, &r.AteStatus, &r.AteDateEncerramento, &r.FunId, &r.CliNome); err != nil {
			return nil, err
		}
		resultReadAtendimento = append(resultReadAtendimento, r)

	}

	return resultReadAtendimento, nil
}

func (a Atendimento) New() error {
	query := "insert into tblAtendimento values (default, ?, ?, ?, ?, 1, null)"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.AteIdCliente, a.AteIdFuncionario, a.AteDateInicio, a.AteIdAcad)

	if err != nil {
		return err
	}

	return nil
}

func (a Atendimento) Validar() (bool, error) {
	query := "select a.*,f.funId,c.cliNome from tblAtendimento as a join tblCliente as c on a.ateIdCliente = c.cliId join tblFuncionario as f on a.ateIdFuncionario = f.funId where a.ateIdAcad = ? and a.ateIdFuncionario = ? and c.cliId = ? and a.ateStatus = 1"
	rows, err := database.DB.Query(query, a.AteIdAcad, a.AteIdFuncionario, a.AteIdCliente)

	if err != nil {
		return false, err
	}

	if rows.Next() {
		return false, nil
	}

	return true, nil
}

func (a Atendimento) UpdateStatusAtendimento() error {
	query := "update tblAtendimento set ateStatus = 0, ateDateEncerramento = ? where ateId = ? and ateIdAcad = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.AteDateEncerramento, a.AteId, a.AteIdAcad)

	if err != nil {
		return err
	}

	err = InsertSatisfacaoVazia(a)

	if err != nil {
		return err
	}

	return nil
}

func InsertSatisfacaoVazia(a Atendimento) error {
	query := "insert into tblSatisfacao values (default, ?, ?, null, null, null, null, null, ?, 0)"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.AteIdCliente, a.AteIdAcad, a.AteId)

	if err != nil {
		return err
	}

	return nil
}
