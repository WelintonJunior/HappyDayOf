package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type AtendimentoService struct {
	repo repository.AtendimentoRepository
}

func NewAtendimentoService(repo repository.AtendimentoRepository) *AtendimentoService {
	return &AtendimentoService{repo: repo}
}

func (s *AtendimentoService) ReadStatusAtendimento(AteIdCliente, AteIdAcad int64, AteDateInicio string) (bool, error) {
	return s.repo.ReadStatusAtendimento(AteIdCliente, AteIdAcad, AteDateInicio)
}

func (s *AtendimentoService) ReadAtendimentoInfo(AteId int64) (domain.Atendimento, error) {
	return s.repo.ReadAtendimentoInfo(AteId)
}

func (s *AtendimentoService) ReadAtendimento(AteIdAcad, AteIdFuncionario int64) ([]domain.ResultReadAtendimento, error) {
	return s.repo.ReadAtendimento(AteIdAcad, AteIdFuncionario)
}

func (s *AtendimentoService) CreateAtendimento(a domain.Atendimento) error {
	return s.repo.CreateAtendimento(a)
}

func (s *AtendimentoService) Validar(a domain.Atendimento) (bool, error) {
	return s.repo.Validar(a)
}

func (s *AtendimentoService) UpdateStatusAtendimento(a domain.Atendimento) error {
	return s.repo.UpdateStatusAtendimento(a)
}

func (s *AtendimentoService) VerificarQuantidadeAtendimento() (int64, error) {
	return s.repo.VerificarQuantidadeAtendimento()
}
