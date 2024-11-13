const http = require("http")
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
    else if(method=="PUT" && url.startsWith("/n?")){ // /n?ok=10&number=20
        let params = new URLSearchParams(url.split("?")[1])
        let number = params.get('number')
        res.write("number est")
        res.write(number)
        res.end()
    }   
    else {
        res.write("404")
        res.end()
    }
})
// demmarage
server.listen(PORT, () => console.log(`Server started at ${PORT}`))