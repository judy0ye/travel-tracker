// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import {
  fetchPromises,
  dataFromEndpoints
} from './apiCalls'

import {
  loginForm,
  tripSubmissionForm,
  login,
  displayCostOfTrip
} from './domUpdates'

import {
  getAllDestination,
} from '../src/utils'

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


const currentTravelerEx = {
  "id": 3,
  "name": "Sibby Dawidowitsch",
  "travelerType": "shopper"
}

// --------- event listeners
window.addEventListener('load', function () {
  Promise.all(fetchPromises)
    .then(() => {
      console.log('travelers: ', dataFromEndpoints.travelers);
      console.log('trips: ', dataFromEndpoints.trips)
      console.log('destinations: ', dataFromEndpoints.destinations)
      console.log('getAllTrips', getAllDestination(3, dataFromEndpoints.trips, dataFromEndpoints.destinations))
      console.log(dataFromEndpoints.trips.trips[202])
    })
})

loginForm.addEventListener('submit', login)
tripSubmissionForm.addEventListener('submit', displayCostOfTrip)

