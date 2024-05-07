package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type DashboardRepository interface {
	ReadSatisfacao(AcaId int64) ([]domain.Satisfacao, error)
	ReadAtendimentos(AteId int64) (domain.Atendimento, error)
	ReadFuncNome(FunId int64) (string, error)
	ReadAllAtendimentos(AcaId int64) ([]domain.Atendimento, error)
	ReadAllEngajamentos(AcaId int64) ([]domain.Engajamento, error)
}

type localDashboardRepository struct{}

func NewLocalDashboardRepository() *localDashboardRepository {
	return &localDashboardRepository{}
}

func (r *localDashboardRepository) ReadSatisfacao(AcaId int64) ([]domain.Satisfacao, error) {
	query := "select * from tblSatisfacao where satStatus = 1 and satIdAcademia = ?"
	rows, err := database.DB.Query(query, AcaId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var satisfacoes []domain.Satisfacao
	for rows.Next() {
		var s domain.Satisfacao
		if err := rows.Scan(&s.SatId, &s.SatIdCliente, &s.SatIdAcademia, &s.SatNotaClareza, &s.SatNotaConhecimento, &s.SatNotaProatividade, &s.SatNotaDisponibilidade, &s.SatNotaSeguranca, &s.SatIdAtendimento, &s.SatStatus); err != nil {
			return nil, err
		}
		satisfacoes = append(satisfacoes, s)
	}
	return satisfacoes, nil
}

func (r *localDashboardRepository) ReadAtendimentos(AteId int64) (domain.Atendimento, error) {
	query := "select ateIdFuncionario from tblAtendimento where ateId = ?"
	row := database.DB.QueryRow(query, AteId)

	var a domain.Atendimento
	if err := row.Scan(&a.AteIdFuncionario); err != nil {
		if err == sql.ErrNoRows {
			return domain.Atendimento{}, nil
		}
		return domain.Atendimento{}, err
	}
	return a, nil
}

func (r *localDashboardRepository) ReadFuncNome(FunId int64) (string, error) {
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

func (r *localDashboardRepository) ReadAllAtendimentos(AcaId int64) ([]domain.Atendimento, error) {
	query := "select * from tblAtendimento where ateIdAcad = ?"
	rows, err := database.DB.Query(query, AcaId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var atendimentos []domain.Atendimento
	for rows.Next() {
		var a domain.Atendimento
		if err := rows.Scan(&a.AteId, &a.AteIdCliente, &a.AteIdFuncionario, &a.AteDateInicio, &a.AteIdAcad, &a.AteStatus, &a.AteDateEncerramento); err != nil {
			return nil, err
		}
		atendimentos = append(atendimentos, a)
	}

	return atendimentos, nil
}

func (r *localDashboardRepository) ReadAllEngajamentos(AcaId int64) ([]domain.Engajamento, error) {
	query := "select * from tblEngajamento where engIdAcad = ?"
	rows, err := database.DB.Query(query, AcaId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var engajamento []domain.Engajamento

	for rows.Next() {
		var e domain.Engajamento
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
