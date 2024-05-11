package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type DesempenhoRepository interface {
	ReadDesempenho(IdCliente int64) ([]domain.Desempenho, error)
	ReadExerciciosForDesempenho(CliId int64) ([]domain.FicDet, error)
	ReadExerciciosFichaCliente(CliId int64) ([]domain.FicDet, error)
}

type localDesempenhoRepository struct{}

func NewLocalDesempenhoRepository() *localDesempenhoRepository {
	return &localDesempenhoRepository{}
}

func (r *localDesempenhoRepository) ReadDesempenho(IdCliente int64) ([]domain.Desempenho, error) {
	query := "select * from tblDesempenho where desIdCliente = ? order by desData"
	rows, err := database.DB.Query(query, IdCliente)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var desempenhos []domain.Desempenho
	for rows.Next() {
		var d domain.Desempenho
		if err := rows.Scan(&d.DesId, &d.DesIdCliente, &d.DesData, &d.DesPeso, &d.DesGordura); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		desempenhos = append(desempenhos, d)
	}

	return desempenhos, nil
}

func (r *localDesempenhoRepository) ReadExerciciosForDesempenho(CliId int64) ([]domain.FicDet, error) {
	query := `SELECT 
	d.detId,
    d.detVariacao, 
    d.detDataAdicionado,
    d.detCarga FROM tblFichaDetalhes AS d
LEFT JOIN tblFicha AS f ON d.detIdFicha = f.ficId 
LEFT JOIN tblExercicios AS e ON e.exeNome = d.detVariacao
WHERE f.ficIdCliente = ? AND e.exeApaId != 1 order by detDataAdicionado;`

	rows, err := database.DB.Query(query, CliId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var exercicios []domain.FicDet
	for rows.Next() {
		var e domain.FicDet
		if err := rows.Scan(&e.DetId, &e.DetVariacao, &e.DetDataAdicionado, &e.DetCarga); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		exercicios = append(exercicios, e)
	}

	return exercicios, nil
}

func (r *localDesempenhoRepository) ReadExerciciosFichaCliente(CliId int64) ([]domain.FicDet, error) {
	query := `SELECT d.detVariacao, MAX(d.detId) as detId FROM tblFichaDetalhes as d INNER JOIN tblFicha as f ON f.ficIdCliente = ? GROUP BY d.detVariacao;
`
	rows, err := database.DB.Query(query, CliId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var exercicios []domain.FicDet
	for rows.Next() {
		var e domain.FicDet
		if err := rows.Scan(&e.DetVariacao, &e.DetId); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		exercicios = append(exercicios, e)
	}

	return exercicios, nil
}
