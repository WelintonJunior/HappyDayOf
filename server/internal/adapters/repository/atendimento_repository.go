package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type AtendimentoRepository interface {
	ReadStatusAtendimento(AteIdCliente, AteIdAcad int64, AteDateInicio string) (bool, error)
	ReadAtendimentoInfo(AteId int64) (domain.Atendimento, error)
	ReadAtendimento(AteIdAcad, AteIdFuncionario int64) ([]domain.ResultReadAtendimento, error)
	CreateAtendimento(a domain.Atendimento) error
	Validar(a domain.Atendimento) (bool, error)
	UpdateStatusAtendimento(a domain.Atendimento) error
}

type localAtendimentoRepository struct{}

func NewLocalAtendimentoRepository() *localAtendimentoRepository {
	return &localAtendimentoRepository{}
}

func (r *localAtendimentoRepository) ReadStatusAtendimento(AteIdCliente, AteIdAcad int64, AteDateInicio string) (bool, error) {
	query := "select ateStatus from tblAtendimento where ateIdCliente = ? and ateDateInicio <= ? and ateDateEncerramento is null and ateIdAcad = ?"

	row := database.DB.QueryRow(query, AteIdCliente, AteDateInicio, AteIdAcad)

	var a domain.Atendimento
	if err := row.Scan(&a.AteStatus); err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}

	return true, nil
}

func (r *localAtendimentoRepository) ReadAtendimentoInfo(AteId int64) (domain.Atendimento, error) {
	query := "select * from tblAtendimento where ateId = ?"

	row := database.DB.QueryRow(query, AteId)

	var a domain.Atendimento
	if err := row.Scan(&a.AteId, &a.AteIdCliente, &a.AteIdFuncionario, &a.AteDateInicio, &a.AteIdAcad, &a.AteStatus, &a.AteDateEncerramento); err != nil {
		if err == sql.ErrNoRows {
			return domain.Atendimento{}, nil
		}
		return domain.Atendimento{}, err
	}

	return a, nil
}

func (r *localAtendimentoRepository) ReadAtendimento(AteIdAcad, AteIdFuncionario int64) ([]domain.ResultReadAtendimento, error) {
	query := "select a.*,f.funId,c.cliNome from tblAtendimento as a join tblCliente as c on a.ateIdCliente = c.cliId join tblFuncionario as f on a.ateIdFuncionario = f.funId where a.ateIdAcad = ? and a.ateIdFuncionario = ? order by a.ateStatus desc , a.ateDateInicio desc"
	rows, err := database.DB.Query(query, AteIdAcad, AteIdFuncionario)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var resultReadAtendimento []domain.ResultReadAtendimento

	for rows.Next() {
		var r domain.ResultReadAtendimento
		if err := rows.Scan(&r.AteId, &r.AteIdCliente, &r.AteIdFuncionario, &r.AteDateInicio, &r.AteIdAcad, &r.AteStatus, &r.AteDateEncerramento, &r.FunId, &r.CliNome); err != nil {
			return nil, err
		}
		resultReadAtendimento = append(resultReadAtendimento, r)

	}

	return resultReadAtendimento, nil
}

func (r *localAtendimentoRepository) CreateAtendimento(a domain.Atendimento) error {
	query := "insert into tblAtendimento values (default, ?, ?, ?, ?, 1, null)"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.AteIdCliente, a.AteIdFuncionario, a.AteDateInicio, a.AteIdAcad)

	if err != nil {
		return err
	}

	return nil
}

func (r *localAtendimentoRepository) Validar(a domain.Atendimento) (bool, error) {
	query := "select a.*,f.funId,c.cliNome from tblAtendimento as a join tblCliente as c on a.ateIdCliente = c.cliId join tblFuncionario as f on a.ateIdFuncionario = f.funId where a.ateIdAcad = ? and a.ateIdFuncionario = ? and c.cliId = ? and a.ateStatus = 1"
	rows, err := database.DB.Query(query, a.AteIdAcad, a.AteIdFuncionario, a.AteIdCliente)

	if err != nil {
		return false, err
	}

	if rows.Next() {
		return false, nil
	}

	return true, nil
}

func (r *localAtendimentoRepository) UpdateStatusAtendimento(a domain.Atendimento) error {
	query := "update tblAtendimento set ateStatus = 0, ateDateEncerramento = ? where ateId = ? and ateIdAcad = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.AteDateEncerramento, a.AteId, a.AteIdAcad)

	if err != nil {
		return err
	}

	err = InsertSatisfacaoVazia(a)

	if err != nil {
		return err
	}

	return nil
}

func InsertSatisfacaoVazia(a domain.Atendimento) error {
	query := "insert into tblSatisfacao values (default, ?, ?, null, null, null, null, null, ?, 0)"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(a.AteIdCliente, a.AteIdAcad, a.AteId)

	if err != nil {
		return err
	}

	return nil
}
