const http = require("http")
const fs = require("fs")
const PORT1 = 3000

const server = http.createServer((req, res) => {
    const { url, method } = req
    if (method == "GET" && url == "/es") {
        return fs.promises.readFile("./database.json")
            .then(data => {
                res.setHeader("Content-Type", "application/json")
                /*let obj = JSON.parse(data)
                let { books } = obj; // let books = obj.books*/
                let { books } = JSON.parse(data)
                res.write(JSON.stringify(books))
                res.end()
            })
            .catch(e => {
                console.log(e)
                send500Response(res)
            })
    }
    // path parameters : path params
    // exemple http://localhost:3000/ajouteretudiant/mehdi/tmimi/32
    // http://localhost:3000/a/cd123 , http://localhost:3000/a/oook
    if ((method == "POST" || method == "PUT") && url.startsWith("/a/")) {
        let id = url.split("/")[2]
        return fs.promises.readFile("./database.json")
            .then(data => {
                data = JSON.parse(data.toString())
                return data.books
            })
            .then(tab => tab.find(ele => ele.ref == id))
            .then(resultat => {
                if (resultat) // resultat != undefined
                {
                    res.statusCode = 200
                    res.setHeader("Content-Type", "application/json")
                    res.write(JSON.stringify(resultat))
                    res.end()
                }
                else {
                    res.statusCode = 404
                    res.setHeader("Content-Type", "application/json")
                    res.write(JSON.stringify({
                        msg: "book introuvable",
                        ref: id
                    }))
                    res.end()
                }
            }).catch(e => {
                console.log(e)
                send500Response(res)
            })

    }
    
    if(url.startsWith("/rem?")){
        
    }
    res.statusCode = 404
    //res.setHeader("Content-Type","text/html")
    //res.write(`<h1 style="color:red"> 404 not found</h1>`)
    let msgToSend = {
        msg: "contenu introuvable",
        path: url
    }
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify(msgToSend))
    res.end()
})
const send500Response = (res) => {
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify({
        msg: "problem in the server"
    }))
    res.end()
}

server.listen(PORT1, () => console.log(`server1 started at ${PORT1}`))
