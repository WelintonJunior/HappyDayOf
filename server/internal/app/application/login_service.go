package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type LoginService struct {
	repo repository.LoginRepository
}

func NewLoginService(repo repository.LoginRepository) *LoginService {
	return &LoginService{repo: repo}
}

func (s *LoginService) ValidateCredentialsCliente(c domain.ClienteLogin) (domain.ClienteLogin, error) {
	return s.repo.ValidateCredentialsCliente(c)
}

func (s *LoginService) ValidateCredentialsFuncionario(f domain.FuncionarioLogin) (domain.FuncionarioLogin, error) {
	return s.repo.ValidateCredentialsFuncionario(f)
}

func (s *LoginService) EngajamentoAlunos(CliId, IdAcademia int64, DateNow string) error {
	return s.repo.EngajamentoAlunos(CliId, IdAcademia, DateNow)
}
