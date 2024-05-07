package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type PlanoService struct {
	repo repository.PlanoRepository
}

func NewPlanoService(repo repository.PlanoRepository) *PlanoService {
	return &PlanoService{repo: repo}
}

func (s *PlanoService) ReadPlanos(idAcad int64) ([]domain.Plano, error) {
	return s.repo.ReadPlanos(idAcad)
}
