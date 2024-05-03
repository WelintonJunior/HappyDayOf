package ACADEMIA

import (
	"example.com/fitConnect/database"
)

type Academia struct {
	AcaId           int64 `json:"AcaId"`
	AcaCnpj         string
	AcaNome         string
	AcaDataCadastro string
	AcaStatus       int64
	AcaCelular      string
	AcaCep          string
	AcaCor          string
	AcaTelefone     string
}

// func ReadExercicios(idAcad int64) ([]Exercicio, error) {
// 	query := "SELECT * FROM tblExercicios WHERE exeIdAcad = ? ORDER BY exeStatus DESC, exeNome ASC"

// 	rows, err := database.DB.Query(query, idAcad)

// 	if err != nil {
// 		return nil, err
// 	}

// 	defer rows.Close()

// 	var Exercicios []Exercicio

// 	for rows.Next() {
// 		var e Exercicio
// 		if err := rows.Scan(&e.ExeId, &e.ExeNome, &e.ExeApaId, &e.ExeStatus, &e.ExeIdAcad); err != nil {
// 			return nil, err
// 		}
// 		Exercicios = append(Exercicios, e)
// 	}

// 	return Exercicios, nil

// }

func ReadAcademiaDet(AcaId int64) (Academia, error) {
	query := "select * from tblAcademia where acaId = ?"

	row := database.DB.QueryRow(query, AcaId)

	var a Academia
	if err := row.Scan(&a.AcaId, &a.AcaCnpj, &a.AcaNome, &a.AcaDataCadastro, &a.AcaStatus, &a.AcaCelular, &a.AcaCep, &a.AcaCor, &a.AcaTelefone); err != nil {
		return Academia{}, err
	}

	return a, nil

}

// func (e Academia) New() error {
// 	query := "insert into tblExercicios values (DEFAULT, ?, ?, 1, ?)"

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

// func ArchiveExercicio(ExeId int64) error {
// 	query := "update tblExercicio set exeStatus = ? where exeId = ?"

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

// func (e Exercicio) UpdateExercicioDetalhes() error {
// 	query := "update tblExercicios set exeNome = ?, exeApaId = ?, exeStatus = ? where exeId = ?"
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
