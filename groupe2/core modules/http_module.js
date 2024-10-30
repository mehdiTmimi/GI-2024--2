const http = require("http")
const fs = require("fs")
// va vous permettre de configurer votre serveur // le callback va etre execute pour chaque requete recu
// res.write => rajoute du contenu au body de response
// res.end => renvoie la response au client
// res.statusCode => propriete en lecture et en ecriture pour specifier 
// le statut de votre response
// todo: // path = / ou /index.html et la methode est GET => index.html
// path = /contact.php et la methode est GET => contact.html
// pour tout autre path et method => 404.html
const server = http.createServer((req, res) => {
    let { method, url } = req
    res.setHeader("Content-Type", "text/html")
    res.setHeader("ok", "alae")
    console.log(url.toLowerCase())
    let page = "./site/404.html"
    // geT, Get, GET,gET => get
    if (method.toLowerCase() == "get"
        && (url.toLowerCase() == "/index.html") || url == "/" || url == "/mehdi")
        page = "./site/index.html"
    else if (url.toLowerCase() == "/contact.php")
        page = "./site/contact.html"
    else if (url.toLowerCase() == "/x") {
        page = "./site/css/main.css"
        res.setHeader("Content-Type", "text/css")
    }
    else if (url.toLowerCase() == "/style.css") {
        
        res.setHeader("Content-Type", "text/css")
        res.write(`h1{text-decoration:underline;}`)
        return res.end()
    }
    else
        res.statusCode = 404
    fs.promises.readFile(page)
        .then(data => data.toString())
        .then(data => {
            res.write(data)
        })
        .catch(e => {
            res.statusCode = 500
            res.write("desole, erreur dans le serveur")
            console.log(e)
        })
        .finally(() => res.end())
})
server.listen(3000, () => { // http://localhost:3000
    console.log("server started")
})