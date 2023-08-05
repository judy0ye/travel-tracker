// --------- Endpoint URLs
const allEndpointURLs = [
  'http://localhost:3001/api/v1/travelers', 
  'http://localhost:3001/api/v1/trips',
  'http://localhost:3001/api/v1/destinations'
]

// --------- GET request
const fetchFromEndPoints = () => {
  return allEndpointURLs.map(endpointURL => 
    fetch(endpointURL)
    .then(res => res.json())
    )
    
}

export {
  fetchFromEndPoints
}

