package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type ExercicioService struct {
	repo repository.ExercicioRepository
}

func NewExercicioService(repo repository.ExercicioRepository) *ExercicioService {
	return &ExercicioService{repo: repo}
}

func (s *ExercicioService) ReadExercicios(idAcad int64) ([]domain.Exercicio, error) {
	return s.repo.ReadExercicios(idAcad)
}

func (s *ExercicioService) ReadExercicioDet(ExeId, idAcad int64) (domain.Exercicio, error) {
	return s.repo.ReadExercicioDet(ExeId, idAcad)
}

func (s *ExercicioService) CreateExercicio(e domain.Exercicio) error {
	return s.repo.CreateExercicio(e)
}

func (s *ExercicioService) ArchiveExercicio(ExeId int64) error {
	return s.repo.ArchiveExercicio(ExeId)
}

func (s *ExercicioService) UpdateExercicioDetalhes(e domain.Exercicio) error {
	return s.repo.UpdateExercicioDetalhes(e)
}
