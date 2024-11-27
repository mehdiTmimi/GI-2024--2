const http = require("http")
const User = require("./User.js")
const { deleteById, getAll, getById, save, update } = require("./persistence.js")
const PORT = 3000

const server = http.createServer((req, res) => {
    const { url, method } = req
    //getall with or without criteria (limit)
    if (url.toLowerCase().startsWith("/users") && method == "GET") {

    }
    //get one single user
    else if (url.toLowerCase().startsWith("/users/") && method == "GET") {

    }
    //ajouter
    else if (url.toLowerCase() == "/users" && method == "POST") {

    }
    //delete
    else if (url.toLowerCase().startsWith("/users/") && method == "DELETE") {

    }
    //UPDATE (global)
    else if (url.toLowerCase().startsWith("/users/") && method == "PUT") {

    }
    //UPDATE (partiel)
    else if (url.toLowerCase().startsWith("/users/") && method == "PATCH") {

    }
    else //404
    {

    }
})
server.listen(PORT, (err) => {
    if (err)
        return console.error("impossible de demarrer le serveur", err)
    console.log(`server started at ${PORT}`)

})