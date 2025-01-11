# Spellbook

- use zerolog, pgx, sqlc(?)

- control center, like the notification system from solo leveling  
- for "action-oriented" workflow/life
- notifications: messages -> trigger events -> actions (so pubsub architecture?)
- real-time data (so use websockets or rtc or grpc)
- explore redis, kafka, etc. (ONE BY ONE broda)

# Problem to be solved:

- [ ] mainly use ntfy for notifications
- [ ] aggregate multiple "sources" that i want to track on (accept custom notifs from)
    - mangadex
    - some web scraping things
    - beszel data (from homelab)
- [ ] integrate "universal" daily quests

# TODOs
connect to ntfy and stream messages via websockets

# Backlog

- [ ] integrate markdown parsing for todos
    - add notifications for daily quests that are not yet completed (not yet checked with [x])
