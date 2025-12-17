package tools

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type ServerError struct {
	Message string `json:"message"`
}

type ErrorResponseDto struct {
	Error ServerError `json:"error"`
}

func RespondError(tag string, e error, w http.ResponseWriter) {
	message := fmt.Sprintf("%s responsed error: %v", tag, e)
	fmt.Fprint(os.Stderr, message)

	SetHeaderJson(w)
	w.WriteHeader(http.StatusInternalServerError)
	err := json.NewEncoder(w).Encode(ErrorResponseDto{
		Error: ServerError{Message: e.Error()},
	})
	if err != nil {
		CaptureError("RespondError", err)
		w.Write([]byte("Internal Server Error"))
	}
}

func RespondJson(w http.ResponseWriter, data interface{}) {
	SetHeaderJson(w)
	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		RespondError("GetAllAccountHandler", err, w)
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
