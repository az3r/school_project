package apis

import (
	"net/http"

	"az3r.me.service_domain/domains"
	"az3r.me.service_domain/tools"
)

type GetAllAccountHandler struct{}

func (h *GetAllAccountHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	domain := domains.AppDomain

	accounts, err := domain.GetAllAccount()

	if err != nil {
		tools.RespondError("GetAllAccountHandler", err, w)
		return
	}

	tools.RespondJson(w, accounts)
}
