const fs = require("fs")
const path = "./data.txt"
fs.readFile(path, (err, data) => {
    if (err == null)
        console.log("fs.readFile", data.toString())
    else
        console.error("flag", err)
})

try {
    let data = fs.readFileSync(path)
    data = data.toString()
    console.log("fs.readFileSync", data)
}
catch (e) {
    console.log(e)
}


fs.promises.readFile(path)
.then(data=>data.toString())
.then(data=>console.log("fs promises async read file",data))
.catch(e=>console.error(e))
console.log("end")

let main = async ()=>{
    try{
        let data =await fs.promises.readFile(path)
        data=data.toString()
        console.log("fs readFile promises sync", data)
    }
    catch (e) {
        console.log(e)
    }
}
main()


