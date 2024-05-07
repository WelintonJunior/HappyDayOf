package repository

import (
	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
)

type ExercicioRepository interface {
	ReadExercicios(idAcad int64) ([]domain.Exercicio, error)
	ReadExercicioDet(ExeId, idAcad int64) (domain.Exercicio, error)
	CreateExercicio(e domain.Exercicio) error
	ArchiveExercicio(ExeId int64) error
	UpdateExercicioDetalhes(e domain.Exercicio) error
}

type localExercicioRepository struct{}

func NewLocalExercicioRepository() *localExercicioRepository {
	return &localExercicioRepository{}
}

func (r *localExercicioRepository) ReadExercicios(idAcad int64) ([]domain.Exercicio, error) {
	query := "SELECT e.*, a.apaNome FROM tblExercicios as e left join tblAparelhos as a on e.exeApaId = a.apaId WHERE exeIdAcad = ? ORDER BY exeStatus DESC, exeNome ASC"

	rows, err := database.DB.Query(query, idAcad)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var Exercicios []domain.Exercicio

	for rows.Next() {
		var e domain.Exercicio
		if err := rows.Scan(&e.ExeId, &e.ExeNome, &e.ExeApaId, &e.ExeStatus, &e.ExeIdAcad, &e.ApaNome); err != nil {
			return nil, err
		}
		Exercicios = append(Exercicios, e)
	}

	return Exercicios, nil
}

func (r *localExercicioRepository) ReadExercicioDet(ExeId, idAcad int64) (domain.Exercicio, error) {
	query := "select * from tblExercicios where exeId = ? and exeIdAcad = ? "

	row := database.DB.QueryRow(query, ExeId, idAcad)

	var e domain.Exercicio
	if err := row.Scan(&e.ExeId, &e.ExeNome, &e.ExeApaId, &e.ExeStatus, &e.ExeIdAcad); err != nil {
		return domain.Exercicio{}, err
	}

	return e, nil
}

func (r *localExercicioRepository) CreateExercicio(e domain.Exercicio) error {
	query := "insert into tblExercicios values (DEFAULT, ?, ?, 1, ?)"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(e.ExeNome, e.ExeApaId, e.ExeIdAcad)

	if err != nil {
		return err
	}

	return nil
}

func (r *localExercicioRepository) ArchiveExercicio(ExeId int64) error {
	query := "update tblExercicios set exeStatus = ? where exeId = ?"

	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(0, ExeId)

	if err != nil {
		return err
	}

	return nil
}

func (r *localExercicioRepository) UpdateExercicioDetalhes(e domain.Exercicio) error {
	query := "update tblExercicios set exeNome = ?, exeApaId = ?, exeStatus = ? where exeId = ?"
	stmt, err := database.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(e.ExeNome, e.ExeApaId, e.ExeStatus, e.ExeId)

	if err != nil {
		return err
	}

	return nil
}
