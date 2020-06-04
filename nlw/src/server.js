const express = require("express")
const server = express()

//config pasta publica
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//config pagina inicial
//req requisição
//res resposta
server.get("/", (req, res) => {
    res.render("index.html", {title: "XD"})
})

server.get("/create-point", (req, res) => {
    res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
    res.render("search-results.html")
})

//ligar o serv
server.listen(3000)