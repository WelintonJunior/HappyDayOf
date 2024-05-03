package PLANO

import (
	"example.com/fitConnect/database"
)

type Plano struct {
	PlaId     int64
	PlaNome   string
	PlaPreco  float64
	PlaQtdMes int64
	PlaIdAcad int64
}

func ReadPlanos(idAcad int64) ([]Plano, error) {
	query := "select * from tblPlanos where plaIdAcad = ?"

	rows, err := database.DB.Query(query, idAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var planos []Plano
	for rows.Next() {
		var p Plano
		if err := rows.Scan(&p.PlaId, &p.PlaNome, &p.PlaPreco, &p.PlaQtdMes, &p.PlaIdAcad); err != nil {
			return nil, err
		}
		planos = append(planos, p)
	}

	return planos, nil

}

// func ReadplanosDet(PlaId, idAcad int64) (Plano, error) {
// 	query := "select * from tblPlano where plaId = ? and plaIdAcad = ? "

// 	row := database.DB.QueryRow(query, PlaId, idAcad)

// 	var p Plano
// 	if err := row.Scan(&p.PlaId, &p.PlaNome, &p.PlaPreco, &p.PlaQtdMes, &p.PlaIdAcad); err != nil {
// 		return Plano{}, err
// 	}

// 	return p, nil

// }

// func (p Plano) New() error {
// 	query := "insert into tblPlano values (DEFAULT, ?, ?, 1, ?)"

// 	stmt, err := database.DB.Prepare(query)

// 	if err != nil {
// 		return err
// 	}

// 	defer stmt.Close()

// 	_, err = stmt.Exec(e.ExeNome, e.ExeApaId, e.ExeIdAcad)

// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }

// func ArchivePlano(ExeId int64) error {
// 	query := "update tblPlano set exeStatus = ? where exeId = ?"

// 	stmt, err := database.DB.Prepare(query)

// 	if err != nil {
// 		return err
// 	}

// 	defer stmt.Close()

// 	_, err = stmt.Exec(0, ExeId)

// 	if err != nil {
// 		return err
// 	}

// 	return nil
// }

// func (e Plano) UpdatePlanoDetalhes() error {
// 	query := "update tblPlano set exeNome = ?, exeApaId = ?, exeStatus = ? where exeId = ?"
// 	stmt, err := database.DB.Prepare(query)

// 	if err != nil {
// 		return err
// 	}

// 	defer stmt.Close()

// 	_, err = stmt.Exec(e.ExeNome, e.ExeApaId, e.ExeStatus, e.ExeId)

// 	if err != nil {
// 		return err
// 	}

// 	return nil

// }
