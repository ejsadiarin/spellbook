package server

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/rs/zerolog/log"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := chi.NewRouter()

	// --- middlewares --- //

	// automatic header "application/json"
	r.Use(render.SetContentType(render.ContentTypeJSON))

	// --- routes --- //

	// ntfy := notification.NewNtfyClient("topic")
	r.Route("/api", func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("hehehehehehe test"))
		})
		r.Get("/health", s.healthHandler)
		// r.Get("/todo", s.todoHandler.GetTodos)
		// r.Put("/todo", s.todoHandler.UpdateTodos)
		// r.Get("/notification/stream", ntfy.SubscribeToNotifications)
	})

	return r
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), 1*time.Second)
	defer cancel()

	err := s.db.Ping(ctx)
	if err != nil {
		log.Fatal().Err(err).Msg("database is down")
	}

	resp := map[string]string{
		"message": "database is healthy",
	}

	log.Info().Msg("successfully connected to database")
	jsonResp, _ := json.Marshal(resp)
	_, _ = w.Write(jsonResp)
}
