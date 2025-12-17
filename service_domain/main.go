package main

import (
	"context"
	"log"
	"time"

	"az3r.me.service_domain/apis"
	"az3r.me.service_domain/domains"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Minute)
	defer cancel()

	domains.ConnectDatabase(ctx)
	defer domains.AppDomain.Conn.Close()

	server := apis.InitHttpServer()
	log.Printf("Server is listening on port %d", 3000)
	server.ListenAndServe()
}
