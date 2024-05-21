package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type UtilsService struct {
	repo repository.UtilsRepository
}

func NewUtilsService(repo repository.UtilsRepository) *UtilsService {
	return &UtilsService{repo: repo}
}

func (s *UtilsService) VerificarCpfCadastrado(Modulo, Cpf string, Id int64) (bool, error) {
	return s.repo.VerificarCpfCadastrado(Modulo, Cpf, Id)
}

func (s *UtilsService) VerificarEmailCadastrado(Modulo, Email string, Id int64) (bool, error) {
	return s.repo.VerificarEmailCadastrado(Modulo, Email, Id)

}

func (s *UtilsService) VerificarCpfCadastradoGeral(Modulo, Cpf string) (bool, error) {
	return s.repo.VerificarCpfCadastradoGeral(Modulo, Cpf)

}

func (s *UtilsService) VerificarEmailCadastradoGeral(Modulo, Email string) (bool, error) {
	return s.repo.VerificarEmailCadastradoGeral(Modulo, Email)

}

func (s *UtilsService) EnviarEmail(Email, Modulo string) error {
	return s.repo.EnviarEmail(Email, Modulo)
}

func (s *UtilsService) VerificarCodigo(cod int64) (domain.RecuperarSenha, error) {
	return s.repo.VerificarCodigo(cod)
}

func (s *UtilsService) TrocarSenha(Email, Senha, Modulo string) (bool, error) {
	return s.repo.TrocarSenha(Email, Senha, Modulo)
}
