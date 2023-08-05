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
      dataFromEndpoints[endPointName] = data[endPointName]
    })
    .catch(error => console.error('Request failed from catch', error))
}


const fetchPromises = endPointNameList.map(endPoint => fetchFromEndPoints(endPoint))


export {
  fetchFromEndPoints,
  fetchPromises,
  dataFromEndpoints
}







