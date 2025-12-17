package domains

import (
	"context"

	"az3r.me.service_domain/models"
	"az3r.me.service_domain/tools"
)

func (d *Domain) CreateAccount(parent context.Context, a models.Account) (models.Account, error) {
	query := "insert into public.account (id, domain) values ($1, $2) returning id, domain, updated_at"
	row := d.QueryRow(parent, query, a.Id, a.Domain)
	var output models.Account

	err := row.Scan(&output.Id, &output.Domain, &output.UpdatedAt)
	if err != nil {
		tools.CaptureError("CreateAccount", err)
		return models.Account{}, err
	}

	return output, nil
}
