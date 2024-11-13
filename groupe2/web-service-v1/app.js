const http = require("http")
const fs = require("fs")
const PORT = 3000

// configuration
const server = http.createServer((req, res) => {
    let { url, method } = req // object destruction
    if (method == "GET" && url.toLowerCase() == "/liste") {
        res.write("liste")
        res.end()
    }
    // query params: une maniere d envoyer les donnes dans le url
    // http://domain-name||ip adress:PORT/path?clef=valeur&clef=valeur
    //exemple: on veut envoyer le nom mehdi et l age 32 au serveur : localhost:3000/ok
    // http://localhost:3000/ok?nom=mehdi&age=32
    else if (method == "PUT" && url.startsWith("/n?")) { // /n?ok=10&number=20
        let params = new URLSearchParams(url.split("?")[1])
        let number = params.get('number')
        res.write("number est")
        res.write(number)
        res.end()
    }
    else if (method == "POST" && url.startsWith("/ok/")) {
        let number = url.split("/")[2]
        fs.promises.readFile('./db.json')
            .then(data => data.toString())
            .then(dataJSON => JSON.parse(dataJSON))
            .then(data => {
                let resultat = data.racines.find(ele => ele.number == number)// retourn soit objet soit undefined
                if (!resultat) {
                    res.statusCode = 404
                    res.setHeader("Content-Type", "application/json")
                    res.write(JSON.stringify({
                        msg: "cannot delete number",
                        reason: "number not found",
                        number
                    }))
                    res.end()
                }
                else {
                    data.racines = data.racines.filter(ele => ele != resultat)
                    data.count--
                    fs.promises.writeFile("./db.json", JSON.stringify(data,null,3))
                        .then(() => {
                            res.statusCode = 200
                            res.setHeader("Content-Type", "application/json")
                            res.write(JSON.stringify({
                                msg: "number deleted with success",
                                number
                            }))
                            res.end()
                        })
                }
            })
            .catch(e => {
                console.log(e)
                res.statusCode = 500
                res.setHeader("Content-Type", "application/json")
                res.write(JSON.stringify({
                    msg: "server problem !"
                }))
                res.end()
            })
        /*res.write("delete le nombre ")
        res.write(number)
        res.end()*/
    }
    else {
        res.write("404")
        res.end()
    }
})
// demmarage
server.listen(PORT, () => console.log(`Server started at ${PORT}`))