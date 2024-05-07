package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type SatisfacaoService struct {
	repo repository.SatisfacaoRepository
}

func NewSatisfacaoService(repo repository.SatisfacaoRepository) *SatisfacaoService {
	return &SatisfacaoService{repo: repo}
}

func (s *SatisfacaoService) VerifySatisfacaoAtendimento(CliId, IdAcad int64) (domain.Satisfacao, error) {
	return s.repo.VerifySatisfacaoAtendimento(CliId, IdAcad)
}

func (s *SatisfacaoService) VerificarAtendimento(CliId, IdAcad int64) (domain.Satisfacao, error) {
	return s.repo.VerificarAtendimento(CliId, IdAcad)
}

func (s *SatisfacaoService) UpdateSatisfacao(sat domain.Satisfacao) error {
	return s.repo.UpdateSatisfacao(sat)
}
