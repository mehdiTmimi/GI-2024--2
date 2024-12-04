const http = require("http")
const User = require("./User.js")
const { deleteById, getAll, getById, save, update } = require("./persistence.js")
const PORT = 3000

const server = http.createServer((req, res) => {
    const { url, method } = req
    res.setHeader("Content-Type", "application/json")

    //get one single user
    if (url.toLowerCase().startsWith("/users/") && method == "GET") {
        let id = url.split("/")[2]
        getById(id)
            .then(user => {
                if (user)
                    return sendResponse(res, 200, user)
                sendResponse(res, 404, { msg: "user not found", id })
            })
            .catch(e => {
                console.error(e)
                sendResponse(res, 500, { msg: "erreur dans le serveur" })
            })
    }
    //getall with or without criteria (limit)
    else if (url.toLowerCase().startsWith("/users") && method == "GET") {
        getAll()
            .then(data => {
                sendResponse(res, 200, { users: data })
            })
            .catch(e => {
                console.error(e)
                sendResponse(res, 500, { msg: "erreur dans le serveur" })
            })
    }
    //ajouter
    else if (url.toLowerCase() == "/users" && method == "POST") {
        let body = ""
        req.addListener("end", () => {
            try {
                body = JSON.parse(body)

            }
            catch (e) {
                return sendResponse(res, 400, { msg: "verifier que les donnes sont sous format JSON valide" })
            }
            let { id, nom, prenom, age } = body
            // verification des champs
            if (!id || !nom || !prenom || !age)
                return sendResponse(res, 400, { msg: "veuillez indiquer le id, nom, prenom et age" })

            // verifiez unicite de id
            getById(id)
                .then(async user => {
                    if (user)
                        return sendResponse(res, 400, { msg: "id deja existent", id })
                    let dataToSave = { id, nom, prenom, age }
                    await save(dataToSave)
                    sendResponse(res, 201, dataToSave)
                })
                .catch(e => {
                    console.error(e)
                    sendResponse(res, 500, { msg: "erreur dans le serveur" })
                })
        })
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
    }
    //delete
    else if (url.toLowerCase().startsWith("/users/") && method == "DELETE") {
        res.write("delete")
        res.end()
    }
    //UPDATE (global)
    else if (url.toLowerCase().startsWith("/users/") && method == "PUT") {
        res.write("update global")
        res.end()
    }
    //UPDATE (partiel)
    else if (url.toLowerCase().startsWith("/users/") && method == "PATCH") {
        res.write("update partiel")
        res.end()
    }
    else //404
    {
        res.write("404")
        res.end()
    }
})
server.listen(PORT, (err) => {
    if (err)
        return console.error("impossible de demarrer le serveur", err)
    console.log(`server started at ${PORT}`)

})

const sendResponse = (res, statusCode, data) => {
    res.statusCode = statusCode
    res.write(JSON.stringify(data, null, 3))
    res.end()
}