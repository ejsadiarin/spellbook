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
	"github.com/rs/zerolog/log"
)

func (s *Server) RegisterRoutes() http.Handler {
	r := chi.NewRouter()

	funcMap := template.FuncMap{
		"safeHTML": func(s string) template.HTML {
			return template.HTML(s)
		},
	}

	templates, err := template.New("").Funcs(funcMap).ParseGlob("internal/templates/*.html")
	if err != nil {
		log.Fatal().Err(err).Msg("failed to parse templates")
	}

	// --- middlewares --- //
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
		// r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		// 	templates.ExecuteTemplate(w, "layout.html", nil)
		// })
	})

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		ts, err := todo.NewTodoService()
		if err != nil {
			log.Error().Err(err).Msg("error creating todo service")
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		filenames, err := ts.ListTodos()
		if err != nil {
			log.Error().Err(err).Msg("error listing todos")
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		todos := make([]todo.TodoFile, 0)
		for _, filename := range filenames {
			if todofile, err := ts.GetTodo(filename); err == nil {
				todos = append(todos, *todofile)
			}
		}

		err = templates.ExecuteTemplate(w, "layout.html", map[string]interface{}{"Todos": todos})
		if err != nil {
			log.Error().Err(err).Msg("error executing template")
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
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
	r.Get("/", th.ListTodos)               // GET /api/todos
	r.Post("/", th.CreateTodo)             // POST /api/todos
	r.Get("/today", th.GetTodayTodo)       // GET /api/todos/today
	r.Post("/today", th.CreateTodayTodo)   // POST /api/todos/today
	r.Put("/today", th.UpdateTodayTodo)    // PUT /api/todos/today
	r.Get("/{filename}", th.GetTodo)       // GET /api/todos/{filename}
	r.Put("/{filename}", th.UpdateTodo)    // PUT /api/todos/{filename}
	r.Delete("/{filename}", th.DeleteTodo) // DELETE /api/todos/{filename}

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
