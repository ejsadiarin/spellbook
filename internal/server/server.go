package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/ejsadiarin/spellbook/internal/database"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/zerolog/log"
)

type Server struct {
	db   *pgxpool.Pool
	port int
}

func New() *http.Server {
	port, err := strconv.Atoi(os.Getenv("API_PORT"))
	if err != nil {
		log.Error().Err(err).Msg("cannot convert port to int")
	}

	newServer := &Server{
		db:   database.Connect(),
		port: port,
	}

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      newServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	return server
}
