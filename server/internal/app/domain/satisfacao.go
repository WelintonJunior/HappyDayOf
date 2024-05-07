package domain

type Satisfacao struct {
	SatId                  int64
	SatIdCliente           int64
	SatIdAcademia          int64
	SatNotaClareza         *int64
	SatNotaConhecimento    *int64
	SatNotaProatividade    *int64
	SatNotaDisponibilidade *int64
	SatNotaSeguranca       *int64
	SatIdAtendimento       int64
	SatStatus              int64
}
