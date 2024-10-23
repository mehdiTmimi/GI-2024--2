const fs = require("fs")
try{
    let data = fs.readFileSync("./data.json")
    console.log("fs.readFileSync",data.toString())
}catch(e)
{
    console.log(e)
}
fs.readFile("./data.json",(err,data)=>{
    if(err) // error n est pas null => y a erreur
        console.log(err)
    else
        console.log("fs.readFile",data.toString())
})
fs.promises.readFile("./data.json")
.then(data=>console.log("fs.promises.readFile",data.toString()))
.catch(e=>console.log(e))