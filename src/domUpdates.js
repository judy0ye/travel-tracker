import { dataFromEndpoints } from './apiCalls';

import {
  getTravelerById,
  getAllTrips,
  getAllDestination,
  getYearlyExpense,
  createVacation
} from './utils';

// --------- global variables
let currentTraveler = {};
let potentialVacation = {};

// --------- query selectors
const loginForm = document.querySelector('#login-form');
const tripSubmissionForm = document.querySelector('#trip-submission');
const submitToTravelAgentButton = document.querySelector(
  '#submit-to-travel-agent'
);
const invalidLoginMessage = document.querySelector('.invalid-login-message');
const loginButton = document.querySelector('.submit');
const bookButton = document.querySelector('.book-button');
const bookTripSection = document.querySelector('.book-trip');
const travelerInputSection = document.querySelector('.traveler-inputs');
const loginSection = document.querySelector('.login-section');
const pastTrips = document.querySelector('.past-trips');
const pendingTrips = document.querySelector('.pending-trips');
const welcomeMessage = document.querySelector('.welcome-message');
const dashboard = document.querySelector('.dashboard');
const expenseThisYear = document.querySelector('.specific-year-expense');
const costOfTrip = document.querySelector('.trip-cost-estimation');
const destinationDropDown = document.querySelector('#destination');
const calendarInput = document.querySelector('#calendar');
const durationInput = document.querySelector('#duration');
const travelerAmtInput = document.querySelector('#traveler-numbers');
const costEsimationSection = document.querySelector('.cost-estimation');
const specificYearDropdown = document.querySelector('#specific-year');

// --------- functions invoked after event listeners implementation
const login = (e) => {
  e.preventDefault();

  const userName = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const currentUser = /^traveler(\d+)$/;
  const match = userName.match(currentUser);

  if (match && match[1] >= 1 && match[1] <= 50 && password === 'travel') {
    const travelerId = parseInt(match[1]);
    const traveler = getTravelerById(travelerId, dataFromEndpoints.travelers);
    currentTraveler = traveler;
    loginForm.classList.add('hidden');
  } else {
    invalidLoginMessage.innerHTML = `<p>Please enter a valid username and/or password</p>`;
    loginButton.classList.add('disable-button');
  }

  getYearList();
  displayWelcomeMessage();
  displayTravelerTrips(dataFromEndpoints);
  displayYearlyExpense();
};

const toggle = () => {
  if (loginButton.classList.contains('disable-button')) {
    loginButton.classList.remove('disable-button');
  }
};

const setCalendarMinDate = () => {
  const startDate = new Date();

  const dateString = `${startDate.getFullYear()}-${(
    '0' +
    (startDate.getMonth() + 1)
  ).slice(-2)}-${('0' + startDate.getDate()).slice(-2)}`;

  calendarInput.setAttribute('min', dateString);
};

const getDestinationList = () => {
  destinationDropDown.innerHTML =
    '<option value="" disabled>Select a destination</option>';
  dataFromEndpoints.destinations.destinations.forEach((destination) => {
    destinationDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
  });

  destinationDropDown.selectedIndex = 0;
};

// --------- functions for manipuating the DOM
const displayWelcomeMessage = () => {
  if (currentTraveler.name) {
    welcomeMessage.classList.remove('hidden');
    welcomeMessage.innerText = `Welcome ${currentTraveler.name}`;
    dashboard.classList.remove('hidden');
  }
};

const onClickBook = () => {
  bookTripSection.classList.add('hidden');
  travelerInputSection.classList.remove('hidden');
  costEsimationSection.classList.remove('hidden');
  submitToTravelAgentButton.classList.add('disable-button');
};

const displayTravelerTrips = (dataFromEndpoints) => {
  const trips = getAllTrips(
    currentTraveler.id,
    dataFromEndpoints.trips,
    dataFromEndpoints.destinations
  );
  const tripDestinations = getAllDestination(
    currentTraveler.id,
    dataFromEndpoints.trips,
    dataFromEndpoints.destinations
  );

  const { pastTripsHTML, pendingTripsHTML } = trips.reduce(
    (tripByStatus, trip) => {
      const destination = tripDestinations.find(
        (destination) => destination.id === trip.destinationID
      );

      const tripCard = `
      <article class="trip-cards">
        <section>
          <img class="trip-image" src="${destination.image}" alt="${destination.alt}"/>
        </section>
        <section>
          <h3>${trip.date}: ${destination.destination}</h3>
        </section>
      </article>`;

      if (trip.status === 'approved') {
        tripByStatus.pastTripsHTML += tripCard;
      } else if (trip.status === 'pending') {
        tripByStatus.pendingTripsHTML += tripCard;
      }

      return tripByStatus;
    },
    { pastTripsHTML: '', pendingTripsHTML: '' }
  );
  pastTrips.innerHTML = pastTripsHTML;
  pendingTrips.innerHTML = pendingTripsHTML;
};

