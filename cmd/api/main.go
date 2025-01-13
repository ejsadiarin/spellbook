package main

import (
	"flag"
	"fmt"

	"github.com/ejsadiarin/spellbook/internal/server"
	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Error().Err(err).Msg("cannot load .env")
	}

	flag.Parse() // for debugging use: <bin> -debug

	server := server.New()

	fmt.Printf("Listening on port %s\n", server.Addr)
	err = server.ListenAndServe()
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
