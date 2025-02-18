package server

import (
	"context"
	"encoding/json"
	"html/template"
	"net/http"
	"time"

	"github.com/ejsadiarin/spellbook/internal/todo"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"github.com/rs/zerolog/log"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := chi.NewRouter()

	templates, err := template.ParseGlob("templates/*.html")
	if err != nil {
		log.Fatal().Err(err).Msg("failed to parse templates")
	}

	// --- middlewares --- //
	r.Use(render.SetContentType(render.ContentTypeJSON))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:3500"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// --- routes --- //

	// Static files
	fileServer := http.FileServer(http.Dir("static"))
	r.Handle("/static/*", http.StripPrefix("/static/", fileServer))

	// ntfy := notification.NewNtfyClient("topic")
	r.Route("/api", func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("hehehehehehe test"))
		})
		r.Get("/health", s.healthHandler)
		r.Mount("/todos", RegisterTodoRoutes(templates))
		// r.Get("/notification/stream", ntfy.SubscribeToNotifications)
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			templates.ExecuteTemplate(w, "layout.html", nil)
		})
	})

	return r
}

func RegisterTodoRoutes(templates *template.Template) chi.Router {
	r := chi.NewRouter()
	ts, err := todo.NewTodoService()
	if err != nil {
		log.Error().Err(err).Msg("error creating todo service")
	}
	th := todo.NewTodoHandler(ts, templates)
	r.Get("/", th.ListTodos)               // GET /todos
	r.Post("/", th.CreateTodo)             // POST /todos
	r.Get("/today", th.GetTodayTodo)       // GET /todos/today
	r.Post("/today", th.CreateTodayTodo)   // POST /todos/today
	r.Put("/today", th.UpdateTodayTodo)    // PUT /todos/today
	r.Get("/{filename}", th.GetTodo)       // GET /todos/{filename}
	r.Put("/{filename}", th.UpdateTodo)    // PUT /todos/{filename}
	r.Delete("/{filename}", th.DeleteTodo) // DELETE /todos/{filename}

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
