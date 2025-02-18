package todo

import (
	"encoding/json"
	"html/template"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"
)

type TodoHandler struct {
	service   *TodoService
	templates *template.Template
}

func (h *TodoHandler) wantsJSON(r *http.Request) bool {
	accept := r.Header.Get("Accept")
	return strings.Contains(accept, "application/json") || strings.Contains(r.Header.Get("Hx-Request"), "true")
}

func (h *TodoHandler) render(w http.ResponseWriter, r *http.Request, template string, data interface{}) {
	if h.wantsJSON(r) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(data)
		return
	}

	if err := h.templates.ExecuteTemplate(w, template, data); err != nil {
		log.Error().Err(err).Msg("error rendering template")
		http.Error(w, "Error rendering page", http.StatusInternalServerError)
	}
}

func NewTodoHandler(service *TodoService, templates *template.Template) *TodoHandler {
	return &TodoHandler{
		service:   service,
		templates: templates,
	}
}

func (h *TodoHandler) GetTodayTodo(w http.ResponseWriter, r *http.Request) {
	todofile, err := h.service.GetTodayTodo()
	if err != nil {
		log.Error().Err(err).Str("todofile", todofile.Name).Msg("error getting todo for today")
		http.Error(w, "Failed to get today's todo", http.StatusInternalServerError)
		return
	}
	// json.NewEncoder(w).Encode(todofile)
	h.render(w, r, "todo-view.html", todofile)
}

func (h *TodoHandler) CreateTodayTodo(w http.ResponseWriter, r *http.Request) {
	todofile, err := h.service.CreateTodayTodo()
	if err != nil {
		log.Error().Err(err).Str("todofile", todofile.Name).Msg("error creating todo for today")
		http.Error(w, "Failed to create today's todo", http.StatusInternalServerError)
		return
	}

	// for HTMX requests, render new todo view
	if r.Header.Get("Hx-Request") == "true" {
		h.render(w, r, "todo-view.html", todofile)
		return
	}

	// for API requests
	w.WriteHeader(http.StatusCreated)
}

func (h *TodoHandler) UpdateTodayTodo(w http.ResponseWriter, r *http.Request) {
	filename := h.service.getTodayFilename()
	if r.Header.Get("Content-Type") == "application/json" {
		var todo TodoFile
		if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		if err := h.service.UpdateTodo(filename, todo.Content); err != nil {
			log.Error().Err(err).Str("filename", filename).Msg("failed to update today's todo")
			http.Error(w, "Failed to update today's todo", http.StatusInternalServerError)
			return
		}
		return
	}

	// handle form submission
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Invalid form data", http.StatusBadRequest)
		return
	}

	content := r.FormValue("content")
	if err := h.service.UpdateTodo(filename, content); err != nil {
		log.Error().Err(err).Str("filename", filename).Msg("failed to update today's todo")
		http.Error(w, "Failed to update today's todo", http.StatusInternalServerError)
		return
	}

	todo, _ := h.service.GetTodo(filename)
	h.render(w, r, "todo-view.html", todo)
}

func (h *TodoHandler) ListTodos(w http.ResponseWriter, r *http.Request) {
	files, err := h.service.ListTodos()
	if err != nil {
		log.Error().Err(err).Msg("failed to list todos")
		http.Error(w, "Failed to list todos", http.StatusInternalServerError)
		return
	}

	todos := make([]TodoFile, 0)
	for _, filename := range files {
		if todo, err := h.service.GetTodo(filename); err == nil {
			todos = append(todos, *todo)
		}
	}

	h.render(w, r, "todos.html", map[string]interface{}{
		"Todos": todos,
	})
}

func (h *TodoHandler) GetTodo(w http.ResponseWriter, r *http.Request) {
	filename := chi.URLParam(r, "filename")
	todo, err := h.service.GetTodo(filename)
	if err != nil {
		log.Error().Err(err).Str("filename", filename).Msg("failed to get todo")
		http.Error(w, "Failed to get todo", http.StatusInternalServerError)
		return
	}

	if r.Header.Get("HX-Trigger") == "edit" {
		h.render(w, r, "todo-edit.html", todo)
		return
	}

	h.render(w, r, "todo-view.html", todo)
}

func (h *TodoHandler) CreateTodo(w http.ResponseWriter, r *http.Request) {
	if r.Header.Get("Content-Type") == "application/json" {
		var todo TodoFile
		if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		if err := h.service.CreateTodo(todo.Name, todo.Content); err != nil {
			log.Error().Err(err).Str("filename", todo.Name).Msg("failed to create todo")
			http.Error(w, "Failed to create todo", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		return
	}

	// Handle form submission
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Invalid form data", http.StatusBadRequest)
		return
	}

	name := r.FormValue("name")
	content := r.FormValue("content")
	if err := h.service.CreateTodo(name, content); err != nil {
		log.Error().Err(err).Str("filename", name).Msg("failed to create todo")
		http.Error(w, "Failed to create todo", http.StatusInternalServerError)
		return
	}

	todo, _ := h.service.GetTodo(name)
	h.render(w, r, "todo-view.html", todo)
}

func (h *TodoHandler) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	filename := chi.URLParam(r, "filename")

	if r.Header.Get("Content-Type") == "application/json" {
		var todo TodoFile
		if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		if err := h.service.UpdateTodo(filename, todo.Content); err != nil {
			log.Error().Err(err).Str("filename", filename).Msg("failed to update todo")
			http.Error(w, "Failed to update todo", http.StatusInternalServerError)
			return
		}
		return
	}

	// Handle form submission
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Invalid form data", http.StatusBadRequest)
		return
	}

	content := r.FormValue("content")
	if err := h.service.UpdateTodo(filename, content); err != nil {
		log.Error().Err(err).Str("filename", filename).Msg("failed to update todo")
		http.Error(w, "Failed to update todo", http.StatusInternalServerError)
		return
	}

	todo, _ := h.service.GetTodo(filename)
	h.render(w, r, "todo-view.html", todo)
}

func (h *TodoHandler) DeleteTodo(w http.ResponseWriter, r *http.Request) {
	filename := chi.URLParam(r, "filename")
	if err := h.service.DeleteTodo(filename); err != nil {
		log.Error().Err(err).Str("filename", filename).Msg("failed to delete todo")
		http.Error(w, "Failed to delete todo", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
