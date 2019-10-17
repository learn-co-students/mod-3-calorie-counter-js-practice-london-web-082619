
const API_ENDPOINT = 'http://localhost:3000/api/v1/';
const CALORIE_ENTRIES_URL = `${API_ENDPOINT}/calorie_entries`;

window.addEventListener("DOMContentLoaded", () => {
    console.log("API script loaded")
})

const API = {
    getCalories,
    postCalorie,
    destroyCalorie
}

function getCalories(){
    return fetch(CALORIE_ENTRIES_URL).then(resp => resp.json());
}

function postCalorie(configObject){
    return fetch(CALORIE_ENTRIES_URL, configObject).then(resp => resp.json());
}

function destroyCalorie(configObject, calorieID){
    let url = `${CALORIE_ENTRIES_URL}/${calorieID}`;
    return fetch(url, configObject).then(resp => resp.json());
}