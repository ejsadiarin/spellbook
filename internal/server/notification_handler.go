package server

import (
	"encoding/json"
	"net/http"

	"github.com/rs/zerolog/log"

	"github.com/ejsadiarin/spellbook/internal/database"
)

type NotificationsRequest struct {
	UserID int32 `json:"user_id"`
}

func (s *Server) GetNotificationsHandler(w http.ResponseWriter, r *http.Request) {
	var req NotificationsRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Error().Err(err).Msg("unable to parse request body")
		http.Error(w, "unable to parse request body", http.StatusInternalServerError)
		return
	}

	q := database.New(s.db)
	data, err := q.GetUserNotifications(r.Context(), req.UserID)
	if err != nil {
		log.Error().Err(err).Msg("unable to fetch data from database")
		http.Error(w, "unable to fetch data from database", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Error().Err(err).Msg("unable to encode data to json")
		http.Error(w, "unable to encode data to json", http.StatusInternalServerError)
		return
	}
}
