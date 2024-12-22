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

    for (const list in statusLists) {
        statusLists[list].list.innerHTML = "";
        statusLists[list].count.textContent = 0;
    }

    let unitCount = {
        "Available": 0,
        "Requested": 0,
        "Staging": 0,
        "On Scene": 0,
        "Tasked": 0
    };

    for (const [unit, status] of unitStatusMap) {
        const newItem = document.createElement('li');
        newItem.textContent = unit;
        statusLists[status].list.appendChild(newItem);
        unitCount[status]++;
    }
    for (const list in statusLists) {
        statusLists[list].count.textContent = unitCount[list];
    }
}

for (const battalion in battalionsData) {
    const battalionDiv = document.createElement('div');
    battalionDiv.innerHTML = `<h3>${battalion}</h3>`;
    const unitsList = document.createElement('ul');

    battalionsData[battalion].forEach(unit => {
        const unitLi = document.createElement('li');
        unitLi.innerHTML = unit;

        unitStatusMap.set(unit, "Available");

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

updateUnitDisplay();