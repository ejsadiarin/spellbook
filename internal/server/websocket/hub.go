package websocket

type Hub struct {
	clients   map[*Client]bool
	broadcast chan []byte
}
