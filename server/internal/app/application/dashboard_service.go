package application

import (
	"example.com/fitConnect/internal/adapters/repository"
	"example.com/fitConnect/internal/app/domain"
)

type DashboardService struct {
	repo repository.DashboardRepository
}

func NewDashBoardService(repo repository.DashboardRepository) *DashboardService {
	return &DashboardService{repo: repo}
}

func (s *DashboardService) ReadSatisfacao(AcaId int64) ([]domain.Satisfacao, error) {
	return s.repo.ReadSatisfacao(AcaId)
}

func (s *DashboardService) ReadAtendimentos(AteId int64) (domain.Atendimento, error) {
	return s.repo.ReadAtendimentos(AteId)
}

func (s *DashboardService) ReadFuncNome(FunId int64) (string, error) {
	return s.repo.ReadFuncNome(FunId)
}

func (s *DashboardService) ReadAllAtendimentos(AcaId int64) ([]domain.Atendimento, error) {
	return s.repo.ReadAllAtendimentos(AcaId)
}

func (s *DashboardService) ReadAllEngajamentos(AcaId int64) ([]domain.Engajamento, error) {
	return s.repo.ReadAllEngajamentos(AcaId)
}
