package main

import (
	"az3r.me.service_domain/apis"
	"az3r.me.service_domain/domains"
)

func main() {
	domains.ConnectDatabase()
	defer domains.AppDomain.Conn.Close()

	apis.InitHttpServer()
}
