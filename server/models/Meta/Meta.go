package META

import (
	"database/sql"

	"example.com/fitConnect/database"
)

type Meta struct {
	MetId            int64
	MetIdCliente     int64
	MetGordura       float64
	MetPeso          float64
	MetDataCumprir   string
	MetStatus        int64
	MetStatusAlterar int64
	MetIdAcad        int64
}

func ReadMeta(IdCliente int64) (Meta, error) {
	query := "select * from tblMeta where metIdCliente = ? and metStatus = 1"
	row := database.DB.QueryRow(query, IdCliente)

	var m Meta
	if err := row.Scan(&m.MetId, &m.MetIdCliente, &m.MetGordura, &m.MetPeso, &m.MetDataCumprir, &m.MetStatus, &m.MetStatusAlterar, &m.MetIdAcad); err != nil {
		if err == sql.ErrNoRows {
			return Meta{}, nil
		}
		return Meta{}, err
	}

	return m, nil
}

func (m Meta) New() error {
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

func (m Meta) Update() error {
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

func ReadMetaAtual(idCliente, idAcademia int64) (Meta, error) {
	query := "select metId, metStatusAlterar from tblMeta where metIdCliente = ? and metIdAcad = ?"
	row := database.DB.QueryRow(query, idCliente, idAcademia)

	var m Meta

	if err := row.Scan(&m.MetId, &m.MetStatusAlterar); err != nil {
		return Meta{}, err
	}

	return m, nil

}
