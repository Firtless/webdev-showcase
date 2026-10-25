const STORAGE_KEY = 'ships_data';

const defaultShips = [
  { id: '1', name: 'Titanic', tonnage: 46328, passengerCount: 2435 },
  { id: '2', name: 'Queen Mary 2', tonnage: 148528, passengerCount: 2691 },
  { id: '3', name: 'Symphony of the Seas', tonnage: 228081, passengerCount: 6680 },
  { id: '4', name: 'Black Pearl', tonnage: 420, passengerCount: 120 }
];

function getShips() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultShips));
    return defaultShips;
  }
  return JSON.parse(data);
}

function saveShips(ships) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ships));
}

function getShipById(id) {
  const ships = getShips();
  return ships.find(ship => ship.id === id);
}

function addShip(shipData) {
  const ships = getShips();
  const newShip = {
    id: Date.now().toString(),
    ...shipData
  };
  ships.push(newShip);
  saveShips(ships);
  return newShip;
}

function updateShip(id, updatedData) {
  const ships = getShips();
  const index = ships.findIndex(ship => ship.id === id);
  if (index !== -1) {
    ships[index] = { id, ...updatedData };
    saveShips(ships);
  }
}