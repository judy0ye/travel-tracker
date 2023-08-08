// --------- Global Fetched Data Variable
const dataFromEndpoints = {}

// --------- Endpoint URL Name list for interpolation
const endPointNameList = ['travelers', 'trips', 'destinations']

// --------- GET request
const fetchFromEndPoints = endPointName => {
  return fetch(`http://localhost:3001/api/v1/${endPointName}`)
    .then(res => {
      if (!res.ok) {
        console.log(`Request failed: ${res.status}`)
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
  console.log('fromPost', potentialVacation)
  return fetch(`http://localhost:3001/api/v1/trips`, {
    method: 'POST',
    body: JSON.stringify(potentialVacation),
    headers:{ 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
}

export {
  fetchPromises,
  dataFromEndpoints,
  submitTripRequest 
}







