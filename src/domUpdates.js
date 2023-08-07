import {dataFromEndpoints}  from './apiCalls';

import{
  getTravelerById, 
  getAllTrips, 
  getAllDestination
} from './utils'

import {
  // currentTravelerEx
} from './scripts'

// --------- global variables
let currentTraveler = {}
// --------- query selectors
const loginForm = document.querySelector('#loginForm')
// const loginSection = document.querySelector('.login-section')
const pastTrips = document.querySelector('.past-trips')
const pendingTrips = document.querySelector('.pending-trips')
const welcomeMessage = document.querySelector('.welcome-message')
const dashboard = document.querySelector('.dashboard')

// --------- functions for event listeners
const login = (e) => {
  e.preventDefault();

  const userName = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  const currentUser = /^traveler(\d+)$/;
  const match = userName.match(currentUser)
  
  if (match && password === 'travel') {
    const travelerId = parseInt(match[1])
    const traveler = getTravelerById(travelerId, dataFromEndpoints.travelers)
    currentTraveler = traveler
    loginForm.classList.add('hidden')
    console.log('traveler', traveler)    
  }
    console.log('currentTraveler', currentTraveler)
  // if (currentUser.test(userName) && password === 'travel') {
  //   loginSection.classList.add('hidden')
  // }
  displayWelcomeMessage()
  displayTravelerTrips(currentTraveler)
}

// --------- functions for manipuating the DOM
const displayWelcomeMessage = () => {
  // if(loginForm.classList.contains('hidden')) {
    welcomeMessage.classList.remove('hidden')
    welcomeMessage.innerText = `Welcome ${currentTraveler.name}`
  // }
    dashboard.classList.remove('hidden')
}

// const displayTravelerTrips = () => {
//   const trips = getAllTrips(currentTravelerEx.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)
//   const tripDestinations = getAllDestination(currentTravelerEx.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)

//   return trips.map(trip => {
//     const destination = tripDestinations.find(dest => dest.id === trip.destinationID);
//       return pastTrips.innerHTML += `<p>${destination.destination} on ${trip.date}</p>`;
//   });
// }
const displayTravelerTrips = (currentTraveler) => {
  const trips = getAllTrips(currentTraveler.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)
  const tripDestinations = getAllDestination(currentTraveler.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)
  console.log('alltrips', trips)
  console.log('tripDestinations', tripDestinations)

  return trips.map(trip => {
    const destination = tripDestinations.find(dest => dest.id === trip.destinationID);
      if (trip.status === 'approved') {
        pastTrips.innerHTML += `<p>${trip.date}: ${destination.destination}</p>`;
      } else if (trip.status === 'pending') {
        pendingTrips.innerHTML += `<p>${trip.date}: ${destination.destination}</p>`;
      }
      
  });
}


export {
  currentTraveler,
  loginForm,
  login,
  displayTravelerTrips
}