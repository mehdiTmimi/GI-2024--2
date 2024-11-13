const http = require("http")
const fs = require("fs")
const PORT = 3000
// configuration du serveur
const server = http.createServer((req, res) => {
    let { method, url } = req // object destruction
    if ((method == "GET" || method == "POST") && url.toLowerCase() == "/allusers") {
        fs.promises.readFile("./db.json")
            .then(dataBuffer => dataBuffer.toString())
            .then(dataJSON => JSON.parse(dataJSON))
            .then(dataObject => JSON.stringify(dataObject))
            .then(dataJSON => {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                res.write(dataJSON)
            })
            .catch(e => {
                console.log(e)
                res.write(e)
            })
            .finally(() => res.end())
    }
    else if ((method == "GET" || method == "POST")
        && url.toLowerCase().startsWith("/allusers?")) {
        let params = new URLSearchParams(url.split("?")[1])
        let id = params.get("id")
        if (!id) {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify({
                msg: "id is required"
            }))
        }
        else {
            fs.promises.readFile("./db.json")
                .then(data => JSON.parse(data.toString()))
                .then(data => {
                    let { users } = data;
                    let user = users.find(ele => ele.id == id)
                    if (user) {
                        res.statusCode = 200
                        res.setHeader("Content-Type", "application/json")
                        res.write(JSON.stringify(user))
                        res.end()
                    }
                    else {
                        res.statusCode = 404
                        res.setHeader("Content-Type", "application/json")
                        res.write(JSON.stringify({
                            msg: "user not found",
                            id
                        }))
                        res.end()
                    }
                })
                .catch(e => {
                    console.log(e)
                    res.statusCode = 500
                    res.setHeader("Content-Type", "application/json")
                    res.write(JSON.stringify(
                        {
                            msg: "error on the server! sorry"
                        }
                    ))
                    res.end()
                })
            // lire la bd => parse vers object
            // search par id
            // si trouve => retournir le user en json
            // sinon retournir 404 avec msg d erreur
        }
    }
    else if (method == "DELETE" && url.toLowerCase().startsWith("/deleteuser/")) {

    }
    else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(
            {
                msg: "404! ressource not found",
                ressource: url
            }
        ))
        res.end()
        //404
    }
})
// demmarage du serveur
server.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})