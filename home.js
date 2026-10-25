document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('shipTableBody');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const totalTonnageEl = document.getElementById('totalTonnage');
  const totalPassengersEl = document.getElementById('totalPassengers');

  let ships = getShips();

  function renderTable() {
    let displayedShips = [...ships];

    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      displayedShips = displayedShips.filter(ship =>
        ship.name.toLowerCase().includes(query)
      );
    }

    const sortVal = sortSelect.value;
    if (sortVal === 'tonnage-asc') {
      displayedShips.sort((a, b) => a.tonnage - b.tonnage);
    } else if (sortVal === 'tonnage-desc') {
      displayedShips.sort((a, b) => b.tonnage - a.tonnage);
    } else if (sortVal === 'passengers-asc') {
      displayedShips.sort((a, b) => a.passengerCount - b.passengerCount);
    } else if (sortVal === 'passengers-desc') {
      displayedShips.sort((a, b) => b.passengerCount - a.passengerCount);
    }

    if (displayedShips.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" class="no-data">No ships found.</td></tr>`;
    } else {
      tableBody.innerHTML = displayedShips
        .map(ship => `
          <tr>
            <td><strong>${ship.name}</strong></td>
            <td>${ship.tonnage.toLocaleString()}</td>
            <td>${ship.passengerCount.toLocaleString()}</td>
            <td>
              <a href="create.html?id=${ship.id}" class="btn btn-secondary btn-sm">Edit</a>
            </td>
          </tr>
        `)
        .join('');
    }
    calculateTotals(displayedShips);
  }

  function calculateTotals(items) {
    const totalTonnage = items.reduce((sum, item) => sum + Number(item.tonnage), 0);
    const totalPassengers = items.reduce((sum, item) => sum + Number(item.passengerCount), 0);

    totalTonnageEl.textContent = totalTonnage.toLocaleString();
    totalPassengersEl.textContent = totalPassengers.toLocaleString();
  }

  searchInput.addEventListener('input', renderTable);
  sortSelect.addEventListener('change', renderTable);
  renderTable();
});