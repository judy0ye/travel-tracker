const fetchFromEndPoints = travelInfo => {
  fetch(`http://localhost:3001/api/v1/${travelInfo}`)
    .then(res => res.json())
}

export{
  fetchFromEndPoints
}