const http = require("http")
const fs = require("fs")
// la configuration : la method createServer accepte comme param un callback
// ce callback va etre execute a chaque fois qu une requete est recu par le serveur
// => dans ce callback vous allez specifier quoi realiser une fois une requete recu
// TO DO : auto formation sur la convention REST
// la difference entre web service et REST API
// des details sur la convention REST
const server = http.createServer((req, res) => {
    console.log( req.headers["nbr"])
    if (req.url == "/" || req.url == "/index.html") {
        res.setHeader("Content-Type","text/html")
        fs.promises.readFile("./website/index.html")
            .then(data => data.toString())
            .then(data => res.write(data))
            .catch(e => {
                res.statusCode=500
                res.write("erreur dans le serveur")
                console.log(e)
            })
            .finally(() => res.end())
    }
    else if (req.url == "/produits.php") {
        fs.promises.readFile("./website/produits.html")
            .then(data => data.toString())
            .then(data => res.write(data))
            .catch(e => {
                res.statusCode=500
                res.write("erreur dans le serveur")
                console.log(e)
            })
            .finally(() => res.end())
    }
    else if (req.url == "/css/main.css") {
        fs.promises.readFile("./website/css/main.css")
            .then(data => data.toString())
            .then(data => {
                res.setHeader("Content-Type","text/css")
                res.write(data)
            })
            .catch(e => {
                res.statusCode=500
                res.write("erreur dans le serveur")
                console.log(e)
            })
            .finally(() => res.end())
    }
    else
        fs.promises.readFile("./website/404.html")
            .then(data => data.toString())
            .then(data => {
                res.statusCode=404
                res.write(data)
            })
            .catch(e => {
                res.statusCode=500
                res.write("erreur dans le serveur")
                console.log(e)
            })
            .finally(() => res.end())
})
server.listen(3000, () => { // demmarage du serveur
    console.log("server started !")
})