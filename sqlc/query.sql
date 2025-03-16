-- name: GetUserNotifications :many
SELECT * FROM notifications WHERE user_id = $1;

-- name: AddUser :exec
INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3);

-- name: GetUser :one
SELECT id, email, username, created_at FROM users WHERE id = $1;
