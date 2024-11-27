const City = require("./city.js")
const fs = require("fs")
const PATH = "./data.txt"
const insertCity =  (city)=> fs.promises.appendFile(PATH,city.toString());
//let city = new City("fez","morocco","afrique")
//insertCity(city).then(()=>console.log("success")).catch(e=>console.error(e,"echec"))
const sendHttp201 = (res)=>{
    res.statusCode = 201
    res.write("inserted")
    res.end()
}
const sendHttp500 = (res)=>{
    res.statusCode = 500
    res.write("server error")
    res.end()
}
const sendHttp404 = (res)=>{
    res.statusCode = 404
    res.write("not found !")
    res.end()
}
module.exports = {sendHttp201, sendHttp404, sendHttp500, insertCity}