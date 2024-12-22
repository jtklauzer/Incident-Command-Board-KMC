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

const battalionsData = {
    "Battalion 3": [
        "Chief 2", "Bat 3", "Ladder 121", "Crash 110", "Crash 132",
        "Crash 133", "Crash 134", "Tender 115", "Rescue 130",
        "Engine 222", "Crash 331"
    ],
    "Battalion 4": [
        "Bat 4", "Engine 423", "Engine 526", "Tender 516"
    ],
    "Battalion 5": [
        "Bat 5", "Engine 624", "Engine 825"
    ],
    "Outside Agency": [
        "EOD", "Electrical", "Water/Fuels", "Bio", "ROC"
    ]
};

const resourcesDiv = document.getElementById('battalions');
const availableUnits = document.getElementById('available-units');
const requestedUnits = document.getElementById('requested-units');
const stagingUnits = document.getElementById('staging-units');
const onSceneUnits = document.getElementById('on-scene-units');
const assignedUnits = document.getElementById('assigned-units');

const availableCount = document.getElementById('available-count');
const requestedCount = document.getElementById('requested-count');
const stagingCount = document.getElementById('staging-count');
const onSceneCount = document.getElementById('on-scene-count');
const assignedCount = document.getElementById('assigned-count');

const unitStatusMap = new Map();

function updateUnitDisplay() {
    const statusLists = {
        "Available": { list: availableUnits, count: availableCount },
        "Requested": { list: requestedUnits, count: requestedCount },
        "Staging": { list: stagingUnits, count: stagingCount },
        "On Scene": { list: onSceneUnits, count: onSceneCount },
        "Tasked": { list: assignedUnits, count: assignedCount }
    };

    for (const status in statusLists) {
        statusLists[status].list.innerHTML = "";
        statusLists[status].count.textContent = 0;
    }

    for (const [unit, status] of unitStatusMap) {
        const newItem = document.createElement('li');
        newItem.textContent = unit;
        statusLists[status].list.appendChild(newItem);
        statusLists[status].count.textContent++; // Increment count directly
    }
}

for (const battalion in battalionsData) {
    const battalionDiv = document.createElement('div');
    battalionDiv.innerHTML = `<h3>${battalion}</h3>`;
    const unitsList = document.createElement('ul');

    battalionsData[battalion].forEach(unit => {
        const unitLi = document.createElement('li');
        unitLi.textContent = unit;

        unitStatusMap.set(unit, "Available"); // Initialize in the map

        const statusButtons = ["Requested", "Staging", "On Scene", "Tasked"];
        statusButtons.forEach(status => {
            const button = document.createElement('button');
            button.textContent = status;
            button.addEventListener('click', () => {
                unitStatusMap.set(unit, status);
                addLogMessage(`${unit} status changed to ${status}`);
                updateUnitDisplay();
            });
            unitLi.appendChild(button);
        });
        unitsList.appendChild(unitLi);
    });
    battalionDiv.appendChild(unitsList);
    resourcesDiv.appendChild(battalionDiv);
}

const checklistItems = [
    "Command Established", "360 Complete", "Primary Search", "Secondary Search",
    "Rescue", "Fire Attack", "Ventilation", "Salvage", "Overhaul"
];

const checklistUl = document.getElementById('checklist-items');
const editableChecklist = document.getElementById('editable-checklist');
const newChecklistItemInput = document.getElementById('new-checklist-item');
const addChecklistItemButton = document.getElementById('add-checklist-item');

checklistItems.forEach(item => addChecklistItemToEditList(item));

function addChecklistItemToEditList(item) {
    const li = document.createElement('li');
    li.textContent = item;
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete-checklist-item';
    deleteButton.addEventListener('click', () => {
        li.remove();
        const index = checklistItems.indexOf(item);
        if (index > -1) {
            checklistItems.splice(index, 1);
        }
        checklistUl.innerHTML = "";
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
    });
    li.appendChild(deleteButton);
    editableChecklist.appendChild(li);
}

addChecklistItemButton.addEventListener('click', () => {
    const newItem = newChecklistItemInput.value.trim();
    if (newItem !== '') {
        checklistItems.push(newItem);
        newChecklistItemInput.value = '';
        addChecklistItemToEditList(newItem);
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = newItem.toLowerCase().replace(/ /g, '-');
        checkbox.addEventListener('change', (event) => {
            addLogMessage(`${newItem} ${event.target.checked ? "checked" : "unchecked"}`);
        });
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = newItem;
        li.appendChild(checkbox);
        li.appendChild(label);
        checklistUl.appendChild(li);
    }
});


const hamburgerMenu = document.getElementById('hamburger-menu');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');

hamburgerMenu.addEventListener('click', () => {
    settingsPanel.style.display = 'block';
});

closeSettings.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
});

updateUnitDisplay();