// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import {
  fetchPromises,
  dataFromEndpoints,
  submitTripRequest,
  fetchFromEndPoints
} from './apiCalls';

import {
  loginForm,
  tripSubmissionForm,
  login,
  submitToTravelAgentButton,
  onClickBook,
  displayCostOfTrip,
  getDestinationList,
  bookButton,
  potentialVacation,
  displayStatus,
  setCalendarMinDate,
  specificYearDropdown,
  displayYearlyExpense,
  toggle,
  loginButton
} from './domUpdates';

import './css/normalize.css';
import './css/styles.css';
import './images/turing-logo.png';
import './images/emmanuel-denier-YiXsjwJKXmo-unsplash.jpg';

// --------- global variable
let newTripFromInput;

// --------- event listeners
window.addEventListener('load', function () {
  Promise.all(fetchPromises)
    .then(() => {
      getDestinationList();
      setCalendarMinDate();
    })
    .catch((error) => console.log('Request failed from Promise.all', error));
});

loginForm.addEventListener('submit', login);
loginForm.addEventListener('input', toggle);
specificYearDropdown.addEventListener('change', displayYearlyExpense);
tripSubmissionForm.addEventListener('submit', displayCostOfTrip);
bookButton.addEventListener('click', onClickBook);

submitToTravelAgentButton.addEventListener('click', () => {
  submitTripRequest(potentialVacation)
    .then((data) => {
      if (data) {
        newTripFromInput = data;
      return fetchFromEndPoints(`trips`)
      .then(() => { 
        displayStatus(newTripFromInput); 
      })}  
    })
    .catch((error) => console.error(`Error at ${error}`));
});

export { newTripFromInput };

    