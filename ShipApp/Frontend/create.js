document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('shipForm');
  const pageTitle = document.getElementById('pageTitle');
  const shipIdInput = document.getElementById('shipId');
  const nameInput = document.getElementById('shipName');
  const tonnageInput = document.getElementById('shipTonnage');
  const passengersInput = document.getElementById('shipPassengers');

  const errorModal = document.getElementById('errorModal');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const closeModalBtn = document.getElementById('closeModalBtn');

  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('id');

  if (editId) {
    const existingShip = await getShipById(editId);
    if (existingShip) {
      pageTitle.textContent = 'Edit Ship';
      shipIdInput.value = existingShip.id;
      nameInput.value = existingShip.name;
      tonnageInput.value = existingShip.tonnage;
      passengersInput.value = existingShip.passengerCount;
    }
  }

  function showErrorModal(message) {
    modalErrorMessage.textContent = message;
    errorModal.classList.remove('hidden');
  }

  closeModalBtn.addEventListener('click', () => {
    errorModal.classList.add('hidden');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameVal = nameInput.value.trim();
    const tonnageVal = parseFloat(tonnageInput.value);
    const passengersVal = parseInt(passengersInput.value, 10);

    if (!nameVal) {
      showErrorModal('Ship Name cannot be empty or contain only whitespace.');
      return;
    }

    if (isNaN(tonnageVal) || tonnageVal <= 0) {
      showErrorModal('Tonnage must be a positive number greater than 0.');
      return;
    }

    if (isNaN(passengersVal) || passengersVal < 0 || !Number.isInteger(passengersVal)) {
      showErrorModal('Passenger Capacity must be a non-negative whole integer.');
      return;
    }

    const shipData = {
      name: nameVal,
      tonnage: tonnageVal,
      passengerCount: passengersVal
    };

    try {
      if (shipIdInput.value) {
        await updateShip(shipIdInput.value, shipData);
      } else {
        await addShip(shipData);
      }
      window.location.href = 'home.html';
    } catch (error) {
      showErrorModal('Server error: could not save ship. Check if backend is running.');
    }
  });
});