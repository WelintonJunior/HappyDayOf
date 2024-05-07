package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type MetaService struct {
	repo repository.MetaRepository
}

func NewMetaService(repo repository.MetaRepository) *MetaService {
	return &MetaService{repo: repo}
}

func (s *MetaService) ReadMeta(IdCliente int64) (domain.Meta, error) {
	return s.repo.ReadMeta(IdCliente)
}

func (s *MetaService) CreateMeta(m domain.Meta) error {
	return s.repo.CreateMeta(m)
}

func (s *MetaService) UpdateMeta(m domain.Meta) error {
	return s.repo.UpdateMeta(m)
}

func (s *MetaService) ReadMetaAtual(idCliente, idAcademia int64) (domain.Meta, error) {
	return s.repo.ReadMetaAtual(idCliente, idAcademia)

}
