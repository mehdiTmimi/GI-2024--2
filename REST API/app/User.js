class User{
    constructor(id, nom, prenom, age){
        this.id = id
        this.nom = nom
        this.prenom = prenom
        this.age = age
    }
    toJson(){
        return JSON.stringify(this,null,3)
    }
}
module.exports = User
//let user = new User(1,"tmimi","mehdi",32)
//console.log(user.toJson())