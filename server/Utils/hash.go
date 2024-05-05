package UTILS

import "golang.org/x/crypto/bcrypt"

func CheckHashPassword(senhaDigitada, senhaHashada string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(senhaHashada), []byte(senhaDigitada))

	if err != nil {
		return false, err
	}

	return true, nil
}
