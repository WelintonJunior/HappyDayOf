package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type FuncionarioService struct {
	repo repository.FuncionarioRepository
}

func NewFuncionarioService(repo repository.FuncionarioRepository) *FuncionarioService {
	return &FuncionarioService{repo: repo}
}

func (s *FuncionarioService) ReadFuncionarios(idAcad, FunNivel int64) ([]domain.Funcionario, error) {
	return s.repo.ReadFuncionarios(idAcad, FunNivel)
}

func (s *FuncionarioService) ReadFuncionarioDet(FunId, idAcad int64) (domain.Funcionario, error) {
	return s.repo.ReadFuncionarioDet(FunId, idAcad)
}

func (s *FuncionarioService) CreateFuncionario(f domain.Funcionario) error {
	return s.repo.CreateFuncionario(f)
}

func (s *FuncionarioService) ArchiveFuncionario(FunId int64) error {
	return s.repo.ArchiveFuncionario(FunId)
}

func (s *FuncionarioService) UpdateFuncionarioDetalhes(f domain.Funcionario) error {
	return s.repo.UpdateFuncionarioDetalhes(f)
}

func (s *FuncionarioService) FuncionarioMeuDesempenho(IdFuncionario int64) ([]domain.Satisfacao, error) {
	return s.repo.FuncionarioMeuDesempenho(IdFuncionario)
}

func (s *FuncionarioService) AtivarFuncionario(FunId int64) error {
	return s.repo.AtivarFuncionario(FunId)
}
