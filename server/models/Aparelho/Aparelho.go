package APARELHO

import (
	"example.com/fitConnect/database"
)

type Aparelho struct {
	ApaId          int64
	ApaNome        string
	ApaDataEntrada string
	ApaDataSaida   *string
	ApaStatus      int64
	ApaIdAcad      int64
}

func ReadAparelhos(idAcad int64) ([]Aparelho, error) {
	query := "SELECT * FROM tblAparelhos WHERE apaIdAcad = ? ORDER BY apaStatus DESC, apaNome ASC"

	rows, err := database.DB.Query(query, idAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Aparelhos []Aparelho

	for rows.Next() {
		var a Aparelho
		if err := rows.Scan(&a.ApaId, &a.ApaNome, &a.ApaDataEntrada, &a.ApaDataSaida, &a.ApaStatus, &a.ApaIdAcad); err != nil {
			return nil, err
		}
		Aparelhos = append(Aparelhos, a)
	}

	return Aparelhos, nil

}

func ReadAparelhoDet(ApaId, idAcad int64) (Aparelho, error) {
	query := "select * from tblAparelhos where apaId = ? and apaIdAcad = ?"

	row := database.DB.QueryRow(query, ApaId, idAcad)

	var a Aparelho
	if err := row.Scan(&a.ApaId, &a.ApaNome, &a.ApaDataEntrada, &a.ApaDataSaida, &a.ApaStatus, &a.ApaIdAcad); err != nil {
		return Aparelho{}, err
	}

	return a, nil

}

func (a Aparelho) New() error {
	query := "insert into tblAparelhos values (DEFAULT, ?, ?, null ,1, ?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.ApaNome, a.ApaDataEntrada, a.ApaIdAcad)

	if err != nil {
		return err
	}

	return nil
}

func ArchiveAparelho(ApaId int64) error {
	query := "update tblAparelhos set apaStatus = ? where apaId = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(0, ApaId)

	if err != nil {
		return err
	}

	return nil
}

func (a Aparelho) UpdateAparelhoDetalhes() error {
	query := "update tblAparelhos set apaNome = ?, apaDataEntrada = ?, apaStatus = ? where apaId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.ApaNome, a.ApaDataEntrada, a.ApaStatus, a.ApaId)

	if err != nil {
		return err
	}

	return nil

}
