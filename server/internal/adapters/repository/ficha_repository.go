package repository

import (
	"database/sql"
	"log"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type FichaRepository interface {
	ReadClienteFicha(IdAcad int64) ([]domain.ClienteFicha, error)
	ReadFicha(CliId, IdAcad int64) ([]domain.FichaDetalhes, error)
	ReadFichaDetalhes(CliId int64, Tipo string) ([]any, error)
	ReadFichaDetalhesGeral(CliId int64) ([]any, error)
	CreateFicha(f domain.Ficha) error
	CreateFichaDetalhes(fd domain.FichaDetalhes) error
	UpdateFichaDetalhes(fd domain.FichaDetalhes) error
	UpdateCampoFicha(cf domain.CampoFicha) error
	DeleteCampoFicha(DetId int64) error
}

type localFichaRepository struct{}

func NewLocalFichaRepository() *localFichaRepository {
	return &localFichaRepository{}
}

func (r *localFichaRepository) ReadClienteFicha(IdAcad int64) ([]domain.ClienteFicha, error) {
	query := "SELECT c.*, CASE WHEN f.ficIdCliente IS NOT NULL THEN 1 ELSE 0 END AS ClienteExisteNaFicha FROM tblCliente AS c LEFT JOIN tblFicha AS f ON c.cliId = f.ficIdCliente WHERE c.cliIdAcad = ? and c.cliStatus = 1 ORDER BY ClienteExisteNaFicha DESC, cliNome ASC;"
	rows, err := database.DB.Query(query, IdAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var clientesFichas []domain.ClienteFicha
	for rows.Next() {
		var cf domain.ClienteFicha
		if err := rows.Scan(&cf.CliId, &cf.CliNome, &cf.CliCelular, &cf.CliCep, &cf.CliCidade, &cf.CliEstado, &cf.CliRua, &cf.CliNumeroRua, &cf.CliSexo, &cf.CliCpf, &cf.CliEmail, &cf.CliDataCmc, &cf.CliStatus, &cf.CliPlano, &cf.CliIdAcad, &cf.CliSenha, &cf.ClienteExisteNaFicha); err != nil {
			return nil, err
		}
		clientesFichas = append(clientesFichas, cf)
	}
	return clientesFichas, nil
}

func (r *localFichaRepository) ReadFicha(CliId, IdAcad int64) ([]domain.FichaDetalhes, error) {
	queryFicha := "select * from tblFicha where ficIdCliente = ? and ficIdAcademia = ?"
	rowFicha := database.DB.QueryRow(queryFicha, CliId, IdAcad)

	var f domain.Ficha
	if err := rowFicha.Scan(&f.FicId, &f.FicIdCliente, &f.FicIdFuncionario, &f.FicIdAcademia, &f.FicIntervalo, &f.FicRestricoes, &f.FicTipoRestricoes); err != nil {
		return nil, err
	}

	queryDetalhes := "select * tblFichaDetalhes where detIdFicha = ?"
	rowDetalhes, err := database.DB.Query(queryDetalhes, f.FicId)

	if err != nil {
		return nil, err
	}

	defer rowDetalhes.Close()

	var detalhes []domain.FichaDetalhes

	for rowDetalhes.Next() {
		var d domain.FichaDetalhes
		if err := rowDetalhes.Scan(&d.DetId, &d.DetVariacao, &d.DetCarga, &d.DetSerie, &d.DetRepeticao, &d.DetIdFicha, &d.DetTreino); err != nil {
			return nil, err
		}
	}

	return detalhes, nil
}

func (r *localFichaRepository) ReadFichaDetalhes(CliId int64, Tipo string) ([]any, error) {
	query := "select fic.*, det.* from tblFicha as fic join tblFichaDetalhes as det on fic.ficId = det.detIdFicha where fic.ficIdCliente = ? and det.detTreino = ?"
	rows, err := database.DB.Query(query, CliId, Tipo)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var ficDets []any
	for {
		if !rows.Next() {
			break
		}

		var fd domain.FicDet
		if err := rows.Scan(&fd.FicId, &fd.FicIdCliente, &fd.FicIdFuncionario, &fd.FicIdAcademia, &fd.FicIntervalo, &fd.FicRestricoes, &fd.FicTipoRestricoes, &fd.DetId, &fd.DetVariacao, &fd.DetCarga, &fd.DetSerie, &fd.DetRepeticao, &fd.DetIdFicha, &fd.DetTreino, &fd.DetDataAdicionado); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			log.Printf("Error scanning row: %v", err)
			continue
		}
		ficDets = append(ficDets, fd)
	}

	if len(ficDets) == 0 {
		query := "select * from tblFicha where ficIdCliente = ?"
		row := database.DB.QueryRow(query, CliId)

		var f domain.Ficha
		if err := row.Scan(&f.FicId, &f.FicIdCliente, &f.FicIdFuncionario, &f.FicIdAcademia, &f.FicIntervalo, &f.FicRestricoes, &f.FicTipoRestricoes); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		ficDets = append(ficDets, f)
	}

	return ficDets, nil
}

func (r *localFichaRepository) ReadFichaDetalhesGeral(CliId int64) ([]any, error) {
	query := "select fic.*, det.* from tblFicha as fic join tblFichaDetalhes as det on fic.ficId = det.detIdFicha where fic.ficIdCliente = ?"
	rows, err := database.DB.Query(query, CliId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var ficDets []any
	for {
		if !rows.Next() {
			break
		}

		var fd domain.FicDet
		if err := rows.Scan(&fd.FicId, &fd.FicIdCliente, &fd.FicIdFuncionario, &fd.FicIdAcademia, &fd.FicIntervalo, &fd.FicRestricoes, &fd.FicTipoRestricoes, &fd.DetId, &fd.DetVariacao, &fd.DetCarga, &fd.DetSerie, &fd.DetRepeticao, &fd.DetIdFicha, &fd.DetTreino, &fd.DetDataAdicionado); err != nil {
			if err == sql.ErrNoRows {
				return []any{}, nil
			}
			log.Printf("Error scanning row: %v", err)
			continue
		}
		ficDets = append(ficDets, fd)
	}

	if len(ficDets) == 0 {
		query := "select * from tblFicha where ficIdCliente = ?"
		row := database.DB.QueryRow(query, CliId)

		var f domain.Ficha
		if err := row.Scan(&f.FicId, &f.FicIdCliente, &f.FicIdFuncionario, &f.FicIdAcademia, &f.FicIntervalo, &f.FicRestricoes, &f.FicTipoRestricoes); err != nil {
			if err == sql.ErrNoRows {
				return []any{}, nil
			}
			return nil, err
		}
		ficDets = append(ficDets, f)
	}

	return ficDets, nil
}

func (r *localFichaRepository) CreateFicha(f domain.Ficha) error {
	query := "insert into tblFicha values (default, ?, ?, ?, ?, ? ,?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(f.FicIdCliente, f.FicIdFuncionario, f.FicIdAcademia, f.FicIntervalo, f.FicRestricoes, f.FicTipoRestricoes)

	if err != nil {
		return err
	}

	return nil
}

func (r *localFichaRepository) CreateFichaDetalhes(fd domain.FichaDetalhes) error {
	query := "insert into tblFichaDetalhes values (default, ?, ?, ?, ?, ?, ?, ?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(fd.DetVariacao, fd.DetCarga, fd.DetSerie, fd.DetRepeticao, fd.DetIdFicha, fd.DetTreino, fd.DetDataAdicionado)

	if err != nil {
		return err
	}

	return nil
}

func (r *localFichaRepository) UpdateFichaDetalhes(fd domain.FichaDetalhes) error {
	query := "update tblFichaDetalhes set detVariacao = ?, detCarga = ?, detSerie = ?, detRepeticao = ?, detDataAdicionado = ? where detId = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(fd.DetVariacao, fd.DetCarga, fd.DetSerie, fd.DetRepeticao, fd.DetIdFicha, fd.DetDataAdicionado)

	if err != nil {
		return err
	}

	return nil
}

func (r *localFichaRepository) UpdateCampoFicha(cf domain.CampoFicha) error {
	switch cf.DetCampo {
	case "DetVariacao":
		query := "update tblFichaDetalhes set detVariacao = ?, detDataAdicionado = ? where detId = ?"
		stmt, err := database.DB.Prepare(query)
		if err != nil {
			return err
		}

		defer stmt.Close()

		_, err = stmt.Exec(cf.DetValor, cf.DetDataAdicionado, cf.DetId)

		if err != nil {
			return err
		}

		return nil
	case "DetCarga":
		query := "update tblFichaDetalhes set detCarga = ?, detDataAdicionado = ? where detId = ?"
		stmt, err := database.DB.Prepare(query)
		if err != nil {
			return err
		}

		defer stmt.Close()

		_, err = stmt.Exec(cf.DetValor, cf.DetDataAdicionado, cf.DetId)

		if err != nil {
			return err
		}

		return nil
	case "DetSerie":
		query := "update tblFichaDetalhes set detSerie = ?, detDataAdicionado = ? where detId = ?"
		stmt, err := database.DB.Prepare(query)
		if err != nil {
			return err
		}

		defer stmt.Close()

		_, err = stmt.Exec(cf.DetValor, cf.DetDataAdicionado, cf.DetId)

		if err != nil {
			return err
		}

		return nil
	case "DetRepeticao":
		query := "update tblFichaDetalhes set detRepeticao = ?, detDataAdicionado = ? where detId = ?"
		stmt, err := database.DB.Prepare(query)
		if err != nil {
			return err
		}

		defer stmt.Close()

		_, err = stmt.Exec(cf.DetValor, cf.DetDataAdicionado, cf.DetId)

		if err != nil {
			return err
		}

		return nil
	}

	return nil
}

func (r *localFichaRepository) DeleteCampoFicha(DetId int64) error {
	query := "delete from tblFichaDetalhes where detId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(&DetId)

	if err != nil {
		return err
	}

	return nil
}
