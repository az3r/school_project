package apis

import (
	"net/http"
	"slices"

	"az3r.me.service_domain/dtos"
	"az3r.me.service_domain/models"
)

type LoginHandler struct{}

func (h *LoginHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	domain := GetAppDomain(r)

	accounts, err := domain.GetAllAccount(r.Context())
	if TryRespondError("LoginHandler", err, w) != nil {
		return
	}

	var dto dtos.LoginDto
	err = ParseJsonBody(r, &dto)
	if TryRespondError("LoginHandler", err, w) != nil {
		return
	}

	index := slices.IndexFunc(accounts, func(a models.Account) bool {
		return a.Id == dto.Id
	})

	if index < 0 {
		w.WriteHeader(http.StatusNotFound)
	} else {
		RespondJson(w, accounts[index])
	}
}
