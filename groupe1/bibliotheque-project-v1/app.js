// manual : la liste des livres => method = POST et path = /getAllBooks
// ajout d'un livre :
// first: on va utiliser les headers => method = GET et path = /add1
// => protocol://domaine-name:PORT/path
const http = require("http")
const fs = require("fs")
const PORT = 3000

const server = http.createServer((req, res) => {
    
    const { url, method } = req // url = path
    // ajout d'un livre : first => headers
    if (method == "GET" && url.toLowerCase() == "/add1") {
        let { ref, author, date, name } = req.headers // recupere les infos envoyees dans le header
        if (!(ref && author && date && name)) { //!ref || !author || !date || !name
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify({ error: "all fields are required" }))
            return res.end()
        }
        let book = { ref, name, author, date } // creer l objet book a inserer apres
        /*
        example:
        object book = {ref: 'CX13', author: 'mehdi', date: 1222, name: 'oook'}
        */
        fs.promises.readFile("./database.json")
            .then(data => data.toString())//buffer vers String
            .then(data => JSON.parse(data))//String(JSON) vers Object
            .then(data => {
                // verifier est ce que le book existe deja => recherche par ref
                let resultat = data.books.find(ele => ele.ref == book.ref) // => retourne soit 
                // undefined soit le book trouve
                if (resultat) {// si trouve => if(resultat!=undefined)
                    res.statusCode = 400
                    res.setHeader("Content-Type", "application/json")
                    res.write(JSON.stringify({
                        error: "book already exist",
                        ref: resultat.ref // book.ref
                    }))
                    res.end()
                    // je jete une exception 
                    // pk ? pour quitter ce then et les prochains then
                    // {error:"customError"} => poru differencier mon error du error du nodejs
                    throw {error:"customError"}
                }
                data.books.push(book)
                return data // contient une propriete books qui contient maintenant l ancience liste + le book insere
            })
            .then(data => JSON.stringify(data,null,3))// object to JSON string
            .then(data => fs.promises.writeFile("./database.json", data))
            .then(() => {
                res.statusCode = 201
                res.write(JSON.stringify({msg:"book inserted successfully !", book}))
                res.end()
            })
            .catch(e => {
                let {error}= e
                if(error=="customError")
                    return
                console.error(e)
                res.statusCode = 500
                res.setHeader("Content-Type", "application/json")
                res.write({
                    error: "sorry, problem on the server"
                })
                res.end()
            })
    }
    //la liste des livres
    else if (url.toLowerCase() == "/getallbooks" && method == "POST")
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
    else {
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        let msg = {
            error: "ressource introuvable"
            ,
            url: url
        }
        let msgJson = JSON.stringify(msg)
        res.write(msgJson)
        res.end()
    }
})
server.listen(PORT, () => console.log(`server started at ${PORT}`))
