FROM golang:1.23.4 as build

WORKDIR /app

COPY . .

RUN go mod download

RUN CGO_ENABLED=0 go build -o /bin/spellbook ./cmd/api/main.go

FROM gcr.io/distroless/static-debian12

COPY --from=build /bin/spellbook /bin/

EXPOSE 42069

CMD ["/bin/spellbook"]
