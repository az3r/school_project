package apis

import (
	"context"
	"log"
	"net"
	"net/http"
	"time"

	"az3r.me.service_domain/domains"
)

func InitHttpServer() *http.Server {
	srv := http.Server{
		Addr:              ":3000",
		Handler:           nil,
		ReadTimeout:       5 * time.Second,  // Max time to read request
		WriteTimeout:      10 * time.Second, // Max time to write response
		IdleTimeout:       30 * time.Second, // Max time for a keep-alive connection to remain idle
		ReadHeaderTimeout: 2 * time.Second,  // Max time to read request headers
		BaseContext: func(l net.Listener) context.Context {
			return context.WithValue(context.Background(), &domains.AppDomain, &domains.AppDomain)
		},
	}
	RegisterHandlers()

	return &srv
}

func RegisterHandlers() {
	log.Print("Registering handle functions...")
	http.Handle("/get_all_account", &GetAllAccountHandler{})
	http.Handle("/login", &LoginHandler{})
	http.Handle("/create_account", &CreateAccountHandler{})
}
