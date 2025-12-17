package domains

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Domain struct {
	Conn *pgxpool.Pool
}

var AppDomain Domain

func ConnectDatabase(parent context.Context) {
	log.Printf("Connecting to database server...")
	conn, err := pgxpool.New(parent, "postgres://postgres:postgres@localhost:5432/school")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to connect to database server: %v", err)
		log.Fatal(err)
	}

	AppDomain = Domain{Conn: conn}
}

func (d *Domain) Query(parent context.Context, sql string, args ...any) (pgx.Rows, error) {
	ctx, cancel := context.WithTimeout(parent, 10*time.Second)
	defer cancel()

	return d.Conn.Query(ctx, sql, args...)
}

func (d *Domain) QueryRow(parent context.Context, sql string, args ...any) pgx.Row {
	ctx, cancel := context.WithTimeout(parent, 10*time.Second)
	defer cancel()

	return d.Conn.QueryRow(ctx, sql, args...)
}
