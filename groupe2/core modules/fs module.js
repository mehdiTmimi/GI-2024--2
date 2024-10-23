const fs = require("fs")

try{
    let data = fs.readFileSync("./data.txt").toString()
    console.log("fs.readFileSync",data)
}
catch(e)
{
    console.error(e)
}

fs.readFile("./data.txt",(err,data)=>{
    if(err!=null)
        return console.error(err)
    console.log("fs.readFile",data.toString())
})

fs.promises.readFile("./data.txt")
.then(data=>data.toString())
.then(data=>console.log("read promise ",data))
.catch(e=>console.error(e))