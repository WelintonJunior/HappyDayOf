package ACADEMIA

import (
	"example.com/fitConnect/database"
	ADMINISTRADOR "example.com/fitConnect/models/Administrador"
	"golang.org/x/crypto/bcrypt"
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

func ReadAcademiaLista() ([]Academia, error) {
	query := "select acaNome, acaDataCadastro, acaStatus, acaCelular from tblAcademia"

	rows, err := database.DB.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Academias []Academia

	for rows.Next() {
		var a Academia
		if err := rows.Scan(&a.AcaNome, &a.AcaDataCadastro, &a.AcaStatus, &a.AcaCelular); err != nil {
			return nil, err
		}
		Academias = append(Academias, a)
	}

	return Academias, nil

}

func ReadAcademiaDet(AcaId int64) (Academia, error) {
	query := "select * from tblAcademia where acaId = ?"

	row := database.DB.QueryRow(query, AcaId)

	var a Academia
	if err := row.Scan(&a.AcaId, &a.AcaCnpj, &a.AcaNome, &a.AcaDataCadastro, &a.AcaStatus, &a.AcaCelular, &a.AcaCep, &a.AcaCor, &a.AcaTelefone); err != nil {
		return Academia{}, err
	}

	return a, nil

}

func (a Academia) New() error {
	query := "insert into tblAcademia values (DEFAULT,?,?,?,?,?,?,?,?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.AcaCnpj, a.AcaNome, a.AcaDataCadastro, 1, a.AcaCelular, a.AcaCep, a.AcaCor, a.AcaTelefone)

	if err != nil {
		return err
	}

	return nil
}

func AddAdministrador(adm ADMINISTRADOR.Administrador) error {
	query := "insert into tblFuncionario values(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, 2)"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	retriviedPassword, err := bcrypt.GenerateFromPassword([]byte(adm.AdmSenha), 14)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(adm.AdmNome, adm.AdmCelular, adm.AdmCep, adm.AdmCidade, adm.AdmEstado, adm.AdmRua, adm.AdmNumeroRua, adm.AdmSexo, adm.AdmCpf, adm.AdmEmail, adm.AdmDataCmc, adm.AdmIdAcad, retriviedPassword)

	if err != nil {
		return err
	}

	return nil
}

func InsertAcademiaToTheOptions() (Academia, error) {
	query := "SELECT * FROM tblAcademia ORDER BY acaId DESC LIMIT 1"
	row := database.DB.QueryRow(query)

	var a Academia
	if err := row.Scan(&a.AcaId, &a.AcaCnpj, &a.AcaNome, &a.AcaDataCadastro, &a.AcaStatus, &a.AcaCelular, &a.AcaCep, &a.AcaCor, &a.AcaTelefone); err != nil {
		return Academia{}, nil
	}

	return a, nil
}

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
