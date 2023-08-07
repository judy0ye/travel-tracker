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
let tripEstimationData = {}

// --------- query selectors
const loginForm = document.querySelector('#loginForm')
const tripSubmissionForm = document.querySelector('#tripSubmission')
// const loginSection = document.querySelector('.login-section')
const pastTrips = document.querySelector('.past-trips')
const pendingTrips = document.querySelector('.pending-trips')
const welcomeMessage = document.querySelector('.welcome-message')
const dashboard = document.querySelector('.dashboard')
const expenseThisYear = document.querySelector('.expense-this-year')
const costOfTrip = document.querySelector('.trip-cost-estimation')
const destinationDropDown = document.querySelector('#destination')

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
  
  getDestinationList()
  displayWelcomeMessage()
  displayTravelerTrips()
  displayYearlyExpense()
}

const getDestinationList = () =>  {
  destinationDropDown.innerHTML = '<option value="" disabled>Select a destination</option>';
  dataFromEndpoints.destinations.destinations.forEach(destination => {
    destinationDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
  });

  destinationDropDown.selectedIndex = 0;
};


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

const displayCostOfTrip = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const tripEstimation = {
    id: dataFromEndpoints.trips.trips[202].id + 1,
    calendar: formData.get('calendar'), 
    duration: formData.get('duration'),
    traveler_numbers: formData.get('traveler_numbers'),
    destination: destinationDropDown.options[destinationDropDown.selectedIndex].text
  };
  tripEstimationData = tripEstimation
  console.log('tripEstData', tripEstimationData)
  costOfTrip.innerHTML = `
    <p>Total Cost of Trip: $${getCostForTrip()}</p>
    <p>Date: ${tripEstimation.calendar}</p>
    <p>Duration: ${tripEstimation.duration}</p>
    <p>Traveler Numbers: ${tripEstimation.traveler_numbers}</p>
    <p>Destination: ${tripEstimation.destination}</p>
  `
  e.target.reset();
  destinationDropDown.selectedIndex = 0;
}

const getCostForTrip = () => {
  console.log(tripEstimationData)
  const destination = dataFromEndpoints.destinations.destinations.find(destination => destination.destination === tripEstimationData.destination)

  const totalLodgingCost = destination.estimatedLodgingCostPerDay * tripEstimationData.duration
  const totalFlightCost = destination.estimatedFlightCostPerPerson * tripEstimationData.traveler_numbers
  const travelAgentFee = (totalLodgingCost + totalFlightCost) * .10

  return totalLodgingCost + totalFlightCost + travelAgentFee
}

export {
  currentTraveler,
  loginForm,
  tripSubmissionForm,
  login,
  displayCostOfTrip,
  getDestinationList
}