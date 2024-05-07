package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type DesempenhoRepository interface {
	ReadDesempenho(IdCliente int64) ([]domain.Desempenho, error)
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
