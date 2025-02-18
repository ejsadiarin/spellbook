package server

import (
	"html/template"
	"os"
	"path/filepath"
)

func parseTemplates() (*template.Template, error) {
	templ := template.New("")
	err := filepath.Walk("templates", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && filepath.Ext(path) == ".html" {
			_, err = templ.ParseFiles(path)
			if err != nil {
				return err
			}
		}
		return nil
	})
	return templ, err
}
