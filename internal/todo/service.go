package todo

import (
	"errors"
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/rs/zerolog/log"
)

type TodoFile struct {
	Name    string        `json:"name"`
	Content string        `json:"content"`
	HTML    template.HTML `json:"html,omitempty"`
}

type TodoService struct {
	basePath     string
	mu           sync.RWMutex
	todoTemplate string
}

func NewTodoService() (*TodoService, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return nil, fmt.Errorf("error getting home directory: %w", err)
	}

	basePath := filepath.Join(homeDir, "vault", "Personal", "todos")

	templatePath := filepath.Join(homeDir, "vault", "Personal", "todo-template.md")
	template, err := os.ReadFile(templatePath)
	if err != nil {
		log.Error().Err(err).Str("template", templatePath).Msg("error reading template file")
		return nil, fmt.Errorf("error reading template file: %w", err)
	}

	return &TodoService{
		basePath:     basePath,
		todoTemplate: string(template),
	}, nil
}

// getTodayFilename returns today's filename in YYYY-MM-DD.md format
func (ts *TodoService) getTodayFilename() string {
	return time.Now().UTC().Format("2006-01-02") + ".md"
}

// CreateTodayTodo creates a new todo file for today if it doesn't exist
func (ts *TodoService) CreateTodayTodo() (*TodoFile, error) {
	ts.mu.Lock()
	defer ts.mu.Unlock()

	filename := ts.getTodayFilename()
	filepath := filepath.Join(ts.basePath, filename)

	if _, err := os.Stat(filepath); !errors.Is(err, os.ErrNotExist) {
		return ts.GetTodo(filename)
	}

	content := fmt.Sprintf(ts.todoTemplate, time.Now().UTC().Format("2006-01-02"))
	err := os.WriteFile(filepath, []byte(content), 0644)
	if err != nil {
		return nil, fmt.Errorf("error creating todo file: %w", err)
	}

	return &TodoFile{
		Name:    filename,
		Content: content,
	}, nil
}

// GetTodayTodo gets today's todo file or creates it if it doesn't exist
func (ts *TodoService) GetTodayTodo() (*TodoFile, error) {
	filename := ts.getTodayFilename()
	todo, err := ts.GetTodo(filename)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return ts.CreateTodayTodo()
		}
		return nil, err
	}
	return todo, nil
}

// ListTodos returns all todo files in the directory
func (ts *TodoService) ListTodos() ([]string, error) {
	ts.mu.RLock()
	defer ts.mu.RUnlock()

	entries, err := os.ReadDir(ts.basePath)
	if err != nil {
		log.Error().Err(err).Msg("error reading todo directory")
		return nil, fmt.Errorf("error reading todo directory: %w", err)
	}

	var files []string
	for _, entry := range entries {
		if !entry.IsDir() && filepath.Ext(entry.Name()) == ".md" {
			files = append(files, entry.Name())
		}
	}
	log.Info().Msg("displaying todo files")
	return files, nil
}

// GetTodo reads and returns the information of a specific todo file
func (ts *TodoService) GetTodo(filename string) (*TodoFile, error) {
	ts.mu.RLock()
	defer ts.mu.RUnlock()

	if filepath.Ext(filename) != ".md" {
		filename += ".md"
	}

	filepath := filepath.Join(ts.basePath, filename)
	content, err := os.ReadFile(filepath)
	if err != nil {
		log.Error().Err(err).Str("filepath", filepath).Msg("error reading todo file contents")
		return nil, fmt.Errorf("error reading todo file: %w", err)
	}

	return &TodoFile{
		Name:    filename,
		Content: string(content),
	}, nil
}

// UpdateTodo writes new content to a todo file
func (ts *TodoService) UpdateTodo(filename string, content string) error {
	ts.mu.Lock()
	defer ts.mu.Unlock()

	if filepath.Ext(filename) != ".md" {
		filename += ".md"
	}

	filepath := filepath.Join(ts.basePath, filename)
	err := os.WriteFile(filepath, []byte(content), 0644)
	if err != nil {
		log.Error().Err(err).Str("filepath", filepath).Msg("error updating todo file")
		return fmt.Errorf("error updating todo file: %w", err)
	}

	return nil
}

// CreateTodo creates a new todo file
func (ts *TodoService) CreateTodo(filename, content string) error {
	if filepath.Ext(filename) != ".md" {
		filename += ".md"
	}

	filepath := filepath.Join(ts.basePath, filename)
	if _, err := os.Stat(filepath); !errors.Is(err, os.ErrNotExist) {
		log.Error().Err(err).Str("filename", filename).Msg("todo file already exists")
		return fmt.Errorf("todo file already exists: %s", filename)
	}

	return ts.UpdateTodo(filename, content)
}

// DeleteTodo deletes a todo file
func (ts *TodoService) DeleteTodo(filename string) error {
	ts.mu.Lock()
	defer ts.mu.Unlock()

	if filepath.Ext(filename) != ".md" {
		filename += ".md"
	}

	filepath := filepath.Join(ts.basePath, filename)
	if err := os.Remove(filepath); err != nil {
		log.Error().Err(err).Str("filepath", filepath).Msg("error deleting todo file")
		return fmt.Errorf("error deleting todo file: %w", err)
	}

	log.Info().Str("filepath", filepath).Msg("successfully deleted file")
	return nil
}
