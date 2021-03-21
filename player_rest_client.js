const axios = require('axios');

function afficheInfos(element) {
    console.log(` - Name : ${element.name};`);
    console.log(` - Age : ${element.age};`);
    console.log(` - Citizenship : ${element.citizenship};`);

    let teams = element.teams;
    if (Array.isArray(teams) && teams.length){
        console.log(" - teams : ")
        teams.forEach(team => {
            if(team){
                if(team.team){
                    console.log(`   * Name : ${team.team.name};`);
                    console.log(`   * Country : ${team.team.country};`);
                    console.log(`   * Type : ${team.team.type};`);
                    console.log(`   * Captain : ${team.team.captain};`);
                }
                console.log(`   * Position : ${team.position};`);
            }
        })
    }
}

//Requête GET pour récupérer toutes les équipes
const getAllPlayers = async() => {
    try{
        const resp1 = await axios.get('http://localhost:9090/players');

        console.log("*Requête GET pour récupérer tous les  joueurs*");

        console.log(`   ${resp1.data.length} players found : `);

        resp1.data.forEach(element => {
            afficheInfos(element);
            console.log(" ");
        });
    } catch (err) {
        console.error(err);
    }
};

//Requête GET pour récupérer le joueur d'id 1
const getOnePlayer = async() => {
    try{
        const resp2 = await axios.get('http://localhost:9090/players/1');

        console.log("*Requête GET pour récupérer le joueur d'id 1*");

        let element = resp2.data;
        afficheInfos(element)
        console.log(" ")

    } catch (err) {
        console.error(err);
    }
}

//Requête PUT pour modifier le nom, l'age et la nationalité du joueur d'id 1
let modifiedPlayer = {
    name: "Loïc ASSONTIA",
    age: 22,
    citizenship: "Ukrainian"
}

const putReq = async() => {
    try{
        const resp3 = await axios.put('http://localhost:9090/players/1', modifiedPlayer);
    
        console.log("*Requête PUT pour modifier le nom, l'age et la nationalité du joueur d'id 1*");
        
        let element = resp3.data;
        afficheInfos(element)
        console.log(" ")
    } catch (err) {
        console.error(err);
    }
}

//Requête POST pour ajouter un joueur
let newPlayer = {
    name: "Loïc ASSONTIA",
    age: 22,
    citizenship: "Camerounian"
}

const postReq = async() => {
    try{
        const resp4 = await axios.post('http://localhost:9090/players', newPlayer);

        console.log("*Requête POST pour ajouter une équipe*");

        axios.get('http://localhost:9090/players')
        .then((response) => {

            response.data.forEach(element => {
                if(element.name == "Loïc ASSONTIA"){
                    afficheInfos(element)
                    console.log(" ")
                }
            });
        })
    } catch (err) {
        console.error(err);
    }
};

//Requête DELETE pour supprimer le joueur d'id 2
const delReq = async() => {
    try{
        const resp5 = await axios.delete('http://localhost:9090/players/2');

        axios.get('http://localhost:9090/players')
        .then((response) => {

            let deleted = true;

            response.data.forEach(element => {
                if(element.name == "Lionel Messi"){
                    deleted = false;
                }
            });

            console.log("*Requête DEL pour supprimer un joueur*");

            if (deleted){
                console.log("Le joueur a été supprimé.");
            } else {
                console.log("Le joueur n'a pas été supprimé.");
            }
            console.log(" ")
        })        
    } catch (err) {
        console.error(err);
    }
};

for(let i = 0; i<5; i++){
    switch(i){
        case 0:
            getAllPlayers();
            break;
        case 1:
            getOnePlayer();
            break;
        case 2:
            putReq();
            break;
        case 3:
            postReq();
            break;
        case 4:
            delReq();
            break;
    }
}