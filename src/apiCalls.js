// --------- Global Fetched Data Variable
const dataFromEndpoints = {}

// --------- Endpoint URL Name list for interpolation
const endPointNameList = ['travelers', 'trips', 'destinations']

// --------- GET request
const fetchFromEndPoints = endPointName => {
  return fetch(`http://localhost:3001/api/v1/${endPointName}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject('Request failed: ', + res.status)
      }
      return res.json()
    })
    .then(data => {
      dataFromEndpoints[endPointName] = data
    })
    .catch(error => console.error('Request failed from catch', error))
}

const fetchPromises = endPointNameList.map(endPoint => fetchFromEndPoints(endPoint))

// --------- POST request
const submitTripRequest = (potentialVacation) => {
  return fetch(`http://localhost:3001/api/v1/trips`, {
    method: 'POST',
    body: JSON.stringify(potentialVacation),
    headers:{ 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .catch(error => console.error(`Error at ${error}`))
}

export {
  fetchPromises,
  dataFromEndpoints,
  submitTripRequest,
  fetchFromEndPoints 
}







