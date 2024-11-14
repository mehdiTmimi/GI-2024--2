const http = require("http")
const PORT1 = 3000

const server = http.createServer((req, res) => {
    const { url, method } = req
    if (method == "GET" && url == "/es") {
        res.write("list users")
        return res.end()
    }
    // http://localhost:3000/a/cd123 , http://localhost:3000/a/oook
    if ((method == "POST" || method == "PUT") && url.startsWith("/a/")) {
        let id = url.split("/")[2]
        res.write(`user id : ${id}`)
        return res.end()
    }
    res.statusCode = 404
    //res.setHeader("Content-Type","text/html")
    //res.write(`<h1 style="color:red"> 404 not found</h1>`)
    let msgToSend = {
        msg: "contenu introuvable",
        path: url
    }
    res.setHeader("Content-Type","application/json")
    res.write(JSON.stringify(msgToSend))
    res.end()
})


server.listen(PORT1, () => console.log(`server1 started at ${PORT1}`))
