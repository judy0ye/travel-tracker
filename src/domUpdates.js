import {dataFromEndpoints}  from './apiCalls';

import{
  getTravelerById, 
  getAllTrips, 
  getAllDestination
} from './utils'

import {
  currentTravelerEx
} from './scripts'

// --------- global variables
let currentTraveler = {}
// --------- query selectors
const loginForm = document.querySelector('#loginForm')
// const loginSection = document.querySelector('.login-section')
const pastTrips = document.querySelector('.past-trips')
const welcomeMessage = document.querySelector('.welcome-message')

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

}

// --------- functions for manipuating the DOM
const displayWelcomeMessage = () => {
  if(loginForm.classList.contains('hidden')) {
    welcomeMessage.classList.remove('hidden')
    welcomeMessage.innerText = `Welcome ${currentTraveler.name}`
  }
}

const displayTravelerTrips = () => {
  const trips = getAllTrips(currentTravelerEx.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)
  const tripDestinations = getAllDestination(currentTravelerEx.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)

  return trips.map(trip => {
    const destination = tripDestinations.find(dest => dest.id === trip.destinationID);
      return pastTrips.innerHTML += `<p>${destination.destination} on ${trip.date}</p>`;
  });
}


export {
  currentTraveler,
  loginForm,
  login,
  displayTravelerTrips
}