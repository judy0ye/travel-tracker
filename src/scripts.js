// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import {
  fetchPromises,
  dataFromEndpoints,
  submitTripRequest 
} from './apiCalls'

import {
  loginForm,
  tripSubmissionForm,
  login,
  submitToTravelAgentButton,
  displayCostOfTrip,
  getDestinationList,
  // submitTravel,
  potentialVacation,
  displayTravelerTrips,
  displayStatus,
  setCalendarMinDate  
} from './domUpdates'

import {
  getAllDestination,
} from '../src/utils'

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let newTripFromInput

// --------- event listeners
window.addEventListener('load', function () {
  Promise.all(fetchPromises)
    .then(() => {
      console.log('travelers: ', dataFromEndpoints.travelers);
      console.log('trips: ', dataFromEndpoints.trips)
      console.log('destinations: ', dataFromEndpoints.destinations)
      getDestinationList() 
      setCalendarMinDate()
    })
    .catch(error => console.log('Request failed from Promise.all', error))
})

loginForm.addEventListener('submit', login)
tripSubmissionForm.addEventListener('submit', displayCostOfTrip)
// submitTravel.addEventListener('click', displayCostOfTrip)

submitToTravelAgentButton.addEventListener('click', () => {
  submitTripRequest(potentialVacation)
  .then(data => {
    newTripFromInput = data
    displayStatus(newTripFromInput)
  })
  .catch(error => console.error(`Error at ${error}`))
})

export {
  newTripFromInput
}