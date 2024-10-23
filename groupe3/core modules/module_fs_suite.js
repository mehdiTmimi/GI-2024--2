const fs = require("fs")
let ch = "Salam ESTF"
try{
    fs.writeFileSync("./data1.txt",ch)
    console.log("fs.writeFileSync, write success")
}catch(e)
{
    console.log(e)
}
fs.writeFile("./data2.txt",ch,err=>{
    if(err)
       return console.log(err)
    console.log("fs.writeFile, write success")
})
fs.promises.writeFile("./data3.txt",ch)
.then(()=>console.log("promises, write success"))
.catch(err=>console.log(err))