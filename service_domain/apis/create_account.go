package apis

import (
	"net/http"

	"az3r.me.service_domain/models"
)

type CreateAccountHandler struct{}

func (h *CreateAccountHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	domain := GetAppDomain(r)

	var dto models.Account
	err := ParseJsonBody(r, &dto)
	if TryRespondError("CreateAccountHandler", err, w) != nil {
		return
	}

	data, err := domain.CreateAccount(r.Context(), dto)
	if TryRespondError("CreateAccountHandler", err, w) != nil {
		return
	}
	RespondJson(w, data)
}
