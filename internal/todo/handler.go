package todo

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/rs/zerolog/log"
)

type TodoHandler struct {
	service *TodoService
}

func NewTodoHandler(service *TodoService) *TodoHandler {
	return &TodoHandler{
		service: service,
	}
}

func (h *TodoHandler) RegisterRoutes(r chi.Router) {
	r.Get("/todos", h.ListTodos)
	r.Get("/todos/today", h.GetTodayTodo)
	r.Put("/todos/today", h.UpdateTodayTodo)
	r.Get("/todos/{filename}", h.GetTodo)
	r.Put("/todos/{filename}", h.UpdateTodo)
	r.Delete("/todos/{filename}", h.DeleteTodo)
}

func (h *TodoHandler) GetTodayTodo(w http.ResponseWriter, r *http.Request) {
	todofile, err := h.service.GetTodayTodo()
	if err != nil {
		log.Error().Err(err).Str("todofile", todofile.Name).Msg("error getting todo for today")
		http.Error(w, "Failed to get today's todo", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(todofile)
}

func (h *TodoHandler) UpdateTodayTodo(w http.ResponseWriter, r *http.Request) {
	var todo TodoFile
	if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	filename := h.service.getTodayFilename()
	if err := h.service.UpdateTodo(filename, todo.Content); err != nil {
		log.Error().Err(err).Str("filename", filename).Msg("failed to update today's todo")
		http.Error(w, "Failed to update today's todo", http.StatusInternalServerError)
		return
	}
}

func (h *TodoHandler) ListTodos(w http.ResponseWriter, r *http.Request) {
	files, err := h.service.ListTodos()
	if err != nil {
		log.Error().Err(err).Msg("failed to list todos")
		http.Error(w, "Failed to list todos", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(files)
}

func (h *TodoHandler) GetTodo(w http.ResponseWriter, r *http.Request) {
	filename := chi.URLParam(r, "filename")
	todo, err := h.service.GetTodo(filename)
	if err != nil {
		log.Error().Err(err).Str("filename", filename).Msg("failed to get todo")
		http.Error(w, "Failed to get todo", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(todo)
}

func (h *TodoHandler) CreateTodo(w http.ResponseWriter, r *http.Request) {
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
}

func (h *TodoHandler) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	filename := chi.URLParam(r, "filename")
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
