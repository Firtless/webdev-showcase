document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('shipTableBody');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const totalTonnageEl = document.getElementById('totalTonnage');
  const totalPassengersEl = document.getElementById('totalPassengers');

  let ships = [];

  async function loadShips() {
    ships = await getShips(sortSelect.value);
    renderTable();
  }

  function renderTable() {
    let displayedShips = [...ships];

    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      displayedShips = displayedShips.filter(ship =>
        ship.name.toLowerCase().includes(query)
      );
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
            <td class="actions-cell">
              <a href="create.html?id=${ship.id}" class="btn btn-secondary btn-sm">Edit</a>
              <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${ship.id}">Delete</button>
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

  tableBody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;
      await deleteShip(id);
      await loadShips();
    }
  });

  searchInput.addEventListener('input', renderTable);
  sortSelect.addEventListener('change', loadShips);
  loadShips();
});