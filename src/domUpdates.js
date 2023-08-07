import { dataFromEndpoints }  from './apiCalls';

import{
  getTravelerById, 
  getAllTrips, 
  getAllDestination,
  getYearlyExpense
} from './utils'

import {

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
const expenseThisYear = document.querySelector('.expense-this-year')

// --------- functions invoked after event listeners implementation
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
  }
 
  displayWelcomeMessage()
  displayTravelerTrips()
  displayYearlyExpense()
}

// --------- functions for manipuating the DOM
const displayWelcomeMessage = () => {
  // if(loginForm.classList.contains('hidden')) {
    welcomeMessage.classList.remove('hidden')
    welcomeMessage.innerText = `Welcome ${currentTraveler.name}`
  // }
    dashboard.classList.remove('hidden')
}

const displayTravelerTrips = () => {
  const trips = getAllTrips(currentTraveler.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)
  const tripDestinations = getAllDestination(currentTraveler.id, dataFromEndpoints.trips, dataFromEndpoints.destinations)

  trips.map(trip => {
    const destination = tripDestinations.find(dest => dest.id === trip.destinationID);

    if (trip.status === 'approved') {
      pastTrips.innerHTML += `<p>${trip.date}: ${destination.destination}</p>`;
    } else if (trip.status === 'pending') {
      pendingTrips.innerHTML += `<p>${trip.date}: ${destination.destination}</p>`;
    }
  });
}

const displayYearlyExpense = () => {
 const expense = getYearlyExpense(currentTraveler.id, '2022', dataFromEndpoints.trips, dataFromEndpoints.destinations)
  console.log('expense', expense)
 expenseThisYear.innerHTML = `Your total expense this year is : $${expense}`
}

export {
  currentTraveler,
  loginForm,
  login,
  displayTravelerTrips
}