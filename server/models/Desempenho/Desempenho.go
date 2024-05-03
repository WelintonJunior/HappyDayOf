package DESEMPENHO

import "example.com/fitConnect/database"

type Desempenho struct {
	DesId        int64
	DesIdCliente int64
	DesData      string
	DesPeso      float64
	DesGordura   float64
}

func ReadDesempenho(IdCliente int64) ([]Desempenho, error) {
	query := "select * from tblDesempenho where desIdCliente = ? order by desData"
	rows, err := database.DB.Query(query, IdCliente)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var desempenhos []Desempenho
	for rows.Next() {
		var d Desempenho
		if err := rows.Scan(&d.DesId, &d.DesIdCliente, &d.DesData, &d.DesPeso, &d.DesGordura); err != nil {
			return nil, err
		}
		desempenhos = append(desempenhos, d)
	}

	return desempenhos, nil
}
