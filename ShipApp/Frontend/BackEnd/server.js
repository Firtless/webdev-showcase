const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'ships.json');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

function readShips() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data || '[]');
}

function writeShips(ships) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(ships, null, 2));
}

app.get('/ships', (req, res) => {
  let ships = readShips();
  const { sort } = req.query;

  if (sort === 'tonnage-asc') {
    ships.sort((a, b) => a.tonnage - b.tonnage);
  } else if (sort === 'tonnage-desc') {
    ships.sort((a, b) => b.tonnage - a.tonnage);
  } else if (sort === 'passengers-asc') {
    ships.sort((a, b) => a.passengerCount - b.passengerCount);
  } else if (sort === 'passengers-desc') {
    ships.sort((a, b) => b.passengerCount - a.passengerCount);
  }

  res.json(ships);
});

app.get('/ships/:id', (req, res) => {
  const ships = readShips();
  const ship = ships.find(s => s.id === req.params.id);
  if (!ship) {
    return res.status(404).json({ message: 'Ship not found' });
  }
  res.json(ship);
});

app.post('/ships', (req, res) => {
  const { name, tonnage, passengerCount } = req.body;
  if (!name || tonnage === undefined || passengerCount === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const ships = readShips();
  const newShip = {
    id: Date.now().toString(),
    name: String(name).trim(),
    tonnage: Number(tonnage),
    passengerCount: Number(passengerCount)
  };

  ships.push(newShip);
  writeShips(ships);
  res.status(201).json(newShip);
});

app.put('/ships/:id', (req, res) => {
  const { name, tonnage, passengerCount } = req.body;
  const ships = readShips();
  const index = ships.findIndex(s => s.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Ship not found' });
  }

  ships[index] = {
    id: req.params.id,
    name: String(name).trim(),
    tonnage: Number(tonnage),
    passengerCount: Number(passengerCount)
  };

  writeShips(ships);
  res.json(ships[index]);
});

app.delete('/ships/:id', (req, res) => {
  const ships = readShips();
  const filteredShips = ships.filter(s => s.id !== req.params.id);

  if (filteredShips.length === ships.length) {
    return res.status(404).json({ message: 'Ship not found' });
  }

  writeShips(filteredShips);
  res.json({ message: 'Ship deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});