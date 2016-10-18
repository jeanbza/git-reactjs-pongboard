package handlers

import (
    "net/http"
    "html/template"
)

type CardsHandler struct{}

func (h *CardsHandler) ServeHTTP(resp http.ResponseWriter, req *http.Request) {
    p := page{
        PageClass: "cards",
    }
    templates := template.Must(template.ParseFiles("templates/layout.html", "templates/cards.html"))
    err := templates.ExecuteTemplate(resp, "base", p)
    if err != nil {
        panic(err)
    }
}