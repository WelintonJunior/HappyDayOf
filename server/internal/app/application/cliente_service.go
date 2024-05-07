package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type ClienteService struct {
	repo repository.ClienteRepository
}

func NewClienteService(repo repository.ClienteRepository) *ClienteService {
	return &ClienteService{repo: repo}
}

func (s *ClienteService) ReadClientes(idAcad int64) ([]domain.Cliente, error) {
	return s.repo.ReadClientes(idAcad)
}

func (s *ClienteService) ReadClienteDet(CliId, idAcad int64) (domain.Cliente, error) {
	return s.repo.ReadClienteDet(CliId, idAcad)
}

func (s *ClienteService) CreateCliente(c domain.Cliente) error {
	return s.repo.CreateCliente(c)
}

func (s *ClienteService) ArchiveCliente(CliId int64) error {
	return s.repo.ArchiveCliente(CliId)
}

func (s *ClienteService) UpdateClienteDetalhes(c domain.Cliente) error {
	return s.repo.UpdateClienteDetalhes(c)
}
