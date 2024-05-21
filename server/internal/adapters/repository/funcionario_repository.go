package repository

import (
	"database/sql"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
	"golang.org/x/crypto/bcrypt"
)

type FuncionarioRepository interface {
	ReadFuncionarios(idAcad, FunNivel int64) ([]domain.Funcionario, error)
	ReadFuncionarioDet(FunId, idAcad int64) (domain.Funcionario, error)
	CreateFuncionario(f domain.Funcionario) error
	ArchiveFuncionario(FunId int64) error
	UpdateFuncionarioDetalhes(f domain.Funcionario) error
	FuncionarioMeuDesempenho(IdFuncionario int64) ([]domain.Satisfacao, error)
	AtivarFuncionario(FunId int64) error
}

type localFuncionarioRepository struct{}

func NewLocalFuncionarioRepository() *localFuncionarioRepository {
	return &localFuncionarioRepository{}
}

func (r *localFuncionarioRepository) ReadFuncionarios(idAcad, FunNivel int64) ([]domain.Funcionario, error) {
	query := "select * from tblFuncionario where funIdAcad = ? and funNivel = ? order by funStatus desc, funNome ASC"

	rows, err := database.DB.Query(query, idAcad, FunNivel)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Funcionarios []domain.Funcionario

	for rows.Next() {
		var f domain.Funcionario
		if err := rows.Scan(&f.FunId, &f.FunNome, &f.FunCelular, &f.FunCep, &f.FunCidade, &f.FunEstado, &f.FunRua, &f.FunNumeroRua, &f.FunSexo, &f.FunCpf, &f.FunEmail, &f.FunDataCmc, &f.FunStatus, &f.FunIdAcad, &f.FunSenha, &f.FunNivel); err != nil {
			return nil, err
		}
		Funcionarios = append(Funcionarios, f)
	}

	return Funcionarios, nil
}

func (r *localFuncionarioRepository) ReadFuncionarioDet(FunId, idAcad int64) (domain.Funcionario, error) {
	query := "select * from tblFuncionario where funId = ? and funIdAcad = ?"

	row := database.DB.QueryRow(query, FunId, idAcad)

	var f domain.Funcionario
	if err := row.Scan(&f.FunId, &f.FunNome, &f.FunCelular, &f.FunCep, &f.FunCidade, &f.FunEstado, &f.FunRua, &f.FunNumeroRua, &f.FunSexo, &f.FunCpf, &f.FunEmail, &f.FunDataCmc, &f.FunStatus, &f.FunIdAcad, &f.FunSenha, &f.FunNivel); err != nil {
		if err == sql.ErrNoRows {
			return domain.Funcionario{}, nil
		}
		return domain.Funcionario{}, err
	}

	return f, nil
}

func (r *localFuncionarioRepository) CreateFuncionario(f domain.Funcionario) error {
	query := "insert into tblFuncionario values (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	hashed, err := bcrypt.GenerateFromPassword([]byte(f.FunSenha), 14)

	if err != nil {
		return err
	}

	_, err = stmt.Exec(f.FunNome, f.FunCelular, f.FunCep, f.FunCidade, f.FunEstado, f.FunRua, f.FunNumeroRua, f.FunSexo, f.FunCpf, f.FunEmail, f.FunDataCmc, 1, f.FunIdAcad, hashed, 1)

	if err != nil {
		return err
	}

	return nil
}

func (r *localFuncionarioRepository) ArchiveFuncionario(FunId int64) error {
	query := "update tblFuncionario set funStatus = ? where funId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(0, FunId)

	if err != nil {
		return err
	}

	return nil
}

func (r *localFuncionarioRepository) UpdateFuncionarioDetalhes(f domain.Funcionario) error {
	query := "update tblFuncionario set funNome = ?, funCelular = ?, funCep = ?, funCidade = ?, funEstado = ?, funRua = ?, funNumeroRua = ?, funSexo = ?, funCpf = ?, funEmail = ?, funDataCmc = ?, funStatus = ?, funNivel = ? where funId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(f.FunNome, f.FunCelular, f.FunCep, f.FunCidade, f.FunEstado, f.FunRua, f.FunNumeroRua, f.FunSexo, f.FunCpf, f.FunEmail, f.FunDataCmc, f.FunStatus, f.FunNivel, f.FunId)

	if err != nil {
		return err
	}

	return nil
}

func (r *localFuncionarioRepository) FuncionarioMeuDesempenho(IdFuncionario int64) ([]domain.Satisfacao, error) {
	query := "select s.satNotaClareza, s.satNotaConhecimento, s.satNotaProatividade, s.satNotaDisponibilidade, s.satNotaSeguranca from tblSatisfacao as s left join tblAtendimento as a on s.satIdAtendimento = a.ateId where a.ateIdFuncionario = ? and s.satNotaProatividade is not null"
	rows, err := database.DB.Query(query, IdFuncionario)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var satisfacoes []domain.Satisfacao
	for rows.Next() {
		var s domain.Satisfacao
		if err := rows.Scan(&s.SatNotaClareza, &s.SatNotaConhecimento, &s.SatNotaProatividade, &s.SatNotaDisponibilidade, &s.SatNotaSeguranca); err != nil {
			if err == sql.ErrNoRows {
				return nil, nil
			}
			return nil, err
		}
		satisfacoes = append(satisfacoes, s)
	}
	return satisfacoes, nil
}

func (r *localFuncionarioRepository) AtivarFuncionario(FunId int64) error {
	query := "update tblFuncionario set funStatus = 1 where funId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(FunId)

	if err != nil {
		return err
	}

	return nil
}
