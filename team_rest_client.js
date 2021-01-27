const axios = require('axios');

function afficheInfos(element){
    console.log(` - Name : ${element.name};`);
    console.log(` - Country : ${element.country};`);
    console.log(` - Type : ${element.type};`);
    console.log(` - Captain : ${element.captain};`);

    let players = element.players;
    if (Array.isArray(players) && players.length){
        console.log(" - Players : ")
        players.forEach(player => {
            if(player){
                if(player.player){
                    console.log(`   * Name : ${player.player.name};`);
                    console.log(`   * Age : ${player.player.age};`);
                    console.log(`   * Citizenship : ${player.player.citizenship};`);
                }
                console.log(`   * Position : ${player.position};`);
                console.log(" ");
            }
        })
    } else {
        console.log("Cette équipe n'a pas de joueurs enregistrés pour l'instant.");
    }
}

//Requête GET pour récupérer toutes les équipes
const getAllTeams = async() => {
    try{
        const resp1 = await axios.get('http://localhost:9090/teams');

        console.log("*Requête GET pour récupérer toutes les équipes*");

        console.log(`   ${resp1.data.length} teams found : `);

        resp1.data.forEach(element => {
            afficheInfos(element)
            console.log(" ")
        });
    } catch (err) {
        console.error(err);
    }
};


//Requête GET pour récupérer l'équipe d'id 1
const getOneTeam = async() => {
    try{
        const resp2 = await axios.get('http://localhost:9090/teams/1');

        console.log("*Requête GET pour récupérer l'équipe d'id 1*");

        let element = resp2.data;
        afficheInfos(element)
        console.log(" ")

    } catch (err) {
        console.error(err);
    }
}

//Requête PUT pour modifier le nom de l'équipe et du capitaine de l'équipe d'id 1
let modifiedTeam = {
    name: "PSG",
    country: "France",
    type: "Club",
    captain: "ASSONTIA",
    players: [
        {
            id: 1,
            player: {
                id: 1,
                name: "Neymar Jr",
                age: 28,
                citizenship: "Brazillian"
            },
            position: "Ailier gauche"
        }
    ]
};

const putReq = async() => {
    try{
        const resp3 = await axios.put('http://localhost:9090/teams/1', modifiedTeam);
    
        console.log("*Requête PUT pour modifier le nom de l'équipe et du capitaine de l'équipe d'id 1*");
        
        let element = resp3.data;
        afficheInfos(element)
        console.log(" ")
    } catch (err) {
        console.error(err);
    }
};

//Requête POST pour ajouter une équipe
let newTeam = {
    name: "Real de Madrid Club de Fútbol",
    country: "Espagne",
    type: "Club",
    captain: "Sergio Ramos",
    players: [
        {
            player: {
                name: "Sergio Ramos",
                age: 34,
                citizenship: "Spanish"
            },
            position: "Défenseur"
        }
        
    ]
};

const postReq = async() => {
    try{
        const resp4 = await axios.post('http://localhost:9090/teams', newTeam);

        console.log("*Requête POST pour ajouter une équipe*");

        axios.get('http://localhost:9090/teams')
        .then((response) => {

            response.data.forEach(element => {
                if(element.name == "Real de Madrid Club de Fútbol"){
                    afficheInfos(element)
                    console.log(" ")
                }
            });
        })
    } catch (err) {
        console.error(err);
    }
};

//Requête DELETE pour supprimer l'équipe de l'Argentine (l'équipe d'id 2)
const delReq = async() => {
    try{
        const resp5 = await axios.delete('http://localhost:9090/teams/2');

        axios.get('http://localhost:9090/teams')
        .then((response) => {

            let deleted = true;

            response.data.forEach(element => {
                if(element.name == "La Albiceleste"){
                    deleted = false;
                }
            });

            console.log("*Requête DEL pour supprimer une équipe*");

            if (deleted){
                console.log("L'équipe a été supprimée.");
            } else {
                console.log("L'équipe n'a pas été supprimée.");
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
            getAllTeams();
            break;
        case 1:
            getOneTeam();
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