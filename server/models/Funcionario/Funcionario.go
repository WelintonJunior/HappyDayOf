package FUNCIONARIO

import (
	"database/sql"

	"example.com/fitConnect/database"
	SATISFACAO "example.com/fitConnect/models/Satisfacao"
	"golang.org/x/crypto/bcrypt"
)

type Funcionario struct {
	FunId        int64
	FunNome      string
	FunCelular   string
	FunCep       string
	FunCidade    string
	FunEstado    string
	FunRua       string
	FunNumeroRua int64
	FunSexo      string
	FunCpf       string
	FunEmail     string
	FunDataCmc   string
	FunStatus    int64
	FunIdAcad    int64
	FunSenha     string
	FunNivel     int64
}

func ReadFuncionarios(idAcad, FunNivel int64) ([]Funcionario, error) {
	query := "select * from tblFuncionario where funIdAcad = ? and funNivel = ? order by funStatus desc, funNome ASC"

	rows, err := database.DB.Query(query, idAcad, FunNivel)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Funcionarios []Funcionario

	for rows.Next() {
		var f Funcionario
		if err := rows.Scan(&f.FunId, &f.FunNome, &f.FunCelular, &f.FunCep, &f.FunCidade, &f.FunEstado, &f.FunRua, &f.FunNumeroRua, &f.FunSexo, &f.FunCpf, &f.FunEmail, &f.FunDataCmc, &f.FunStatus, &f.FunIdAcad, &f.FunSenha, &f.FunNivel); err != nil {
			return nil, err
		}
		Funcionarios = append(Funcionarios, f)
	}

	return Funcionarios, nil

}

func ReadFuncionarioDet(FunId, idAcad int64) (Funcionario, error) {
	query := "select * from tblFuncionario where funId = ? and funIdAcad = ?"

	row := database.DB.QueryRow(query, FunId, idAcad)

	var f Funcionario
	if err := row.Scan(&f.FunId, &f.FunNome, &f.FunCelular, &f.FunCep, &f.FunCidade, &f.FunEstado, &f.FunRua, &f.FunNumeroRua, &f.FunSexo, &f.FunCpf, &f.FunEmail, &f.FunDataCmc, &f.FunStatus, &f.FunIdAcad, &f.FunSenha, &f.FunNivel); err != nil {
		if err == sql.ErrNoRows {
			return Funcionario{}, nil
		}
		return Funcionario{}, err
	}

	return f, nil

}

func (f Funcionario) New() error {
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

func ArchiveFuncionario(FunId int64) error {
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

func (f Funcionario) UpdateFuncionarioDetalhes() error {
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

func FuncionarioMeuDesempenho(IdFuncionario int64) ([]SATISFACAO.Satisfacao, error) {
	query := "select s.satNotaClareza, s.satNotaConhecimento, s.satNotaProatividade, s.satNotaDisponibilidade, s.satNotaSeguranca from tblSatisfacao as s left join tblAtendimento as a on s.satIdAtendimento = a.ateId where a.ateIdFuncionario = ?"
	rows, err := database.DB.Query(query, IdFuncionario)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var satisfacoes []SATISFACAO.Satisfacao
	for rows.Next() {
		var s SATISFACAO.Satisfacao
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
