adapter.getEntries()
  .then(entries => renderEntries(entries))
  .catch(console.error);

const renderEntries = entries => {
  entries.forEach(entry => renderEntry(entry));
}

const renderEntry = entry => {
  const caloriesList = document.querySelector("#calories-list");
  const listItem = document.createElement("li")
  listItem.dataset.entryId = entry.id;
  listItem.className = "calories-list-item"
  listItem.innerHTML = `
    <div class="uk-grid">
      <div class="uk-width-1-6">
        <strong class="calorie-count">${entry.calorie}</strong>
        <span>kcal</span>
      </div>
      <div class="uk-width-4-5">
        <em class="uk-text-meta note">${entry.note}</em>
      </div>
    </div>
  `
  const buttons = createListItemButtons(entry);
  listItem.append(buttons);
  caloriesList.prepend(listItem);
}

const createListItemButtons = entry => {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "list-item-menu";
  buttonContainer.append(createListItemEditButton(entry));
  buttonContainer.append(createListItemDeleteButton(entry));
  return buttonContainer;
}

const createListItemEditButton = entry => {
  const div = document.createElement("div");
  div.innerHTML = `<a class="edit-button uk-icon" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>`
  const editButton = div.firstChild;
  editButton.addEventListener("click", () => editEntry(entry));
  return editButton;
}

const createListItemDeleteButton = (entry) => {
  const div = document.createElement("div");
  div.innerHTML = `<a class="delete-button" uk-icon="icon: trash"></a>`
  const deleteButton = div.firstChild;
  deleteButton.addEventListener("click", () => deleteEntry(entry));
  return deleteButton;
}


const newEntryForm = document.querySelector("#new-entry-form");
newEntryForm.addEventListener("submit", (event) => addNewEntry(event))

const addNewEntry = (event) => {
  event.preventDefault();
  const newCalories = document.querySelector("#new-calories").value;
  const newNote = document.querySelector("#new-note").value;
  if (newCalories !== "" && newNote !== "") {
    adapter.postEntry({
      calorie: newCalories,
      note: newNote
    }).then(entry => {
      renderEntry(entry);
      bmr.setProgressValue();
    });
  } else {
    alert("Both fields are required.");
  }
  event.target.reset();
}


const editEntry = (entry) => {
  const calorieField = document.querySelector("#calorie-field");
  calorieField.value = entry.calorie;
  const notesField = document.querySelector("#notes-field");
  notesField.value = entry.note;
  const editForm = document.querySelector("#edit-entry-form")
  editForm.addEventListener("submit", (event) => 
    submitEdits(event, entry)
  );
}

const submitEdits = (event, entry) => {
  event.preventDefault();
  const modal = document.querySelector("#edit-form-container");
  UIkit.modal(modal).hide();
  const calories = document.querySelector("#calorie-field").value;
  const note = document.querySelector("#notes-field").value;
  adapter.patchEntry(entry.id, {
    calorie: calories,
    note: note
  }).then(updatedEntry => rerenderEntry(updatedEntry));
  event.target.reset();
}

const rerenderEntry = (entry) => {
  const calorieCount = document.querySelector(`li[data-entry-id="${entry.id}"] .calorie-count`)
  const note = document.querySelector(`li[data-entry-id="${entry.id}"] .note`)
  calorieCount.textContent = entry.calorie;
  note.textContent = entry.note;
}


const deleteEntry = (entry) => {
  const listItem = document.querySelector(`li[data-entry-id="${entry.id}"]`)
  adapter.destroyEntry(entry.id)
    .then(() => {
      listItem.remove();
      //bmr.setProgressValue();
    })
    .catch(console.error);
}