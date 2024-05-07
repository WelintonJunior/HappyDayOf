package application

import "example.com/fitConnect/internal/adapters/repository"

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
