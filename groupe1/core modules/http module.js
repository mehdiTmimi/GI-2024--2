const http = require("http")
const PORT = 3000
// Config
// le callback sera execute a chaque requete recu 
const server = http.createServer((req,res)=>{
    
    console.log("sequest received !")
    console.log("method ", req.method)
    console.log("url ", req.url)
    console.log("ip address client ", req.socket.remoteAddress)
    console.log("header omar ", req.headers.omar)

    res.statusCode = 404
    // remplir le body de response
    res.write("<html> ")
    res.write("<body> ")
    res.write(`<h1 style="color:blue"> salut <h1>`)
    res.write("</body> ")
    res.write("</html> ")
    
    // envoyer la response au client
    res.end()
})
// demmarage du serveur
server.listen(PORT,()=>{
   // console.log(`server started at ${PORT}`)
    console.log("server started at ", PORT)
})