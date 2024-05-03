package SATISFACAO

import (
	"database/sql"

	"example.com/fitConnect/database"
)

type Satisfacao struct {
	SatId                  int64
	SatIdCliente           int64
	SatIdAcademia          int64
	SatNotaClareza         int64
	SatNotaConhecimento    int64
	SatNotaProatividade    int64
	SatNotaDisponibilidade int64
	SatNotaSeguranca       int64
	SatIdAtendimento       int64
	SatStatus              int64
}

func VerifySatisfacaoAtendimento(CliId, IdAcad int64) (Satisfacao, error) {
	query := "select satStatus from tblSatisfacao where satIdCliente = ? and satIdAcademia = ? and satStatus = 0"

	row := database.DB.QueryRow(query, CliId, IdAcad)

	var s Satisfacao

	if err := row.Scan(&s.SatStatus); err != nil {
		return Satisfacao{}, err
	}

	return s, nil
}

func VerificarAtendimento(CliId, IdAcad int64) (Satisfacao, error) {
	query := "select * from tblSatisfacao where satIdCliente = ? and satIdAcademia = ? and satStatus = 0"

	row := database.DB.QueryRow(query, CliId, IdAcad)

	var s Satisfacao

	if err := row.Scan(&s.SatId, &s.SatIdCliente, &s.SatIdAcademia, &s.SatNotaClareza, &s.SatNotaConhecimento, &s.SatNotaProatividade, &s.SatNotaDisponibilidade, &s.SatNotaSeguranca, &s.SatIdAtendimento, &s.SatStatus); err != nil {
		if err == sql.ErrNoRows {
			return Satisfacao{}, nil

		}
		return Satisfacao{}, err
	}

	return s, nil
}

func (s Satisfacao) Update() error {
	query := "update tblSatisfacao set satNotaConhecimento = ?, satNotaClareza = ?, satNotaDisponibilidade = ?, satNotaProatividade = ?, satNotaSeguranca = ?, satStatus = 1 where satId = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(s.SatNotaConhecimento, s.SatNotaClareza, s.SatNotaDisponibilidade, s.SatNotaProatividade, s.SatNotaSeguranca, s.SatId)

	if err != nil {
		return err
	}

	return nil
}
