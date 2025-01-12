package main

import (
	"database/sql"
	"flag"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
)

type Server struct {
	db   *sql.DB
	port int
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Error().Err(err).Msg("cannot load .env")
	}
	flag.Parse() // for debugging use: <bin> -debug

	r := chi.NewRouter()
	// connect to db
	// database.Connect()
	// defer disconnect to db

	// -- server configs -- //
	// s := Server{
	// 	db:   db,
	// 	port: 12345,
	// }
	// middlewares
	// routes (general, admin, special routes)
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("test hehee"))
	})

	// -- server configs end -- //

	// listen and serve
}
