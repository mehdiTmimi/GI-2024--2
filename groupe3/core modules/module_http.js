const http = require("http")

const server = http.createServer(()=>{
    console.log("request received!")
})
server.listen(3000,()=>{
    console.log("server started !")
})