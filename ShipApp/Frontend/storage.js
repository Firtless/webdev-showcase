const API_URL = 'http://localhost:3000/ships';

async function getShips(sort = 'default') {
  try {
    const url = sort && sort !== 'default'
      ? `${API_URL}?sort=${encodeURIComponent(sort)}`
      : API_URL;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch ships');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getShipById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addShip(shipData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shipData)
  });

  if (!response.ok) {
    throw new Error('Failed to create ship');
  }
  return await response.json();
}

async function updateShip(id, updatedData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) {
    throw new Error('Failed to update ship');
  }
  return await response.json();
}

async function deleteShip(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete ship');
  }
  return await response.json();
}