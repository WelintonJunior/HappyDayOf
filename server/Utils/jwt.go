package UTILS

import (
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

const secretKey = "chaveultrasecreta"

func GenerateTokenCliente(cliEmail string, cliId int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"cliEmail": cliEmail,
		"cliId":    cliId,
		"exp":      time.Now().Add(time.Hour * 2).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}

func GenerateTokenFuncionario(funEmail string, funId int64) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"funEmail": funEmail,
		"funId":    funId,
		"exp":      time.Now().Add(time.Hour * 8).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}

func VerifyToken(token string) error {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Unexpected signing method")
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		fmt.Println(err)
		return errors.New("Não foi possível parse token")
	}

	// Check if the token is valid
	if !parsedToken.Valid {
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
