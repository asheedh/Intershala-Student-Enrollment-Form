const form = document.getElementById('form');
let editingRow = null;

document.addEventListener('DOMContentLoaded', () => {
    loadTableData(); //To store data Locally
});
// --------------- Starting of form ---------------
form.addEventListener('submit', function(event) {
    event.preventDefault(); // To prevent automatic refresh

    const studentName = document.getElementById("sname").value;
    const admissionNumber = document.getElementById("sid").value;
    const studentClass = document.getElementById("sclass").value;
    const studentSection = document.getElementById("ssec").value;
    const rollNumber = document.getElementById("srn").value;
    const studentEmail = document.getElementById("seid").value;
    const contactNumber = document.getElementById("scn").value;
    
    if (editingRow) {
        editingRow.innerHTML = `
            <td class="tablefield2">${studentName}</td>
            <td class="tablefield2">${admissionNumber}</td>
            <td class="tablefield2">${studentClass}</td>
            <td class="tablefield2">${studentSection}</td>
            <td class="tablefield2">${rollNumber}</td>
            <td class="tablefield2">${studentEmail}</td>
            <td class="tablefield2">${contactNumber}</td>
            <td class="border-black border-2 p-2 flex justify-around">
                <button class="edit-btn p-2 bg-blue-500 rounded-xl hover:bg-teal-500">Edit</button> 
                <button class="fas fa-trash delete-btn text-red-600 hover:bg-green-500 rounded-lg p-2"></button>
            </td>
        `;
        attachEventListeners(editingRow);  // Reattach event listeners to the updated row
        editingRow = null;
    } 
    
    else {
        const tableBody = document.querySelector('table tbody');
        const nRow = document.createElement('tr');

        nRow.innerHTML = `
            <td class="tablefield2">${studentName}</td>
            <td class="tablefield2">${admissionNumber}</td>
            <td class="tablefield2">${studentClass}</td>
            <td class="tablefield2">${studentSection}</td>
            <td class="tablefield2">${rollNumber}</td>
            <td class="tablefield2">${studentEmail}</td>
            <td class="tablefield2">${contactNumber}</td>
            <td class="border-black border-2 p-2 flex justify-around">
                <button class="edit-btn p-2 bg-blue-500 rounded-xl hover:bg-teal-500">Edit</button>
                <button class="fas fa-trash delete-btn text-red-600 hover:bg-green-500 rounded-lg p-2"></button>
            </td>
        `;
        tableBody.appendChild(nRow);
        attachEventListeners(nRow);  // Attach event listeners to the new row
    }

    saveTableData();
    form.reset();
});

// --------------- Ending of form ----------------

// --------------- attachEventListeners Function ---------------

function attachEventListeners(row) {
    const deleteBtn = row.querySelector('.delete-btn');
    const editBtn = row.querySelector('.edit-btn');

    deleteBtn.addEventListener('click', function() {
        row.remove();
        saveTableData();  // Save the data after row deletion
    });

    editBtn.addEventListener('click', function() {
        editingRow = row;
        
        const cells = row.querySelectorAll("td");
        document.getElementById("sname").value = cells[0].textContent;
        document.getElementById("sid").value = cells[1].textContent;
        document.getElementById("sclass").value = cells[2].textContent;
        document.getElementById("ssec").value = cells[3].textContent;
        document.getElementById("srn").value = cells[4].textContent;
        document.getElementById("seid").value = cells[5].textContent;
        document.getElementById("scn").value = cells[6].textContent;
    });
}

// --------------- attachEventListeners Function ---------------

// --------------- Data saving, loading functions ---------------

function saveTableData() {  // Function to save table
    const tableBody = document.querySelector('table tbody');
    const rows = tableBody.querySelectorAll('tr');
    const tableData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => cell.textContent);
        tableData.push(rowData);
    });

    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadTableData() {
    const tableBody = document.querySelector('table tbody');
    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];

    tableData.forEach(rowData => {
        const nRow = document.createElement('tr');
        nRow.innerHTML = `
            <td class="border-black border-2 p-2">${rowData[0]}</td>
            <td class="border-black border-2 p-2">${rowData[1]}</td>
            <td class="border-black border-2 p-2">${rowData[2]}</td>
            <td class="border-black border-2 p-2">${rowData[3]}</td>
            <td class="border-black border-2 p-2">${rowData[4]}</td>
            <td class="border-black border-2 p-2">${rowData[5]}</td>
            <td class="border-black border-2 p-2">${rowData[6]}</td>
            <td class="border-2 p-2 flex justify-around">
                <button class="edit-btn p-2 bg-blue-500 rounded-xl hover:bg-teal-500">Edit</button>
                <button class="fas fa-trash delete-btn text-red-600 hover:bg-green-500 rounded-lg p-2"></button>
            </td>
        `;
        tableBody.appendChild(nRow);
        attachEventListeners(nRow);  // Attach event listeners to each loaded row
    });
}
