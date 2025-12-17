package apis

import (
	"net/http"
	"slices"

	"az3r.me.service_domain/domains"
	"az3r.me.service_domain/dtos"
	"az3r.me.service_domain/models"
	"az3r.me.service_domain/tools"
)

type LoginHandler struct{}

func (h *LoginHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	domain := domains.AppDomain
	accounts, err := domain.GetAllAccount()
	if err != nil {
		tools.RespondError("LoginHandler", err, w)
		return
	}

	var dto dtos.LoginDto
	err = tools.ParseJsonBody(r, &dto)
	if err != nil {
		tools.RespondError("LoginHandler", err, w)
	}

	index := slices.IndexFunc(accounts, func(a models.Account) bool {
		return a.Id == dto.Id
	})

	if index < 0 {
		w.WriteHeader(http.StatusNotFound)
	} else {
		tools.RespondJson(w, accounts[index])
	}
}
