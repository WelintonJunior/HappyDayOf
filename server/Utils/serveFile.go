package UTILS

import (
	"net/http"
	"path/filepath"
)

func ServeFile(path string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Resolve o caminho do arquivo baseado no diretório atual e o caminho fornecido
		fullPath, err := filepath.Abs(path)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Envia o arquivo para o cliente
		http.ServeFile(w, r, fullPath)
	}
}
