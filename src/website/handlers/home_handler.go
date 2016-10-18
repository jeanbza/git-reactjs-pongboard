package handlers

import (
    "net/http"
    "html/template"
)

type HomeHandler struct{}

func (h *HomeHandler) ServeHTTP(resp http.ResponseWriter, req *http.Request) {
    p := page{
        PageClass: "home",
    }
    templates := template.Must(template.ParseFiles("templates/layout.html", "templates/home.html"))
    err := templates.ExecuteTemplate(resp, "base", p)
    if err != nil {
        panic(err)
    }
}