package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type AparelhoService struct {
	repo repository.AparelhoRepository
}

func NewAparelhoService(repo repository.AparelhoRepository) *AparelhoService {
	return &AparelhoService{repo: repo}
}

func (s *AparelhoService) GetAparelhoList(idAcad int64) ([]domain.Aparelho, error) {
	return s.repo.ReadAparelhos(idAcad)
}

func (s *AparelhoService) GetAparelhoDetails(ApaId, idAcad int64) (domain.Aparelho, error) {
	return s.repo.ReadAparelhoDet(ApaId, idAcad)
}

func (s *AparelhoService) CreateAparelho(a domain.Aparelho) error {
	return s.repo.CreateAparelho(a)
}

func (s *AparelhoService) ArchiveAparelho(ApaId int64) error {
	return s.repo.ArchiveAparelho(ApaId)
}

func (s *AparelhoService) UpdateAparelhoDetalhes(a domain.Aparelho) error {
	return s.repo.UpdateAparelhoDetalhes(a)
}
