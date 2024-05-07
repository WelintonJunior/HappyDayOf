package repository

import (
	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type AparelhoRepository interface {
	ReadAparelhos(idAcad int64) ([]domain.Aparelho, error)
	ReadAparelhoDet(ApaId, idAcad int64) (domain.Aparelho, error)
	CreateAparelho(a domain.Aparelho) error
	ArchiveAparelho(ApaId int64) error
	UpdateAparelhoDetalhes(a domain.Aparelho) error
}

type localAparelhoRepository struct{}

func NewLocalAparelhoRepository() *localAparelhoRepository {
	return &localAparelhoRepository{}
}

func (r *localAparelhoRepository) ReadAparelhos(idAcad int64) ([]domain.Aparelho, error) {
	query := "SELECT * FROM tblAparelhos WHERE apaIdAcad = ? ORDER BY apaStatus DESC, apaNome ASC"

	rows, err := database.DB.Query(query, idAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Aparelhos []domain.Aparelho

	for rows.Next() {
		var a domain.Aparelho
		if err := rows.Scan(&a.ApaId, &a.ApaNome, &a.ApaDataEntrada, &a.ApaDataSaida, &a.ApaStatus, &a.ApaIdAcad); err != nil {
			return nil, err
		}
		Aparelhos = append(Aparelhos, a)
	}

	return Aparelhos, nil
}

func (r *localAparelhoRepository) ReadAparelhoDet(ApaId, idAcad int64) (domain.Aparelho, error) {
	query := "select * from tblAparelhos where apaId = ? and apaIdAcad = ?"

	row := database.DB.QueryRow(query, ApaId, idAcad)

	var a domain.Aparelho
	if err := row.Scan(&a.ApaId, &a.ApaNome, &a.ApaDataEntrada, &a.ApaDataSaida, &a.ApaStatus, &a.ApaIdAcad); err != nil {
		return domain.Aparelho{}, err
	}

	return a, nil
}

func (r *localAparelhoRepository) CreateAparelho(a domain.Aparelho) error {
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

func (r *localAparelhoRepository) ArchiveAparelho(ApaId int64) error {
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

func (r *localAparelhoRepository) UpdateAparelhoDetalhes(a domain.Aparelho) error {
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
