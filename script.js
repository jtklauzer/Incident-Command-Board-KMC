document.addEventListener("DOMContentLoaded", () => {
    // Selectors
    const addLogButton = document.getElementById('add-log');
    const newLogEntryTextarea = document.getElementById('new-log-entry');
    const logEntriesList = document.getElementById('log-entries');
    const checklistUl = document.getElementById('checklist-items');
    const newChecklistItemInput = document.getElementById('new-checklist-item');
    const addChecklistItemButton = document.getElementById('add-checklist-item');
    const resourcesDiv = document.getElementById('battalions');
    const requestedUnits = document.getElementById('requested-units');
    const stagingUnits = document.getElementById('staging-units');
    const onSceneUnits = document.getElementById('on-scene-units');
    const assignedUnits = document.getElementById('assigned-units');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettingsButton = document.getElementById('close-settings');

    // Data
    const unitStatusMap = new Map();
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

    // Functions
    function addLogMessage(message) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newLi = document.createElement('li');
        newLi.textContent = `${timestamp} - ${message}`;
        logEntriesList.appendChild(newLi);
        logEntriesList.scrollTop = logEntriesList.scrollHeight;
    }

    function populateChecklist() {
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
    }

    function populateResources() {
        resourcesDiv.innerHTML = "";
        for (const battalion in battalionsData) {
            const battalionDiv = document.createElement('div');
            const battalionHeader = document.createElement('h3');
            battalionHeader.textContent = battalion;
            const unitsList = document.createElement('ul');

            battalionsData[battalion].forEach(unit => {
                const unitLi = document.createElement('li');
                unitLi.textContent = unit;

                unitStatusMap.set(unit, "Available");

                const statusButtons = ["Requested", "Staging", "On Scene", "Assigned"];
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

            battalionDiv.appendChild(battalionHeader);
            battalionDiv.appendChild(unitsList);
            resourcesDiv.appendChild(battalionDiv);
        }
    }

    function updateUnitDisplay() {
        const statusLists = {
            "Requested": requestedUnits,
            "Staging": stagingUnits,
            "On Scene": onSceneUnits,
            "Assigned": assignedUnits
        };

        for (const status in statusLists) {
            statusLists[status].innerHTML = "";
        }

        unitStatusMap.forEach((status, unit) => {
            const li = document.createElement('li');
            li.textContent = unit;
            if (statusLists[status]) {
                statusLists[status].appendChild(li);
            }
        });
    }

    // Event Listeners
    addLogButton.addEventListener('click', () => {
        const logMessage = newLogEntryTextarea.value.trim();
        if (logMessage !== "") {
            addLogMessage(logMessage);
            newLogEntryTextarea.value = "";
        }
    });

    addChecklistItemButton.addEventListener('click', () => {
        const newItem = newChecklistItemInput.value.trim();
        if (newItem) {
            checklistItems.push(newItem);
            newChecklistItemInput.value = "";
            populateChecklist();
        }
    });

    hamburgerMenu.addEventListener('click', () => {
        settingsPanel.style.display = 'block';
    });

    closeSettingsButton.addEventListener('click', () => {
        settingsPanel.style.display = 'none';
    });

    // Initialization
    populateChecklist();
    populateResources();
    updateUnitDisplay();
});