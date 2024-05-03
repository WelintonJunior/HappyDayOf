package DASHBOARD

import (
	"database/sql"

	"example.com/fitConnect/database"
	ATENDIMENTO "example.com/fitConnect/models/Atendimento"
	SATISFACAO "example.com/fitConnect/models/Satisfacao"
)

func ReadSatisfacao(AcaId int64) ([]SATISFACAO.Satisfacao, error) {
	query := "select * from tblSatisfacao where satStatus = 1 and satIdAcademia = ?"
	rows, err := database.DB.Query(query, AcaId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var satisfacoes []SATISFACAO.Satisfacao
	for rows.Next() {
		var s SATISFACAO.Satisfacao
		if err := rows.Scan(&s.SatId, &s.SatIdCliente, &s.SatIdAcademia, &s.SatNotaClareza, &s.SatNotaConhecimento, &s.SatNotaProatividade, &s.SatNotaDisponibilidade, &s.SatNotaSeguranca, &s.SatIdAtendimento, &s.SatStatus); err != nil {
			return nil, err
		}
		satisfacoes = append(satisfacoes, s)
	}
	return satisfacoes, nil

}
func ReadAtendimentos(AteId int64) (ATENDIMENTO.Atendimento, error) {
	query := "select ateIdFuncionario from tblAtendimento where ateId = ?"
	row := database.DB.QueryRow(query, AteId)

	var a ATENDIMENTO.Atendimento
	if err := row.Scan(&a.AteIdFuncionario); err != nil {
		if err == sql.ErrNoRows {
			return ATENDIMENTO.Atendimento{}, nil
		}
		return ATENDIMENTO.Atendimento{}, err
	}
	return a, nil
}

func ReadFuncNome(FunId int64) (string, error) {
	query := "select funnome from tblFuncionario where funId = ?"

	row := database.DB.QueryRow(query, FunId)

	var funNome string

	if err := row.Scan(&funNome); err != nil {
		if err == sql.ErrNoRows {
			return "", nil
		}
		return "", err
	}

	return funNome, nil
}

func ReadAllAtendimentos(AcaId int64) ([]ATENDIMENTO.Atendimento, error) {
	query := "select * from tblAtendimento where ateIdAcad = ?"
	rows, err := database.DB.Query(query, AcaId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var atendimentos []ATENDIMENTO.Atendimento
	for rows.Next() {
		var a ATENDIMENTO.Atendimento
		if err := rows.Scan(&a.AteId, &a.AteIdCliente, &a.AteIdFuncionario, &a.AteDateInicio, &a.AteIdAcad, &a.AteStatus, &a.AteDateEncerramento); err != nil {
			return nil, err
		}
		atendimentos = append(atendimentos, a)
	}

	return atendimentos, nil

}

type Engajamento struct {
	EngId             int64
	EngIdCliente      int64
	EngAccessDatetime string
	EngIdAcad         int64
}

func ReadAllEngajamentos(AcaId int64) ([]Engajamento, error) {
	query := "select * from tblEngajamento where engIdAcad = ?"
	rows, err := database.DB.Query(query, AcaId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var engajamento []Engajamento

	for rows.Next() {
		var e Engajamento
		if err := rows.Scan(&e.EngId, &e.EngIdCliente, &e.EngAccessDatetime, &e.EngIdAcad); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		engajamento = append(engajamento, e)
	}

	return engajamento, nil
}
