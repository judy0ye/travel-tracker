import {dataFromEndpoints}  from './apiCalls';

import{
  getAllTrips, 
  getAllDestination
} from './utils'

import {
  currentTraveler
} from './scripts'

// --------- query selectors
const loginForm = document.querySelector('#loginForm')
const loginSection = document.querySelector('.login-section')
const pastTrips = document.querySelector('.past-trips')

// --------- functions for event listeners
const login = (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value
  const password = document.querySelector('#password').value
  const currentUserId = /^traveler\d+$/;

  if (currentUserId.test(username) && password === 'travel') {
    loginSection.classList.add('hidden')
  }
}

// --------- functions for manipuating the DOM
const displayTravelerTrips = () => {
  const trips = getAllTrips(currentTraveler.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)
  const tripDestinations = getAllDestination(currentTraveler.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)


  return trips.map(trip => {
    const destination = tripDestinations.find(dest => dest.id === trip.destinationID);
      return pastTrips.innerHTML += `<p>${destination.destination} on ${trip.date}</p>`;
  });
  
}


export {
  loginForm,
  login,
  displayTravelerTrips
}