const http = require("http")
const User = require("./User.js")
const { deleteById, getAll, getById, save, update } = require("./persistence.js")
const PORT = 3000

const server = http.createServer(async (req, res) => {
    const { url, method } = req
    console.log(url,method)
    
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type" )
    res.setHeader("Access-Control-Allow-Methods","OPTIONS, GET, DELETE, POST, PUT")
    if(req.method=="OPTIONS"){
        console.log("ok")
        res.writeHead(200)
       return res.end()
    }
   // res.setHeader("Access-Control-Allow-Origin","http://localhost:5500")
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
    // /users?limit=10&page=3
    // retournes les 10 users apres les 30 premier
    else if (url.toLowerCase().startsWith("/users") && method == "GET") {
        // on supporte limit et page
        let params = new URLSearchParams(url.split("?")[1])
        let limit = parseInt(params.get("limit")) || -1
        let start = parseInt(params.get("start")) || 0
        if (start < 0)
            start = 0
        console.log(start,limit)
        getAll()
            .then(data => {
                if (limit != -1)
                    data = data.slice(start, limit+start)
                else
                    data = data.slice(start)
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
        let id = url.split("/")[2]
        try {
            let resultat = await deleteById(id)
            if (!resultat)
                return sendResponse(res, 404, { msg: "user can t be delete, user not found", id })
            sendResponse(res, 200, { msg: "user deleted" })
        }
        catch (e) {
            console.error(e)
            return sendResponse(res, 500, { msg: "erreur dans le serveur" })
        }
    }
    //UPDATE (global)
    else if (url.toLowerCase().startsWith("/users/") && method == "PUT") {
        let idToUpdate = url.split("/")[2]
        let body = ""
        req.addListener("end", () => {
            try {
                body = JSON.parse(body)

            }
            catch (e) {
                return sendResponse(res, 400, { msg: "verifier que les donnes sont sous format JSON valide" })
            }
            let { nom, prenom, age } = body
            // verification des champs
            if (!nom || !prenom || !age)
                return sendResponse(res, 400, { msg: "veuillez indiquer le id, nom, prenom et age" })

            update({ nom, prenom, age }, idToUpdate).then(async resultat => {
                if (resultat)
                    return sendResponse(res, 200, { msg: "user updated", id: idToUpdate })
                sendResponse(res, 404, { msg: "user not found", id: idToUpdate })
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