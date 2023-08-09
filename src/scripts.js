// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import {
  fetchPromises,
  dataFromEndpoints,
  submitTripRequest
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
  displayYearlyExpense
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
specificYearDropdown.addEventListener('change', displayYearlyExpense);
tripSubmissionForm.addEventListener('submit', displayCostOfTrip);
bookButton.addEventListener('click', onClickBook);

submitToTravelAgentButton.addEventListener('click', () => {
  submitTripRequest(potentialVacation)
    .then((data) => {
      newTripFromInput = data;
      displayStatus(newTripFromInput);
    })
    .catch((error) => console.error(`Error at ${error}`));
});

export { newTripFromInput };
