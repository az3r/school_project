package domains

import (
	"context"

	"az3r.me.service_domain/tools"
)

func (d Domain) GetEstimatedCount(parent context.Context, table string) (int, error) {
	row := d.Conn.QueryRow(parent, "SELECT reltuples::bigint AS value FROM pg_class WHERE oid = $1::regclass", table)

	var count int
	err := row.Scan(&count)
	if err != nil {
		tools.CaptureError("GetEstimatedCount", err)
		return -1, err
	}

	count = max(0, count)
	return count, nil
}
