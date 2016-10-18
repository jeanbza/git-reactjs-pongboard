package main

import (
    "net/http"
    "github.com/gorilla/mux"
    "website/handlers"
    "log"
    "fmt"
    "os"
)

func main() {
    port := "8000"
    if os.Getenv("PORT") != "" {
        port = os.Getenv("PORT")
    }

    r := mux.NewRouter()

    s := http.StripPrefix("/dist/", http.FileServer(http.Dir("./dist/")))
    r.PathPrefix("/dist/").Handler(s)

    s = http.StripPrefix("/images/", http.FileServer(http.Dir("./images/")))
    r.PathPrefix("/images/").Handler(s)

    r.Handle("/", &handlers.HomeHandler{})
    r.Handle("/paintings", &handlers.PaintingsHandler{})
    r.Handle("/cards", &handlers.CardsHandler{})
    r.Handle("/custom_works", &handlers.CustomWorksHandler{})
    r.Handle("/contact", &handlers.ContactHandler{})
    http.Handle("/", r)

    fmt.Printf("Running on port %s\n", port)
    log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), r))
}