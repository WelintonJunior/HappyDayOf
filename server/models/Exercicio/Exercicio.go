package EXERCICIO

import (
	"example.com/fitConnect/database"
)

type Exercicio struct {
	ExeId     int64
	ExeNome   string
	ExeApaId  string
	ExeStatus int64
	ExeIdAcad int64
}

func ReadExercicios(idAcad int64) ([]Exercicio, error) {
	query := "SELECT * FROM tblExercicios WHERE exeIdAcad = ? ORDER BY exeStatus DESC, exeNome ASC"

	rows, err := database.DB.Query(query, idAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Exercicios []Exercicio

	for rows.Next() {
		var e Exercicio
		if err := rows.Scan(&e.ExeId, &e.ExeNome, &e.ExeApaId, &e.ExeStatus, &e.ExeIdAcad); err != nil {
			return nil, err
		}
		Exercicios = append(Exercicios, e)
	}

	return Exercicios, nil

}

func ReadExercicioDet(ExeId, idAcad int64) (Exercicio, error) {
	query := "select * from tblExercicios where exeId = ? and exeIdAcad = ? "

	row := database.DB.QueryRow(query, ExeId, idAcad)

	var e Exercicio
	if err := row.Scan(&e.ExeId, &e.ExeNome, &e.ExeApaId, &e.ExeStatus, &e.ExeIdAcad); err != nil {
		return Exercicio{}, err
	}

	return e, nil

}

func (e Exercicio) New() error {
	query := "insert into tblExercicios values (DEFAULT, ?, ?, 1, ?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(e.ExeNome, e.ExeApaId, e.ExeIdAcad)

	if err != nil {
		return err
	}

	return nil
}

func ArchiveExercicio(ExeId int64) error {
	query := "update tblExercicio set exeStatus = ? where exeId = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(0, ExeId)

	if err != nil {
		return err
	}

	return nil
}

func (e Exercicio) UpdateExercicioDetalhes() error {
	query := "update tblExercicios set exeNome = ?, exeApaId = ?, exeStatus = ? where exeId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(e.ExeNome, e.ExeApaId, e.ExeStatus, e.ExeId)

	if err != nil {
		return err
	}

	return nil

}
