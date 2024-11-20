const extractCookies = (ch)=>{
    let keyValuePairs = ch.split(";")
    let obj = {}
    keyValuePairs.forEach(val=>{
        let tab = val.split("=")
        obj[tab[0].trim()]=tab[1].trim()
    })
    return obj
}
module.exports = {extractCookies}