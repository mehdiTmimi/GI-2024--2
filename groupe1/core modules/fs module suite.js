const fs = require("fs")
try {
    fs.writeFileSync("./data1.txt", "write file sync")
    console.log("write sync success")
}
catch (e) {
    console.error(e)
}

fs.writeFile("./data2.txt", "write file aaaaaasync", (err) => {
    if (err)
        return console.error(err)
    console.log("write success async")
})

fs.promises.writeFile("./data3.txt", "write file promises aaaaaasync")
    .then(() => console.log("write success async promises"))
    .catch(e => console.error(e))

const main = async () => {
    try {
        await fs.promises.writeFile("./data4.txt", "write file promises ssssync")
        console.log("write success ssssssync promises")
    }
    catch(e){
        console.error(e)
    }
}
main()