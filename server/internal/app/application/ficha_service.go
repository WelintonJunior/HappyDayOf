package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type FichaService struct {
	repo repository.FichaRepository
}

func NewFichaService(repo repository.FichaRepository) *FichaService {
	return &FichaService{repo: repo}
}

func (s *FichaService) ReadClienteFicha(IdAcad int64) ([]domain.ClienteFicha, error) {
	return s.repo.ReadClienteFicha(IdAcad)
}

func (s *FichaService) ReadFicha(CliId, IdAcad int64) ([]domain.FichaDetalhes, error) {
	return s.repo.ReadFicha(CliId, IdAcad)
}

func (s *FichaService) ReadFichaDetalhes(CliId int64, Tipo string) ([]any, error) {
	return s.repo.ReadFichaDetalhes(CliId, Tipo)
}

func (s *FichaService) ReadFichaDetalhesGeral(CliId int64) ([]any, error) {
	return s.repo.ReadFichaDetalhesGeral(CliId)
}

func (s *FichaService) CreateFicha(f domain.Ficha) error {
	return s.repo.CreateFicha(f)
}

func (s *FichaService) CreateFichaDetalhes(fd domain.FichaDetalhes) error {
	return s.repo.CreateFichaDetalhes(fd)
}

func (s *FichaService) UpdateFichaDetalhes(fd domain.FichaDetalhes) error {
	return s.repo.UpdateFichaDetalhes(fd)
}

func (s *FichaService) UpdateCampoFicha(cf domain.CampoFicha) error {
	return s.repo.UpdateCampoFicha(cf)
}

func (s *FichaService) DeleteCampoFicha(DetId int64) error {
	return s.repo.DeleteCampoFicha(DetId)
}
