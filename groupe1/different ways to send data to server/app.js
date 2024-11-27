const http = require("http")
const PORT = 3000
const { insertCity, sendHttp201, sendHttp500, sendHttp404 } = require("./utils.js")
const City = require("./city.js")

const server = http.createServer(function (req, res) {

    const { url, method } = req
    // insertion with path params
    // pour method = GET and url sous forme de : /add1/fes/maroc/afrique
    if (method == "GET" && url.startsWith("/add1/")) {
        const params = url.split("/")
        const ville = params[2]
        const country = params[3]
        const continent = params[4]
        insertCity(new City(ville, country, continent))
            .then(() => sendHttp201(res))
            .catch(e => {
                console.error(e)
                sendHttp500(res)
            })
    }
    // insertion with query param
    // pour method = GET and url sous forme de : /add2?city=fez&contient=afrique&country=maroc
    else if (method == "GET" && url.startsWith("/add2?")) {
        let params = new URLSearchParams(url.split("?")[1])
        const ville = params.get("city")
        const country = params.get("country")
        const continent = params.get("continent")
        insertCity(new City(ville, country, continent))
            .then(() => sendHttp201(res))
            .catch(e => {
                console.error(e)
                sendHttp500(res)
            })
    }
    // insertion with http headers
    // pour method = GET and url sous forme de : /add3
    // data sera envoyee dans les https headers
    else if (method == "GET" && url == "/add3") {
        const {city,country,continent}  = req.headers
        insertCity(new City(city, country, continent))
        .then(() => sendHttp201(res))
        .catch(e => {
            console.error(e)
            sendHttp500(res)
        })
    }
    // configurer le 404
    else {
        sendHttp404(res)
    }

})
server.listen(PORT, function (err) {
    if (err)
        return console.error("impossible de demarrer le serveur", err)
    console.log(`Server started at ${PORT}`)
})