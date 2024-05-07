package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type DesempenhoService struct {
	repo repository.DesempenhoRepository
}

func NewDesempenhoService(repo repository.DesempenhoRepository) *DesempenhoService {
	return &DesempenhoService{repo: repo}
}

func (s *DesempenhoService) ReadDesempenho(IdCliente int64) ([]domain.Desempenho, error) {
	return s.repo.ReadDesempenho(IdCliente)
}
