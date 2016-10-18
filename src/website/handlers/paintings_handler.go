package handlers

import (
    "net/http"
    "html/template"
)

type PaintingsHandler struct{}

func (h *PaintingsHandler) ServeHTTP(resp http.ResponseWriter, req *http.Request) {
    p := page{
        PageClass: "paintings",
    }
    templates := template.Must(template.ParseFiles("templates/layout.html", "templates/paintings.html"))
    err := templates.ExecuteTemplate(resp, "base", p)
    if err != nil {
        panic(err)
    }
}