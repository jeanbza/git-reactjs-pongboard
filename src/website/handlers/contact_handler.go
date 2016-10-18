package handlers

import (
    "net/http"
    "html/template"
)

type ContactHandler struct{}

func (h *ContactHandler) ServeHTTP(resp http.ResponseWriter, req *http.Request) {
    p := page{
        PageClass: "contact",
    }
    templates := template.Must(template.ParseFiles("templates/layout.html", "templates/contact.html"))
    err := templates.ExecuteTemplate(resp, "base", p)
    if err != nil {
        panic(err)
    }
}