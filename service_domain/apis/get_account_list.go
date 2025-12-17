package apis

import (
	"net/http"
)

type GetAllAccountHandler struct{}

func (h *GetAllAccountHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	domain := GetAppDomain(r)

	accounts, err := domain.GetAllAccount(r.Context())

	if TryRespondError("GetAllAccountHandler", err, w) != nil {
		return
	}

	RespondJson(w, accounts)
}
