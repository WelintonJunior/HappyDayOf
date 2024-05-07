package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type SatisfacaoRepository interface {
	VerifySatisfacaoAtendimento(CliId, IdAcad int64) (domain.Satisfacao, error)
	VerificarAtendimento(CliId, IdAcad int64) (domain.Satisfacao, error)
	UpdateSatisfacao(s domain.Satisfacao) error
}

type localSatisfacaoRepository struct{}

func NewLocalSatisfacaoRepository() *localSatisfacaoRepository {
	return &localSatisfacaoRepository{}
}

func (r *localSatisfacaoRepository) VerifySatisfacaoAtendimento(CliId, IdAcad int64) (domain.Satisfacao, error) {
	query := "select satStatus from tblSatisfacao where satIdCliente = ? and satIdAcademia = ? and satStatus = 0"

	row := database.DB.QueryRow(query, CliId, IdAcad)

	var s domain.Satisfacao

	if err := row.Scan(&s.SatStatus); err != nil {
		return domain.Satisfacao{}, err
	}

	return s, nil
}

func (r *localSatisfacaoRepository) VerificarAtendimento(CliId, IdAcad int64) (domain.Satisfacao, error) {
	query := "select * from tblSatisfacao where satIdCliente = ? and satIdAcademia = ? and satStatus = 0"

	row := database.DB.QueryRow(query, CliId, IdAcad)

	var s domain.Satisfacao

	if err := row.Scan(&s.SatId, &s.SatIdCliente, &s.SatIdAcademia, &s.SatNotaClareza, &s.SatNotaConhecimento, &s.SatNotaProatividade, &s.SatNotaDisponibilidade, &s.SatNotaSeguranca, &s.SatIdAtendimento, &s.SatStatus); err != nil {
		if err == sql.ErrNoRows {
			return domain.Satisfacao{}, nil

		}
		return domain.Satisfacao{}, err
	}

	return s, nil
}

func (r *localSatisfacaoRepository) UpdateSatisfacao(s domain.Satisfacao) error {
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
