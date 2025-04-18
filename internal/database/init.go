package database

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/rs/zerolog/log"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/joho/godotenv/autoload"
)

var (
	username = os.Getenv("DB_USERNAME")
	password = os.Getenv("DB_PASSWORD")
	host     = os.Getenv("DB_HOST")
	port     = os.Getenv("DB_PORT")
	database = os.Getenv("DB_DATABASE")
)

func Connect() *pgxpool.Pool {
	// DB_URL=driver://user:password@host:port/dbname (e.g. postgres://postgres:root@localhost:5432/hehedb)
	dbconn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", username, password, host, port, database)

	// dbpool, err := sql.Open("pgx", dbconn)
	ctx := context.Background()
	dbpool, err := pgxpool.New(ctx, dbconn)
	if err != nil {
		log.Fatal().Err(err).Msg("cannot establish database connection")
	}

	q := New(dbpool)
	q.db.Exec(ctx, `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS notifications (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);
    `)

	return dbpool
}

func Health(dbpool *pgxpool.Pool) map[string]string {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	err := dbpool.Ping(ctx)
	if err != nil {
		log.Fatal().Err(err).Msg("database is down")
	}

	return map[string]string{
		"message": "It's healthy",
	}
}
