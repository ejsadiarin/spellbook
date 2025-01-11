package main

import (
	"database/sql"
	"flag"
	"fmt"
)

type Server struct {
	db   *sql.DB
	port int
}

func main() {
	flag.Parse() // for debugging use: <bin> -debug

	s := Server{
		db:   db,
		port: 12345,
	}
	fmt.Printf("Test hiohihehehe\n")
}
