package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type MetaRepository interface {
	ReadMetas(IdCliente int64) ([]domain.Meta, error)
	CreateMeta(m domain.Meta) error
	UpdateMeta(m domain.Meta) error
	ReadMetaAtual(idCliente, idAcademia int64) (domain.Meta, error)
}

type localMetaRepository struct{}

func NewLocalMetaRepository() *localMetaRepository {
	return &localMetaRepository{}
}

func (r *localMetaRepository) ReadMetas(IdCliente int64) ([]domain.Meta, error) {
	query := "select m.*, e.exeNome from tblMeta as m left join tblFichaDetalhes as d on m.metIdExercicio = d.detId left join tblExercicios as e on d.detVariacao = e.exeNome where m.metStatus = 1 and m.metIdCliente = ?;"
	rows, err := database.DB.Query(query, IdCliente)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var metas []domain.Meta
	for rows.Next() {
		var m domain.Meta
		if err := rows.Scan(&m.MetId, &m.MetIdCliente, &m.MetDataCumprir, &m.MetStatus, &m.MetStatusAlterar, &m.MetIdAcad, &m.MetCarga, &m.MetIdExercicio, &m.ExeNome); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		metas = append(metas, m)
	}

	return metas, nil
}

func (r *localMetaRepository) CreateMeta(m domain.Meta) error {
	query := "insert into tblMeta values (default, ?, ?, 1, 0, ?, ?, ?)"
	stmt, err := database.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(m.MetIdCliente, m.MetDataCumprir, m.MetIdAcad, m.MetCarga, m.MetIdExercicio)

	if err != nil {
		return err
	}

	return nil
}

func (r *localMetaRepository) UpdateMeta(m domain.Meta) error {
	query := "update tblMeta set metDataCumprir = ?, metStatusAlterar = 1 where metId = ?"
	stmt, err := database.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(m.MetDataCumprir, m.MetId)

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
