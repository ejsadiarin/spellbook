package server

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := chi.NewRouter()

	// middlewares
	// r.Use()

	// register handlers here as long as it is in the same package "server",
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hehehehehehe test"))
	})
	r.Get("/health", s.healthHandler)

	return r
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	jsonResp, _ := json.Marshal(s.db.Health())
	_, _ = w.Write(jsonResp)
}
