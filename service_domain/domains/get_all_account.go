package domains

import (
	"context"
	"fmt"

	"az3r.me.service_domain/models"
	"az3r.me.service_domain/tools"
)

func (domain Domain) GetAllAccount() ([]models.Account, error) {
	conn := domain.Conn

	table := "public.account"

	count, err := domain.GetEstimatedCount(table)
	if err != nil {
		return nil, err
	}

	query := fmt.Sprintf("select id, domain, updated_at from %s order by updated_at", table)
	rows, err := conn.Query(context.Background(), query)
	if err != nil {
		tools.CaptureError("GetAllAccount", err)
		return nil, err
	}
	defer rows.Close()

	data := make([]models.Account, count)
	for rows.Next() {
		var r models.Account
		err := rows.Scan(&r.Id, &r.Domain, &r.UpdatedAt)
		if err != nil {
			tools.CaptureError("GetAllAccount", err)
			continue
		}
		data = append(data, r)
	}

	return data, nil
}
