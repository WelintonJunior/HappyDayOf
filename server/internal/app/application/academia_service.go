package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type AcademiaService struct {
	repo repository.AcademiaRepository
}

func NewAcademiaService(repo repository.AcademiaRepository) *AcademiaService {
	return &AcademiaService{repo: repo}
}

func (s *AcademiaService) GetAcademiaList() ([]domain.Academia, error) {
	return s.repo.ReadAcademiaLista()
}

func (s *AcademiaService) GetAcademiaDetails(acaId int64) (domain.Academia, error) {
	return s.repo.ReadAcademiaDet(acaId)
}

func (s *AcademiaService) CreateAcademia(academia domain.Academia) error {
	return s.repo.CreateAcademia(academia)
}

func (s *AcademiaService) AddAdministrador(adm domain.Administrador) error {
	return s.repo.AddAdministrador(adm)
}

func (s *AcademiaService) InsertAcademiaToTheOptions() (domain.Academia, error) {
	return s.repo.InsertAcademiaToTheOptions()
}
