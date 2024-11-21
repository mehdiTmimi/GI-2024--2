const http = require("http")
const PORT = 3000
const { insertDataBd, send200Success, send500Error, extractCookies } = require("./utils.js")
const server = http.createServer((req, res) => {

    let { url } = req // let url = req.url
    // premiere maniere en utilisant query param:
    // url : /add1?.....
    if (url.startsWith("/add1?")) {
        let params = new URLSearchParams(url.split("?")[1])
        let number = params.get('number')
        let racine = params.get('racine')
        insertDataBd(number,racine)
        .then(()=>send200Success(res))
        .catch(()=>send500Error(res))
    }
     // deuxieme maniere en utilisant path param:
    // url : /add2/number/racine => /add2/9/3
    else  if (url.startsWith("/add2/")) {
        let params = url.split("/")
        let number = params[2]
        let racine = params[3]
        insertDataBd(number,racine)
        .then(()=>send200Success(res))
        .catch(()=>send500Error(res))
    }
    // troisieme maniere en utilisant headers:
    // url : /add3
    else if (url=="/add3") {
        let {number,racine} = req.headers
        insertDataBd(number,racine)
        .then(()=>send200Success(res))
        .catch(()=>send500Error(res))
    }
    // 4eme maniere en utilisant les cookies:
    // url : /add4
    else if (url=="/add4") {
        let {number, racine} = extractCookies(req.headers.cookie)
        insertDataBd(number,racine)
        .then(()=>send200Success(res))
        .catch(()=>send500Error(res))
    }
    else {
        res.statusCode = 404
        res.end()
    }
})
server.listen(PORT, (err) => {
    if (err)
        return console.error("impossible de demarrer le serveur", err)
    console.log(`server started at ${PORT}`)
})
