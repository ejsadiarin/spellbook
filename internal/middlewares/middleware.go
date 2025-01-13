package middlewares

import "net/http"

func AdminMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// ...admin logic here
		next.ServeHTTP(w, r)
	})
}
