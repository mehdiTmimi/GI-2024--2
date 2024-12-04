const fs = require("fs")
const dbPath = "./db.json"

const save = (user) => {
    // on considere que l objet user est bien correcte
    return getAll().then(users => {
        users.push(user)
        return users
    })
        .then(tab => { return { users: tab } }) // du tableau vers object
        .then(users => {
            //console.log(users)
            let jsonData = JSON.stringify(users, null, 3)

            return fs.promises.writeFile(dbPath, jsonData)
        })
    // .then(users=>JSON.stringify(users,null,3))
    // .then(jsonData=>fs.promises.writeFile(dbPath,jsonData))
}

const getAll = () => {
    return fs.promises.readFile(dbPath)
        /* .then(data=>{
             data = data.toString()
             data = JSON.parse(data)
             return data.users
         }) */
        .then(data => data.toString())
        .then(data => JSON.parse(data))
        .then(data => data.users)
}
//save({ id: 11, nom: "rrrrrrr", prenom: "qqqq", age: 50 })
//   .then(() => console.log("inserted with success"))
//    .catch(e => console.error(e))
//getAll().then(users=>console.log(users)).catch(e=>console.error(e))
const getById = id => getAll().then(users => users.find(ele => ele.id == id))
//getById(5).then(user=>console.log(user)).catch(e=>console.error(e))
const deleteById = async (id) => {
    const user = await getById(id)
    if (!user)
        return false
    return getAll()
        //  .then(users=>users.filter(ele!=user)) // comparaison des addresses (pointeurs)
        .then(users => users.filter(ele => ele.id != id)) // comparaison des addresses (pointeurs)
        .then(async tab => {
            await fs.promises.writeFile(dbPath, JSON.stringify({ users: tab }, null, 3))
            return true
        })
}
//deleteById(10).then(res => console.log(res)).catch(e => console.error(e))
const update = async (user, id) => {
    const resultat = await getById(id)
    if (!resultat)
        return false
    return getAll()
        //  .then(users=>users.filter(ele!=user)) // comparaison des addresses (pointeurs)
        .then(users => {
            let positionUserToUpdate = users.findIndex(ele => ele.id == id)
            user.id = id // garantir la stabilite du id
            users[positionUserToUpdate] = user
            return JSON.stringify({ users }, null, 3)
        })
        .then(async jsonData => {
            await fs.promises.writeFile(dbPath, jsonData)
            return true
        })
    //  .then(jsonData=>fs.promises.writeFile(dbPath,jsonData))
    //   .then(()=>true)
}
/*update({ nom: "ok", prenom: "salut", age: 50 }, 1)
    .then((resultat) => {
        if (resultat) console.log("updated with success")
        else console.log("not found")
    })
    .catch(e => console.error(e))
    */
module.exports = {
    save, getAll, getById, deleteById, update
}