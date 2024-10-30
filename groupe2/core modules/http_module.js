const http = require("http")
const fs = require("fs")
// va vous permettre de configurer votre serveur
// le callback va etre execute pour chaque requete recu
// res.write => rajoute du contenu au body de response
// res.end => renvoie la response au client
// res.statusCode => propriete en lecture et en ecriture pour specifier 
// le statut de votre response
// todo:
// path = / ou /index.html et la methode est GET => index.html
// path = /contact.php et la methode est GET => contact.html
// pour tout autre path et method => 404.html
const server = http.createServer((req,res)=>{
    
    console.log("request received !")
    console.log(req.method, req.url, req.socket.remoteAddress)
    res.statusCode = 404
    fs.promises.readFile("./site/index.html")
    .then(data=>data.toString())
    .then(data=>res.write(data))
    .catch(e=>{
        console.log(e)
        res.statusCode = 500
        res.write("erreur dans le serveur")
    })
    .finally(()=>res.end())
  
})
// http://localhost:3000

server.listen(3000,()=>{
    console.log("server started")
})