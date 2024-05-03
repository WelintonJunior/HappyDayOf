package UTILSFRT

import "example.com/fitConnect/database"

func VerificarCpfCadastrado(Modulo, Cpf string, Id int64) (bool, error) {
	switch Modulo {
	case "fun":
		query := "SELECT funCpf FROM tblFuncionario WHERE funCpf = ? AND funId != ?"
		rows, err := database.DB.Query(query, Cpf, Id)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	case "cli":
		query := "SELECT cliCpf FROM tblCliente WHERE cliCpf = ? AND cliId != ?"
		rows, err := database.DB.Query(query, Cpf, Id)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	}
	return false, nil
}

func VerificarEmailCadastrado(Modulo, Email string, Id int64) (bool, error) {
	switch Modulo {
	case "fun":
		query := "Sselect funEmail from tblFuncionario where funEmail = ? AND funId != ?"
		rows, err := database.DB.Query(query, Email, Id)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	case "cli":
		query := "select cliEmail from tblCliente where cliEmail = ? AND cliId != ?"
		rows, err := database.DB.Query(query, Email, Id)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	}
	return false, nil
}

func VerificarCpfCadastradoGeral(Modulo, Cpf string) (bool, error) {
	switch Modulo {
	case "fun":
		query := "SELECT funCpf FROM tblFuncionario WHERE funCpf = ?"
		rows, err := database.DB.Query(query, Cpf)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	case "cli":
		query := "SELECT cliCpf FROM tblCliente WHERE cliCpf = ?"
		rows, err := database.DB.Query(query, Cpf)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	}
	return false, nil
}

func VerificarEmailCadastradoGeral(Modulo, Email string) (bool, error) {
	switch Modulo {
	case "fun":
		query := "select funEmail from tblFuncionario where funEmail = ?  "
		rows, err := database.DB.Query(query, Email)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	case "cli":
		query := "select cliEmail from tblCliente where cliEmail = ?"
		rows, err := database.DB.Query(query, Email)
		if err != nil {
			return false, err
		}

		if rows.Next() {
			return false, err
		} else {
			return true, nil
		}
	}
	return false, nil
}
