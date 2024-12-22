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
const inServiceUnits = document.getElementById('in-service-units');
const stagingUnits = document.getElementById('staging-units');
const onSceneUnits = document.getElementById('on-scene-units');
const assignedUnits = document.getElementById('assigned-units');

function updateUnitDisplay() {
    inServiceUnits.innerHTML = "";
    stagingUnits.innerHTML = "";
    onSceneUnits.innerHTML = "";
    assignedUnits.innerHTML = "";

    const resourceLists = document.querySelectorAll("#battalions ul");
    resourceLists.forEach(list => {
        list.childNodes.forEach(item => {
            let status = item.dataset.status || "In Service";
            let targetList;

            switch (status) {
                case "Staging":
                    targetList = stagingUnits;
                    break;
                case "On Scene":
                    targetList = onSceneUnits;
                    break;
                case "Tasked":
                    targetList = assignedUnits;
                    break;
                default:
                    targetList = inServiceUnits;
            }
            const newItem = document.createElement('li');
            newItem.textContent = item.textContent;
            targetList.appendChild(newItem);
        });
    });
}

for (const battalion in battalionsData) {
    const battalionDiv = document.createElement('div');
    battalionDiv.innerHTML = `<h3>${battalion}</h3>`;
    const unitsList = document.createElement('ul');
    battalionsData[battalion].forEach(unit => {
        const unitLi = document.createElement('li');
        unitLi.textContent = unit;
        const statusButtons = ["Requested", "Staging", "On Scene", "Tasked"];
        statusButtons.forEach(status => {
            const button = document.createElement('button');
            button.textContent = status;
            button.addEventListener('click', () => {
                unitLi.querySelectorAll('button').forEach(btn => {
                    btn.style.backgroundColor = 'white';
                    btn.style.color = 'black';
                    btn.style.fontWeight = 'normal';
                });
                button.style.fontWeight = 'bold';
                unitLi.dataset.status = status;
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

updateUnitDisplay(); // Initial call to display units