package UTILS

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt"
)

const secretKey = "chaveultrasecreta3000"

func GenerateToken(cliEmail string, cliId int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"cliEmail": cliEmail,
		"cliId":    cliId,
		"exp":      time.Now().Add(time.Hour * 2).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}

func VerifyToken(token string) error {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (any, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, errors.New("Unexpected signing method")
		}
		return secretKey, nil
	})

	if err != nil {
		return errors.New("Não foi possivel parse token")
	}

	tokenIsValid := parsedToken.Valid

	if !tokenIsValid {
		return errors.New("Invalid Token")
	}

	// claims, ok := parsedToken.Claims.(jwt.MapClaims)

	// if !ok {
	// 	return errors.New("Invalid token claims")
	// }

	// usuLogin := claims["usuLogin"].(string)
	// idUsuario := claims["idUsuario"].(int64)
	return nil
}
