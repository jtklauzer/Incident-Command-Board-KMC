document.addEventListener("DOMContentLoaded", () => {
    const checklistUl = document.getElementById('checklist-items');
    const editableChecklist = document.getElementById('editable-checklist');
    const newChecklistItemInput = document.getElementById('new-checklist-item');
    const addChecklistItemButton = document.getElementById('add-checklist-item');

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

    function populateChecklist() {
        checklistUl.innerHTML = "";
        checklistItems.forEach(item => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item.toLowerCase().replace(/ /g, '-');
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = item;

            li.appendChild(checkbox);
            li.appendChild(label);
            checklistUl.appendChild(li);
        });
    }

    function populateEditableChecklist() {
        editableChecklist.innerHTML = "";
        checklistItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', () => {
                const index = checklistItems.indexOf(item);
                if (index > -1) {
                    checklistItems.splice(index, 1);
                    populateChecklist();
                    populateEditableChecklist();
                }
            });

            li.appendChild(deleteButton);
            editableChecklist.appendChild(li);
        });
    }

    addChecklistItemButton.addEventListener('click', () => {
        const newItem = newChecklistItemInput.value.trim();
        if (newItem) {
            checklistItems.push(newItem);
            newChecklistItemInput.value = "";
            populateChecklist();
            populateEditableChecklist();
        }
    });

    populateChecklist();
    populateEditableChecklist();
});
