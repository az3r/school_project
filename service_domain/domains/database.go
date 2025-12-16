package domains

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Domain struct {
	Conn *pgxpool.Pool
}

var AppDomain Domain

func ConnectDatabase() {
	log.Printf("Connecting to database server...")

	conn, err := pgxpool.New(context.Background(), "postgres://postgres:postgres@localhost:5432/school")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to connect to database server: %v", err)
		log.Fatal(err)
	}

	AppDomain = Domain{Conn: conn}
}
