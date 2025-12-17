package apis

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"az3r.me.service_domain/domains"
)

type ServerError struct {
	Message string `json:"message"`
}

type ErrorResponseDto struct {
	Error ServerError `json:"error"`
}

func TryRespondError(tag string, e error, w http.ResponseWriter) error {
	if e == nil {
		return e
	}

	message := fmt.Sprintf("%s responsed error: %v", tag, e)
	fmt.Fprint(os.Stderr, message)

	SetHeaderJson(w)
	w.WriteHeader(http.StatusInternalServerError)
	dto := ErrorResponseDto{Error: ServerError{Message: e.Error()}}
	json.NewEncoder(w).Encode(dto)
	return e
}

func RespondJson(w http.ResponseWriter, data interface{}) {
	SetHeaderJson(w)
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		TryRespondError("GetAllAccountHandler", err, w)
		return
	}
}

func SetHeaderJson(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
}

func ParseJsonBody(r *http.Request, dest any) error {
	err := json.NewDecoder(r.Body).Decode(dest)
	if err != nil {
		return err
	}
	return nil
}

func GetAppDomain(r *http.Request) *domains.Domain {
	return r.Context().Value(&domains.AppDomain).(*domains.Domain)
}
