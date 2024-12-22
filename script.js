const logEntries = document.getElementById('log-entries');
const newLogEntry = document.getElementById('new-log-entry');
const addLogButton = document.getElementById('add-log');

function addLogMessage(message) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLi = document.createElement('li');
    newLi.textContent = `${timestamp} - ${message}`;
    logEntries.appendChild(newLi);
    logEntries.scrollTop = logEntries.scrollHeight;
}

addLogButton.addEventListener('click', () => {
    const message = newLogEntry.value.trim();
    if (message !== "") {
        addLogMessage(message);
        newLogEntry.value = "";
    }
});

const checklistItems = [
    "Command Established",
    "360 Complete",
    "Primary Search",
    "Secondary Search",
    "Rescue",
    "Fire Attack",
    "Ventilation",
    "Salvage",
    "Overhaul"
];

const checklistUl = document.getElementById('checklist-items');
const editableChecklist = document.getElementById('editable-checklist');
const newChecklistItemInput = document.getElementById('new-checklist-item');
const addChecklistItemButton = document.getElementById('add-checklist-item');

// Populate the checklist on page load
function initializeChecklist() {
    checklistUl.innerHTML = ""; // Clear any previous content
    checklistItems.forEach(item => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.toLowerCase().replace(/ /g, '-');
        checkbox.addEventListener('change', (event) => {
            addLogMessage(`${item} ${event.target.checked ? "checked" : "unchecked"}`);
        });
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = item;
        li.appendChild(checkbox);
        li.appendChild(label);
        checklistUl.appendChild(li);
    });
}

// Populate the editable checklist
function populateEditableChecklist() {
    editableChecklist.innerHTML = ""; // Clear any previous content
    checklistItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', () => {
            const index = checklistItems.indexOf(item);
            if (index > -1) {
                checklistItems.splice(index, 1);
            }
            populateEditableChecklist();
            initializeChecklist();
        });
        li.appendChild(deleteButton);
        editableChecklist.appendChild(li);
    });
}

// Add a new item to both checklists
addChecklistItemButton.addEventListener('click', () => {
    const newItem = newChecklistItemInput.value.trim();
    if (newItem !== "") {
        checklistItems.push(newItem);
        newChecklistItemInput.value = "";
        populateEditableChecklist();
        initializeChecklist();
    }
});

// Initialize on page load
initializeChecklist();
populateEditableChecklist();

const hamburgerMenu = document.getElementById('hamburger-menu');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');

hamburgerMenu.addEventListener('click', () => {
    settingsPanel.style.display = 'block';
});

closeSettings.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
});
