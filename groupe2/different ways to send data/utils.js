const fs = require("fs")
const bdPath = "./data.txt"
const insertDataBd = (number, racine) => {
    return fs.promises.appendFile(bdPath, `${number} ${racine}\n`)
}
//insertDataBd(12,3).then(()=>console.log("insertion reussi")).catch(e=>console.error(e))
const send500Error = (response) => {
    response.statusCode = 500
    response.write("internal server error")
    response.end()
}
const send200Success = (response) => {
    response.statusCode = 200
    response.write("donnees inserees avec succes")
    response.end()
}
const extractCookies = (ch) => {
    let keyValuePairs = ch.split(";")
    let obj = {}
    keyValuePairs.forEach(val => {
        let tab = val.split("=")
        let key = tab[0].trim()
        let val = tab[1].trim()
        obj[key] = val
    })
    return obj
}
module.exports = {
    insertDataBd, send200Success, send500Error, extractCookies
}