package handlers

import (
    "net/http"
    "html/template"
)

type CustomWorksHandler struct{}

func (h *CustomWorksHandler) ServeHTTP(resp http.ResponseWriter, req *http.Request) {
    p := page{
        PageClass: "custom-works",
    }
    templates := template.Must(template.ParseFiles("templates/layout.html", "templates/custom_works.html"))
    err := templates.ExecuteTemplate(resp, "base", p)
    if err != nil {
        panic(err)
    }
}