const displayYearlyExpense = () => {
  const year = specificYearDropdown.value;
  const expense = getYearlyExpense(
    currentTraveler.id,
    year,
    dataFromEndpoints.trips,
    dataFromEndpoints.destinations
  );

  expenseThisYear.innerHTML = `<p>Total Expense for ${year}: $${expense} </p>`;
};

const getYearList = () => {
  const uniqueYears = new Set();

  dataFromEndpoints.trips.trips
    .filter((trip) => trip.userID === currentTraveler.id)
    .forEach((trip) => {
      const yearOnly = trip.date.split('/')[0];
      uniqueYears.add(yearOnly);
    });

  const allTripYears = [...uniqueYears];
  allTripYears.sort((a, b) => b - a);

  allTripYears.forEach((tripYear) => {
    specificYearDropdown.innerHTML += `<option value="${tripYear}">${tripYear}</option>`;
  });
};

const getCostForTrip = (tripEstimationData) => {
  const destination = dataFromEndpoints.destinations.destinations.find(
    (destination) => destination.id === tripEstimationData.destination
  );

  const totalLodgingCost =
    destination.estimatedLodgingCostPerDay * tripEstimationData.duration;
  const totalFlightCost =
    destination.estimatedFlightCostPerPerson *
    tripEstimationData.numOfTravelers;
  const travelAgentFee = (totalLodgingCost + totalFlightCost) * 0.1;

  return totalLodgingCost + totalFlightCost + travelAgentFee;
};

const displayCostOfTrip = (e) => {
  e.preventDefault();
  submitToTravelAgentButton.classList.remove('disable-button');

  const tripEstimationData = {
    calendar: calendarInput.value,
    duration: parseInt(durationInput.value),
    numOfTravelers: parseInt(travelerAmtInput.value),
    destination: parseInt(destinationDropDown.value)
  };

  potentialVacation = createVacation(currentTraveler, tripEstimationData);

  const matchingDestination = dataFromEndpoints.destinations.destinations.find(
    (destination) => destination.id === tripEstimationData.destination
  );

  costOfTrip.innerHTML = `
  <div><p>Total Cost of Trip: </p><p>$${getCostForTrip(tripEstimationData)}</p></div>
  <div> <p>Date:</p><p> ${tripEstimationData.calendar}</p></div>
  <div><p>Duration in Days: </p><p>${tripEstimationData.duration}</p></div>
  <div><p>Traveler Numbers: </p><p>${tripEstimationData.numOfTravelers}</p></div>
  <div><p>Destination: </p><p>${matchingDestination.destination}</p></div>`;

  e.target.reset();
  destinationDropDown.selectedIndex = 0;
};

// --------- DOM manipuation for POST
const displayStatus = (newTripFromInput) => {
  const matchingDestination = dataFromEndpoints.destinations.destinations.find(
    (destination) => destination.id === newTripFromInput.newTrip.destinationID
  );

  pendingTrips.innerHTML += `
  <article class="trip-cards">
    <section>
      <img class="trip-image" src="${matchingDestination.image}" alt="${matchingDestination.alt}"/>
    </section>
    <section>
      <h3>${newTripFromInput.newTrip.date}: ${matchingDestination.destination}</h3>
    </section>
  </article>`;

  displaySuccessfulBooking();
};

const displaySuccessfulBooking = () => {
  costOfTrip.innerHTML = `Your trip has been successfully submitted!`;

  setTimeout(() => {
    costOfTrip.innerHTML = '';
  }, 3000);

  submitToTravelAgentButton.classList.add('disable-button');
};

export {
  currentTraveler,
  loginForm,
  tripSubmissionForm,
  submitToTravelAgentButton,
  login,
  displayCostOfTrip,
  getDestinationList,
  potentialVacation,
  displayTravelerTrips,
  displayStatus,
  setCalendarMinDate,
  specificYearDropdown,
  displayYearlyExpense,
  onClickBook,
  bookButton,
  toggle,
  loginButton
};
