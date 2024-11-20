const http = require("http")
const fs = require("fs")
const { extractCookies } = require("./utils")
const PORT = 3000
const dbPath = "./data.txt"

const server = http.createServer(async (req, res) => {
    // query param => url : http://localhost:3000/path?clef1=valeur&clef2=valeur
    // add1
    const { url, method } = req
    if (url.startsWith("/add1?")) {
        let params = new URLSearchParams(url.split("?")[1])
        let age = params.get("age")
        let nom = params.get("nom")
        let prenom = params.get("prenom")
        try {
            await fs.promises.appendFile(dbPath, `${prenom} ${nom} ${age}\n`)
            sendSuccess(res)
        }
        catch (e) {
            console.error(e)
            sendError500(res)
        }

    }
    // path params => url : http://localhost:3000/add2/sarah/omari/40
    // add2
    else if (url.startsWith("/add2")) {
        let params = url.split("/")
        let age = params[4]
        let nom = params[3]
        let prenom = params[2]
        try {
            await fs.promises.appendFile(dbPath, `${prenom} ${nom} ${age}\n`)
            sendSuccess(res)
        }
        catch (e) {
            console.error(e)
            sendError500(res)
        }
    }
    // headers => url : http://localhost:3000/add3
    // data sera envoyes dans les headers
    // add3
    else if (url == "/add3") {
        let { age, nom, prenom } = req.headers
        try {
            await fs.promises.appendFile(dbPath, `${prenom} ${nom} ${age}\n`)
            sendSuccess(res)
        }
        catch (e) {
            console.error(e)
            sendError500(res)
        }
    }
    // cookies
    else if (url == "/add4") {

        let { age, nom, prenom } = extractCookies(req.headers.cookie)
        try {
            await fs.promises.appendFile(dbPath, `${prenom} ${nom} ${age}\n`)
            sendSuccess(res)
        }
        catch (e) {
            console.error(e)
            sendError500(res)
        }
    }
    // body de request
    else if (url == "/add5") {
        req.on("end", async () => {
            console.log("end reception", body)
            let { nom, prenom, age } = JSON.parse(body)
            try {
                await fs.promises.appendFile(dbPath, `${prenom} ${nom} ${age}\n`)
                sendSuccess(res)
            }
            catch (e) {
                console.error(e)
                sendError500(res)
            }
            res.end()
        })
        // body=> 1111111111111111122222222222222222222222333333333333333
        // event data : 11111111111111111 puis 222222222222222222222223333 puis 3333333333333
        let body = ""
        req.addListener("data", (chunk) => { // morceau / partie
            console.log("reception du chunk")
            body += chunk.toString()
        })


    }
    else {
        res.statusCode = 404
        res.write("ressource not found")
        res.end()
    }
})
server.listen(3000, (err) => {
    if (err)
        return console.error("impossible de demarrer le serveur", err)
    console.log(`server started at ${PORT}`)
})
const sendError500 = (res) => {
    res.statusCode = 500
    res.write("error dans le serveur")
    res.end()
}
const sendSuccess = (res) => {
    res.statusCode = 201
    res.write("inserted with success")
    res.end()
}