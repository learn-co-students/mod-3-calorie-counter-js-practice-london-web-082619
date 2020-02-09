// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.

const CALORIE_FORM = document.getElementById("new-calorie-form");
let calorieSum = 0;

window.addEventListener("DOMContentLoaded", () => {
    console.log("Main script loaded");
    API.getCalories().then(renderCalorieList);
    CALORIE_FORM.addEventListener('submit', () => {
        addCalorieIntake(event);
    });
})

function renderCalorieList(calories){
    const calorieList = document.getElementById('calories-list');
    calorieList.innerText = "";
    calories.forEach(renderCalorieListItem);
}

function renderCalorieListItem(calorie){
    const calorieList = document.getElementById('calories-list');

    // Create new list item for a calorie entry
    let li = document.createElement('li');
    li.className = "calories-list-item";
    calorieList.prepend(li);

    // Create the details and buttons divs
    let detailsDiv = document.createElement('div');
    detailsDiv.className = "uk-grid";
    let buttonsDiv = document.createElement('div');
    buttonsDiv.className = "list-item-menu";
    li.append(detailsDiv, buttonsDiv);

    // For the details div...
    let caloriesDiv = document.createElement('div');
    caloriesDiv.className = "uk-width-1-6";
    let strong = document.createElement('strong');
    strong.innerText = calorie.calorie;
    let span = document.createElement('span');
    span.innerText = "kcal";
    caloriesDiv.append(strong, span);

    let textDiv = document.createElement('div')
    textDiv.className = "uk-width-4-5";
    let detailsEm = document.createElement('em');
    detailsEm.className = "uk-text-meta";
    detailsEm.innerText = calorie.note;
    textDiv.append(detailsEm);

    detailsDiv.append(caloriesDiv, textDiv)

    // For the buttons div...
    let editButton = document.createElement('a');
    editButton.className = "edit-button";
    editButton.setAttribute('uk-icon', "icon: pencil");
    editButton.setAttribute('uk-toggle', "target: #edit-form-container");
    
    let deleteButton = document.createElement('a');
    deleteButton.className = "delete-button";
    deleteButton.setAttribute('uk-icon', 'icon: trash');
    deleteButton.addEventListener('click', () => {
        removeCalorie(event, calorie);
    })
    
    buttonsDiv.append(editButton, deleteButton);

    updateProgressBar(calorie);
}

// Add a new calorie record
function addCalorieIntake(event){
    event.preventDefault();

    let calorieData = {
        calorie: event.target.querySelector(".uk-margin-small > input").value,
        note: event.target.querySelector(".uk-margin-small > textarea").value,
        created_at: new Date(),
        updated_at: new Date()
    }

    let configObject = generateConfigObject("POST", calorieData)

    API.postCalorie(configObject).then(renderCalorieListItem);
}

function removeCalorie(event, calorie){
    event.preventDefault();

    let calorieData = {
        id: calorie.id
    }

    let configObject = generateConfigObject("DELETE", calorieData)

    API.destroyCalorie(configObject, calorie.id).then(calorie => removeCalorieLi(calorie, event))
}



// Update progress bar
function updateProgressBar(calorie){
    const progressBar = document.querySelector('#bmr-calculation-result > progress');
    calorieSum += calorie.calorie;
    progressBar.value = calorieSum;
}

function removeCalorieLi(calorie, event) {
    let calorieListItem = event.target.parentElement.parentElement.parentElement;
    calorieListItem.remove();
    alert(`You have removed ${calorie.note} from your calorie intake`);
}

function generateConfigObject(httpMethod, data){
    return {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json" },
        body: JSON.stringify(data)
    }
}

