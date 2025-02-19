# Spellbook

- the magician's utility toolbox 

- control center, like the notification system from solo leveling  

- for "action-oriented" workflow/life

- custom ecosystem of my projects

# Technology

- use zerolog, pgx, sqlc(?)
- notifications: messages -> trigger events -> actions (so pubsub architecture?)
- real-time data (so use websockets or rtc or grpc)
- explore redis, kafka, etc. (ONE BY ONE broda)

# PRIORITY TODOs for now

- [ ] sync todos from server and to web client
    - [ ] make it so that i can edit the server todos in the web client and will automatically sync them

- [ ] connect to ntfy and stream messages via websockets
    - [ ] be able to send and receive notifications (from/to a ntfy endpoint) as a client


# Features

- [ ] pubsub notifications to ntfy

- [ ] aggregate multiple "sources" that i want to track on (accept custom notifs from)
    - mangadex
    - some web scraping things
    - beszel data (from homelab)

- [ ] integrate "universal" daily quests
    - [ ] integrate markdown parsing for todos
        - add notifications for daily quests that are not yet completed (not yet checked with [x])

- [ ] GUI for custom kubernetes operator controller API
    - ability to control and configure kubernetes homelab via custom operator

- [ ] spellbook agents for monitoring system information on local and remote hosts
    - like beszel/glance agents (see their repos like glance pkg sysinfo)
