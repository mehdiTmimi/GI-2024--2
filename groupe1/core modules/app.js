const http = require("http")
const fs = require("fs")
const PORT = 3000

const server = http.createServer((req, res) => {
    let { method, url } = req
    let page = "./site/404.html"
    console.log(method, url)
    if (method == "GET" && (url == "/" || url.toLowerCase() == "/index.html")) {
        page = "./site/index.html"
        res.setHeader("Content-Type", "text/html")
    }
    else if (url.toLowerCase() == "/contact.aspx" && method == "GET") {
        page = "./site/contact.html"
        res.setHeader("Content-Type", "text/html")
    }
    else if (url.toLowerCase() == "/alomehdi" && method == "GET") {
        page = "./site/css/main.css"
        res.setHeader("Content-Type", "text/css")
    }
    else {
        res.statusCode = 404
        res.setHeader("Content-Type", "text/html")
    }


    // chemin relatif non pas a l emplacement du fichier execute (app.js)
    // mais plutot au path ou (where) vous avez execute le fichier (app.js)
    fs.promises.readFile(page)
        .then(data => data.toString())
        .then(data => {
            res.write(data)
        })
        .catch(e => {
            console.log(e)
            res.statusCode = 500
            res.write("sorry, probleme!")
        })
        .finally(() => res.end())
})
server.listen(PORT, () => {
    console.log("server starteeeed")
})