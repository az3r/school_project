package apis

import (
	"log"
	"net/http"
)

func InitHttpServer() {
	log.Print("Registering handle functions...")
	http.Handle("/get_all_account", &GetAllAccountHandler{})
	http.Handle("/login", &LoginHandler{})

	log.Printf("Server is listening on port %d", 3000)
	http.ListenAndServe(":3000", nil)
}
