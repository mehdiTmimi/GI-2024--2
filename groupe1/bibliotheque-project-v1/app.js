// manual : la liste des livres => method = POST et path = /getAllBooks
// => protocol://domaine-name:PORT/path
const http = require("http")
const fs = require("fs")
const PORT = 3000

const server = http.createServer((req, res) => {
    const { url, method } = req // url = path
    //la liste des livres
    if (url.toLowerCase() == "/getallbooks" && method == "POST")
        fs.promises.readFile("./database.json")
            .then(data => {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                res.write(data.toString()) // mettre le contenu json dans le body du response
            })
            .catch(e => {
                console.error(e)
                res.statusCode = 500
                res.setHeader("Content-Type", "application/json")
                let msg = {
                    error: "sorry, problem on the server"
                }
                let msgJson = JSON.stringify(msg)
                res.write(msgJson)
            })
            .finally(() => res.end())
        else{
            res.statusCode = 404
            res.setHeader("Content-Type", "application/json")
            let msg = {
                error: "ressource introuvable"
                ,
                url : url
            }
            let msgJson = JSON.stringify(msg)
            res.write(msgJson)
            res.end()
        }
})
server.listen(PORT, () => console.log(`server started at ${PORT}`))
