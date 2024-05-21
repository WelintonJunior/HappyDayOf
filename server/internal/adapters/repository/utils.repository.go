package repository

import (
	"database/sql"
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"

	"example.com/fitConnect/internal/adapters/repository/database"
	"example.com/fitConnect/internal/app/domain"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mail.v2"
)

type UtilsRepository interface {
	VerificarCpfCadastrado(Modulo, Cpf string, Id int64) (bool, error)
	VerificarEmailCadastrado(Modulo, Email string, Id int64) (bool, error)
	VerificarCpfCadastradoGeral(Modulo, Cpf string) (bool, error)
	VerificarEmailCadastradoGeral(Modulo, Email string) (bool, error)
	EnviarEmail(Email, Modulo string) error
	VerificarCodigo(cod int64) (domain.RecuperarSenha, error)
	TrocarSenha(Email, Senha, Modulo string) (bool, error)
}

type localUtilsRepository struct{}

func NewLocalUtilsRepository() *localUtilsRepository {
	return &localUtilsRepository{}
}

func (r *localUtilsRepository) VerificarCpfCadastrado(Modulo, Cpf string, Id int64) (bool, error) {
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

func (r *localUtilsRepository) VerificarEmailCadastrado(Modulo, Email string, Id int64) (bool, error) {
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

func (r *localUtilsRepository) VerificarCpfCadastradoGeral(Modulo, Cpf string) (bool, error) {
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

func (r *localUtilsRepository) VerificarEmailCadastradoGeral(Modulo, Email string) (bool, error) {
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

func (r *localUtilsRepository) EnviarEmail(Email, Modulo string) error {

	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	senderEmail := os.Getenv("EMAILBINARIOS")
	password := os.Getenv("SENHABINARIOS")

	logFile, err := os.OpenFile("email.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatal(err)
	}
	defer logFile.Close()
	log.SetOutput(logFile)

	m := mail.NewMessage()
	m.SetHeader("From", senderEmail)
	m.SetHeader("To", Email)
	m.SetHeader("Subject", "Recuperar Senha")
	rand.Seed(time.Now().UnixNano())
	randomNumber := rand.Intn(90000) + 10000
	corpo := fmt.Sprintf("Seu código é %v", randomNumber)
	m.SetBody("text/plain", corpo)

	d := mail.NewDialer(smtpHost, smtpPort, senderEmail, password)
	d.StartTLSPolicy = mail.MandatoryStartTLS

	log.Println("Tentando enviar o e-mail...")
	if err := d.DialAndSend(m); err != nil {
		log.Println("Erro ao enviar o e-mail:", err)
		fmt.Println("Erro ao enviar o e-mail:", err)
		return err
	}

	err = inserirRecuperarSenha(int64(randomNumber), Email, Modulo)

	if err != nil {
		return err
	}

	log.Println("E-mail enviado com sucesso!")
	fmt.Println("E-mail enviado com sucesso!")
	return nil
}

func (r *localUtilsRepository) VerificarCodigo(cod int64) (domain.RecuperarSenha, error) {
	var recSenha domain.RecuperarSenha
	query := "select * from tblRecuperarSenha where recCodigo = ? and recStatus = 1"
	row := database.DB.QueryRow(query, cod)

	if err := row.Scan(&recSenha.RecId, &recSenha.RecCodigo, &recSenha.RecStatus, &recSenha.RecEmail, &recSenha.RecModulo); err != nil {
		if err == sql.ErrNoRows {
			return domain.RecuperarSenha{}, nil
		}
		return domain.RecuperarSenha{}, err
	}

	return recSenha, nil
}

func (r *localUtilsRepository) TrocarSenha(Email, Senha, Modulo string) (bool, error) {
	fmt.Println(Modulo)
	switch Modulo {
	case "cli":
		query := "update tblCliente set cliSenha = ? where cliEmail = ?"
		stmt, err := database.DB.Prepare(query)
		if err != nil {
			return false, err
		}

		defer stmt.Close()

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(Senha), 14)

		if err != nil {
			return false, err
		}

		_, err = stmt.Exec(hashedPassword, Email)

		if err != nil {
			return false, err
		}

		return true, nil
	case "fun":
		query := "update tblFuncionario set funSenha = ? where funEmail = ?"
		stmt, err := database.DB.Prepare(query)
		if err != nil {
			return false, err
		}

		defer stmt.Close()

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(Senha), 14)

		if err != nil {
			return false, err
		}

		_, err = stmt.Exec(hashedPassword, Email)

		if err != nil {
			return false, err
		}

		return true, nil
	}

	return false, nil
}

func inserirRecuperarSenha(randomNumber int64, Email, Modulo string) error {
	updateQuery := `
        update tblRecuperarSenha
        set recStatus = 0
        where recEmail = ?
        and recID = (
            select recID from (
                select recID from tblRecuperarSenha
                where recEmail = ?
                order by recID desc
                limit 1
            ) as subquery
        )
    `
	stmt, err := database.DB.Prepare(updateQuery)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(Email, Email)
	if err != nil {
		return err
	}

	insertQuery := "insert into tblRecuperarSenha values (default, ?, 1, ?, ?)"
	stmt, err = database.DB.Prepare(insertQuery)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(randomNumber, Email, Modulo)
	if err != nil {
		return err
	}

	return nil
}
