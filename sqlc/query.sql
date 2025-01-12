-- name: GetUserNotifications :many
SELECT * FROM notifications WHERE user_id = $1;
