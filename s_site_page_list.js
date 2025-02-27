// Load and display data in the table with row numbers
function loadData() {
    const tableBody = document.querySelector('#fileTable tbody');
    tableBody.innerHTML = ''; // Clear previous data

    pages_made.forEach((page, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="text-start">${page.file_name}</td>
            <td class="text-start">
                <a href="http://localhost/${page.full_name.replace(/^127\\.0\\.0\\.1\\/, '').replace(/\\/g, '/')}">
                    ${page.full_name.replace(/\\/g, '/')}
                </a>
            </td>
            <td class="text-start">${page.subdir}</td>
            <td class="text-end">${page.size}</td>
            <td class="text-end">${page.lines}</td>
            <td class="text-start">${page.base}</td>
            <td class="text-center">
                <input type="radio" name="selectRow">
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Sort table and update row enumeration
let sortDirection = [true, true, true, true, true, true];

function sortTable(columnIndex) {
    const table = document.querySelector('#fileTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        return sortDirection[columnIndex]
            ? cellA.localeCompare(cellB)
            : cellB.localeCompare(cellA);
    });

    sortDirection[columnIndex] = !sortDirection[columnIndex];

    const tableBody = table.querySelector('tbody');
    rows.forEach(row => tableBody.appendChild(row));

    updateRowNumbers();
}

// Update row numbers after sorting or filtering
function updateRowNumbers() {
    const rows = document.querySelectorAll('#fileTable tbody tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

// Dropdown action handler
document.getElementById('actionDropdown').addEventListener('change', function () {
    const action = this.value;
    if (action === 'restore') {
        loadData();
    } else {
        const rows = Array.from(document.querySelectorAll('#fileTable tbody tr'));
        const selectedRow = rows.find(row => row.querySelector('input[type="radio"]:checked'));

        if (!selectedRow) {
            alert('Please select a row first.');
            this.value = 'none';
            return;
        }

        const filterValue = selectedRow.cells[getColumnIndex(action)].textContent.trim();

        const filteredRows = rows.filter(row => row.cells[getColumnIndex(action)].textContent.trim() === filterValue);

        const tableBody = document.querySelector('#fileTable tbody');
        tableBody.innerHTML = '';
        filteredRows.forEach(row => tableBody.appendChild(row));

        updateRowNumbers();
    }

    this.value = 'none'; // Reset dropdown
});

// Get the corresponding column index for filtering
function getColumnIndex(action) {
    switch (action) {
        case 'filter_file_name': return 1;
        case 'filter_subdir': return 3;
        case 'filter_base': return 6;
        default: return -1;
    }
}

// Initial data load
loadData();
