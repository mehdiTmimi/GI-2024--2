const fs = require("fs")

try{
    fs.writeFileSync("./data1.txt","write file sync")
    console.log("success write file sync")
}
catch(e)
{
    console.error(e)
}
fs.writeFile("./data3.txt","write file async",err=>{
    if(err)
        return console.error(err)
    console.log("success write file async")
})
fs.promises.writeFile("./data2.txt","write file promise")
.then(()=>console.log("success write file promises"))
.catch(e=>console.error(e))