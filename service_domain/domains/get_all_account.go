package domains

import (
	"context"
	"fmt"

	"az3r.me.service_domain/models"
	"az3r.me.service_domain/tools"
	"github.com/jackc/pgx/v5"
)

func (d Domain) GetAllAccount(parent context.Context) ([]models.Account, error) {
	table := "public.account"

	query := fmt.Sprintf("select id, domain, updated_at from %s order by updated_at", table)
	rows, err := d.Query(parent, query)
	if tools.CaptureError("GetAllAccount", err) != nil {
		return nil, err
	}
	defer rows.Close()

	data, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Account])
	if tools.CaptureError("GetAllAccount", err) != nil {
		return nil, err
	}

	return data, nil
}
