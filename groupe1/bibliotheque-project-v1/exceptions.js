const diviser = async (nbr1,nbr2)=>{
    if(nbr2 == 0)
        throw {error:"impossible de divider par zero"}
    return nbr1 / nbr2
}
const main = ()=>{
    diviser(4,4)
    .then(data=>data+1)
    .then(data=>{
        throw("error omar")
        console.log(data) // 2
        data = data +5
        return data
    })
    .then(data=>console.log("fiiiin",data))
    .catch(e=>console.log(e))
    
    setTimeout(()=>{ console.log("fin main")},1000)
}
main()