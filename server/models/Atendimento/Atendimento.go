package ATENDIMENTO

import (
	"database/sql"

	"example.com/fitConnect/database"
)

type Atendimento struct {
	AteId               int64
	AteIdCliente        int64
	AteIdFuncionario    int64
	AteDateInicio       string
	AteIdAcad           int64
	AteStatus           int64
	AteDateEncerramento string
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
