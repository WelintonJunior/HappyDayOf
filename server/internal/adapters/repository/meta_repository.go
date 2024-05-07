package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type MetaRepository interface {
	ReadMeta(IdCliente int64) (domain.Meta, error)
	CreateMeta(m domain.Meta) error
	UpdateMeta(m domain.Meta) error
	ReadMetaAtual(idCliente, idAcademia int64) (domain.Meta, error)
}

type localMetaRepository struct{}

func NewLocalMetaRepository() *localMetaRepository {
	return &localMetaRepository{}
}

func (r *localMetaRepository) ReadMeta(IdCliente int64) (domain.Meta, error) {
	query := "select * from tblMeta where metIdCliente = ? and metStatus = 1"
	row := database.DB.QueryRow(query, IdCliente)

	var m domain.Meta
	if err := row.Scan(&m.MetId, &m.MetIdCliente, &m.MetGordura, &m.MetPeso, &m.MetDataCumprir, &m.MetStatus, &m.MetStatusAlterar, &m.MetIdAcad); err != nil {
		if err == sql.ErrNoRows {
			return domain.Meta{}, nil
		}
		return domain.Meta{}, err
	}

	return m, nil
}

func (r *localMetaRepository) CreateMeta(m domain.Meta) error {
	query := "insert into tblMeta values (default, ?, ?, ?, ?, 1, 0, ?)"
	stmt, err := database.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(m.MetIdCliente, m.MetGordura, m.MetPeso, m.MetDataCumprir, m.MetIdAcad)

	if err != nil {
		return err
	}

	return nil
}

func (r *localMetaRepository) UpdateMeta(m domain.Meta) error {
	query := "update tblMeta set metGordura = ?, metPeso = ?, metDataCumprir = ?, metStatusAlterar = 1 where metId = ?"
	stmt, err := database.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(m.MetGordura, m.MetPeso, m.MetDataCumprir, m.MetId)

	if err != nil {
		return err
	}

	return nil
}

func (r *localMetaRepository) ReadMetaAtual(idCliente, idAcademia int64) (domain.Meta, error) {
	query := "select metId, metStatusAlterar from tblMeta where metIdCliente = ? and metIdAcad = ?"
	row := database.DB.QueryRow(query, idCliente, idAcademia)

	var m domain.Meta

	if err := row.Scan(&m.MetId, &m.MetStatusAlterar); err != nil {
		return domain.Meta{}, err
	}

	return m, nil
}
