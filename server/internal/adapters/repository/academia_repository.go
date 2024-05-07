package repository

import (
	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
	"golang.org/x/crypto/bcrypt"
)

type AcademiaRepository interface {
	ReadAcademiaLista() ([]domain.Academia, error)
	ReadAcademiaDet(acaId int64) (domain.Academia, error)
	CreateAcademia(academia domain.Academia) error
	InsertAcademiaToTheOptions() (domain.Academia, error)
	AddAdministrador(domain.Administrador) error
}

type localAcademiaRepository struct{}

func NewLocalAcademiaRepository() *localAcademiaRepository {
	return &localAcademiaRepository{}
}

func (r *localAcademiaRepository) ReadAcademiaLista() ([]domain.Academia, error) {
	query := "select acaNome, acaDataCadastro, acaStatus, acaCelular from tblAcademia"
	rows, err := database.DB.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Academias []domain.Academia

	for rows.Next() {
		var a domain.Academia
		if err := rows.Scan(&a.AcaNome, &a.AcaDataCadastro, &a.AcaStatus, &a.AcaCelular); err != nil {
			return nil, err
		}
		Academias = append(Academias, a)
	}

	return Academias, nil

}

func (r *localAcademiaRepository) ReadAcademiaDet(AcaId int64) (domain.Academia, error) {
	query := "select * from tblAcademia where acaId = ?"

	row := database.DB.QueryRow(query, AcaId)

	var a domain.Academia
	if err := row.Scan(&a.AcaId, &a.AcaCnpj, &a.AcaNome, &a.AcaDataCadastro, &a.AcaStatus, &a.AcaCelular, &a.AcaCep, &a.AcaCor, &a.AcaTelefone); err != nil {
		return domain.Academia{}, err
	}

	return a, nil

}

func (r *localAcademiaRepository) CreateAcademia(a domain.Academia) error {
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

func (r *localAcademiaRepository) AddAdministrador(adm domain.Administrador) error {
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

func (r *localAcademiaRepository) InsertAcademiaToTheOptions() (domain.Academia, error) {
	query := "SELECT * FROM tblAcademia ORDER BY acaId DESC LIMIT 1"
	row := database.DB.QueryRow(query)

	var a domain.Academia
	if err := row.Scan(&a.AcaId, &a.AcaCnpj, &a.AcaNome, &a.AcaDataCadastro, &a.AcaStatus, &a.AcaCelular, &a.AcaCep, &a.AcaCor, &a.AcaTelefone); err != nil {
		return domain.Academia{}, nil
	}

	return a, nil
}
