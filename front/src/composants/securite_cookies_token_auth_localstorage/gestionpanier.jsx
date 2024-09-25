
//local storage du panier ON peut enregister des donner sous forme de string 
function saveuser(user){
    localStorage.setItem('user',JSON.stringify(user)) //transforme un object en chaine de caract 
    }
    function getuser(){
        let user = localStorage.getItem("user");
         if(user==null){
             return [];
         }else{
             return JSON.parse(user); //transformer la chaine en object
         } 
     }
function saveTickets(tickets){
localStorage.setItem('tickets',JSON.stringify(tickets)) //transforme un object en chaine de caract 
}

function getTickets(){
   let tickets = localStorage.getItem("tickets");
    if(tickets==null){
        return [];
    }else{
        return JSON.parse(tickets); //transformer la chaine en object
    } 
}
function addTickets(billet){
 let tickets = getTickets();
 let foundTickets = tickets.find( p=> p.id == billet.id) //trouver si ya desja le produit dans la panier 

 if(foundTickets != undefined){
    foundTickets.quantity++; 
}else{
    billet.quantity = 1 ;
     tickets.push(billet);
}

 saveTickets(tickets)
}

//retirer un produit du panier 

function remove(billets){

    let tickets = getTickets();
    tickets = tickets.filter(p=>p.id != billets.id )
    saveTickets(tickets)
}

//retirer de la quantité 

function changeQuantity(tickets,quantity){

    let ticket = getTickets();
    let foundTickets = ticket.find( p=> p.id == tickets.id) //trouver si ya desja le produit dans la panier 
   
    if(foundTickets != undefined){
       foundTickets.quantity += quantity; 
       if(foundTickets.quantity <= 0){
        remove(foundTickets);
       }else{

        saveTickets(tickets)
       }
   }
   
    
}

function getNumberTickerts(){
    let tickets = getTickets();
    let number = 0;

    for(let billet of tickets){
        number += billet.quantity;
    }
    return number;
}

function getTotalPrice(){

    let tickets = getTickets();
    let total = 0;

    for(let billet of tickets){
        total += billet.quantity* billet.prix;
    }
    return total;
}

export{saveTickets,getNumberTickerts,getTickets,addTickets,remove,changeQuantity,getTotalPrice,saveuser,getuser}