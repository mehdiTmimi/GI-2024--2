const http = require("http")
const fs = require("fs")
const PORT = 3000
const dbPath = "./db.json"
// configuration du serveur
const server = http.createServer((req, res) => {
    let { method, url } = req // object destruction
    if ((method == "GET" || method == "POST") && url.toLowerCase() == "/allusers") {
        fs.promises.readFile(dbPath)
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
            fs.promises.readFile(dbPath)
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
    // http://localhost:3000/deleteuser/23
    else if (method == "DELETE" && url.toLowerCase().startsWith("/deleteuser/")) {
        // extracter le id a partir du url (split)
        // lire la bd => array = > rechercher par id dans cet array
        // non trouve => renvoi 404
        // si trouve => le supprimer de la memoire (array) => puis reecrire le tout dans la bd => renvoi 200
        let id = url.split('/')[2]
        res.setHeader("Content-Type", "application/json")
        if (!id) // id est egal a la chaine vide '' ou undefined ou null ou NaN ou 0 ...
        {
            res.statusCode = 400
            res.write(JSON.stringify({
                msg: "user id is required"
            }))
            return res.end()
        }
        fs.promises.readFile(dbPath)
            .then(data => JSON.parse(data.toString()))
            .then(data => {
                return {data : data, user : data.users.find(ele => ele.id == id)}
                     // retourn soit undefined soit objet trouve
            })
            .then(obj => {
                let {data,user} = obj
                if (!user) {
                    res.statusCode = 404
                    res.write(JSON.stringify({
                        msg: "user not found",
                        identifiant: id
                    }))
                    return res.end()
                }
                data.users = data.users.filter(ele => ele != user)
                fs.promises.writeFile(dbPath, JSON.stringify(data, null, 2)).
                    then(() => {
                        res.statusCode = 200
                        res.write(JSON.stringify({
                            msg: "user deleted with success",
                            identifiant: id
                        }))
                        return res.end()
                    })
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