/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchPromises": () => (/* binding */ fetchPromises),
/* harmony export */   "dataFromEndpoints": () => (/* binding */ dataFromEndpoints),
/* harmony export */   "submitTripRequest": () => (/* binding */ submitTripRequest),
/* harmony export */   "fetchFromEndPoints": () => (/* binding */ fetchFromEndPoints)
/* harmony export */ });
// --------- Global Fetched Data Variable
const dataFromEndpoints = {}

// --------- Endpoint URL Name list for interpolation
const endPointNameList = ['travelers', 'trips', 'destinations']

// --------- GET request
const fetchFromEndPoints = endPointName => {
  return fetch(`https://travel-tracker-9xj88ajhi-judy0ye.vercel.app/api/v1/${endPointName}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject('Request failed: ', + res.status)
      }
      return res.json()
    })
    .then(data => {
      dataFromEndpoints[endPointName] = data
    })
    .catch(error => console.error('Request failed from catch', error))
}

const fetchPromises = endPointNameList.map(endPoint => fetchFromEndPoints(endPoint))

// --------- POST request
const submitTripRequest = (potentialVacation) => {
  return fetch(`https://travel-tracker-9xj88ajhi-judy0ye.vercel.app/api/v1/trips`, {
    method: 'POST',
    body: JSON.stringify(potentialVacation),
    headers:{ 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .catch(error => console.error(`Error at ${error}`))
}











/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentTraveler": () => (/* binding */ currentTraveler),
/* harmony export */   "loginForm": () => (/* binding */ loginForm),
/* harmony export */   "tripSubmissionForm": () => (/* binding */ tripSubmissionForm),
/* harmony export */   "submitToTravelAgentButton": () => (/* binding */ submitToTravelAgentButton),
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "displayCostOfTrip": () => (/* binding */ displayCostOfTrip),
/* harmony export */   "getDestinationList": () => (/* binding */ getDestinationList),
/* harmony export */   "potentialVacation": () => (/* binding */ potentialVacation),
/* harmony export */   "displayTravelerTrips": () => (/* binding */ displayTravelerTrips),
/* harmony export */   "displayStatus": () => (/* binding */ displayStatus),
/* harmony export */   "setCalendarMinDate": () => (/* binding */ setCalendarMinDate),
/* harmony export */   "specificYearDropdown": () => (/* binding */ specificYearDropdown),
/* harmony export */   "displayYearlyExpense": () => (/* binding */ displayYearlyExpense),
/* harmony export */   "onClickBook": () => (/* binding */ onClickBook),
/* harmony export */   "bookButton": () => (/* binding */ bookButton),
/* harmony export */   "toggle": () => (/* binding */ toggle),
/* harmony export */   "loginButton": () => (/* binding */ loginButton)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);




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
    const traveler = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getTravelerById)(travelerId, _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.travelers);
    currentTraveler = traveler;
    loginForm.classList.add('hidden');
  } else {
    invalidLoginMessage.innerHTML = `<p>Please enter a valid username and/or password</p>`;
    loginButton.classList.add('disable-button');
  }

  getYearList();
  displayWelcomeMessage();
  displayTravelerTrips(_apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints);
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
  _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.destinations.destinations.forEach((destination) => {
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
  const trips = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getAllTrips)(
    currentTraveler.id,
    dataFromEndpoints.trips,
    dataFromEndpoints.destinations
  );
  const tripDestinations = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getAllDestination)(
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
  const expense = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getYearlyExpense)(
    currentTraveler.id,
    year,
    _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.trips,
    _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.destinations
  );

  expenseThisYear.innerHTML = `<p>Total Expense for ${year}: $${expense} </p>`;
};

const getYearList = () => {
  const uniqueYears = new Set();

  _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.trips.trips.filter((trip) => trip.userID === currentTraveler.id)
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
  const destination = _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.destinations.destinations.find(
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

  potentialVacation = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.createVacation)(currentTraveler, tripEstimationData);

  const matchingDestination = _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.destinations.destinations.find(
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
  const matchingDestination = _apiCalls__WEBPACK_IMPORTED_MODULE_0__.dataFromEndpoints.destinations.destinations.find(
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




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllTrips": () => (/* binding */ getAllTrips),
/* harmony export */   "getAllDestination": () => (/* binding */ getAllDestination),
/* harmony export */   "getYearlyExpense": () => (/* binding */ getYearlyExpense),
/* harmony export */   "getTravelerById": () => (/* binding */ getTravelerById),
/* harmony export */   "createVacation": () => (/* binding */ createVacation)
/* harmony export */ });
const getTravelerById = (travelerId, travelersData) => {
  return travelersData.travelers.find(traveler => traveler.id === travelerId)
}

const getAllTrips = (travelerId, tripsData) => {
  return tripsData.trips.filter(trip => trip.userID === travelerId)
}

const getAllDestination = (travelerId, tripsData, destinationsData) => {
  const travelerTrips = tripsData.trips.filter(trip => trip.userID === travelerId)

  return destinationsData.destinations.filter(destination => {
    return travelerTrips.map(trip => trip.destinationID).includes(destination.id)
  })
}

const getYearlyExpense = (travelerId, year, tripsData, destinationData) => {
  const tripsInTheSameYear = tripsData.trips
    .filter(trip => trip.userID === travelerId)
    .filter(trip => trip.date.split('/')[0] === year)

  return destinationData.destinations.reduce((total, destination) => {
    tripsInTheSameYear.forEach(trip => {
      if (trip.destinationID === destination.id) {
        const totalFlightCostForTrip = trip.travelers * destination.estimatedFlightCostPerPerson;
        const totalLodgingCostForTrip = destination.estimatedLodgingCostPerDay * trip.duration
        const totalCostOfFlightAndLodging = totalLodgingCostForTrip + totalFlightCostForTrip
        const travelAgentFee = totalCostOfFlightAndLodging * .10
        total += totalCostOfFlightAndLodging + travelAgentFee
      }
    })
    return total
  }, 0)
}

const createVacation = (traveler, destinationData) => {
  return {
    id: Date.now(),
    userID: traveler.id,
    destinationID: destinationData.destination,
    travelers: destinationData.numOfTravelers,
    date: destinationData.calendar.replaceAll('-', '/'),
    duration: destinationData.duration,
    status: "pending",
    suggestedActivities: [],
  }
}



/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 6 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\n html {\n    line-height: 1.15; /* 1 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n  }\n  \n  /* Sections\n     ========================================================================== */\n  \n  /**\n   * Remove the margin in all browsers.\n   */\n  \n  body {\n    margin: 0;\n  }\n  \n  /**\n   * Render the `main` element consistently in IE.\n   */\n  \n  main {\n    display: block;\n  }\n  \n  /**\n   * Correct the font size and margin on `h1` elements within `section` and\n   * `article` contexts in Chrome, Firefox, and Safari.\n   */\n  \n  h1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n  }\n  \n  /* Grouping content\n     ========================================================================== */\n  \n  /**\n   * 1. Add the correct box sizing in Firefox.\n   * 2. Show the overflow in Edge and IE.\n   */\n  \n  hr {\n    box-sizing: content-box; /* 1 */\n    height: 0; /* 1 */\n    overflow: visible; /* 2 */\n  }\n  \n  /**\n   * 1. Correct the inheritance and scaling of font size in all browsers.\n   * 2. Correct the odd `em` font sizing in all browsers.\n   */\n  \n  pre {\n    font-family: monospace, monospace; /* 1 */\n    font-size: 1em; /* 2 */\n  }\n  \n  /* Text-level semantics\n     ========================================================================== */\n  \n  /**\n   * Remove the gray background on active links in IE 10.\n   */\n  \n  a {\n    background-color: transparent;\n  }\n  \n  /**\n   * 1. Remove the bottom border in Chrome 57-\n   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n   */\n  \n  abbr[title] {\n    border-bottom: none; /* 1 */\n    text-decoration: underline; /* 2 */\n    text-decoration: underline dotted; /* 2 */\n  }\n  \n  /**\n   * Add the correct font weight in Chrome, Edge, and Safari.\n   */\n  \n  b,\n  strong {\n    font-weight: bolder;\n  }\n  \n  /**\n   * 1. Correct the inheritance and scaling of font size in all browsers.\n   * 2. Correct the odd `em` font sizing in all browsers.\n   */\n  \n  code,\n  kbd,\n  samp {\n    font-family: monospace, monospace; /* 1 */\n    font-size: 1em; /* 2 */\n  }\n  \n  /**\n   * Add the correct font size in all browsers.\n   */\n  \n  small {\n    font-size: 80%;\n  }\n  \n  /**\n   * Prevent `sub` and `sup` elements from affecting the line height in\n   * all browsers.\n   */\n  \n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  \n  sub {\n    bottom: -0.25em;\n  }\n  \n  sup {\n    top: -0.5em;\n  }\n  \n  /* Embedded content\n     ========================================================================== */\n  \n  /**\n   * Remove the border on images inside links in IE 10.\n   */\n  \n  img {\n    border-style: none;\n  }\n  \n  /* Forms\n     ========================================================================== */\n  \n  /**\n   * 1. Change the font styles in all browsers.\n   * 2. Remove the margin in Firefox and Safari.\n   */\n  \n  button,\n  input,\n  optgroup,\n  select,\n  textarea {\n    font-family: inherit; /* 1 */\n    font-size: 100%; /* 1 */\n    line-height: 1.15; /* 1 */\n    margin: 0; /* 2 */\n  }\n  \n  /**\n   * Show the overflow in IE.\n   * 1. Show the overflow in Edge.\n   */\n  \n  button,\n  input { /* 1 */\n    overflow: visible;\n  }\n  \n  /**\n   * Remove the inheritance of text transform in Edge, Firefox, and IE.\n   * 1. Remove the inheritance of text transform in Firefox.\n   */\n  \n  button,\n  select { /* 1 */\n    text-transform: none;\n  }\n  \n  /**\n   * Correct the inability to style clickable types in iOS and Safari.\n   */\n  \n  button,\n  [type=\"button\"],\n  [type=\"reset\"],\n  [type=\"submit\"] {\n    -webkit-appearance: button;\n  }\n  \n  /**\n   * Remove the inner border and padding in Firefox.\n   */\n  \n  button::-moz-focus-inner,\n  [type=\"button\"]::-moz-focus-inner,\n  [type=\"reset\"]::-moz-focus-inner,\n  [type=\"submit\"]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n  \n  /**\n   * Restore the focus styles unset by the previous rule.\n   */\n  \n  button:-moz-focusring,\n  [type=\"button\"]:-moz-focusring,\n  [type=\"reset\"]:-moz-focusring,\n  [type=\"submit\"]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n  \n  /**\n   * Correct the padding in Firefox.\n   */\n  \n  fieldset {\n    padding: 0.35em 0.75em 0.625em;\n  }\n  \n  /**\n   * 1. Correct the text wrapping in Edge and IE.\n   * 2. Correct the color inheritance from `fieldset` elements in IE.\n   * 3. Remove the padding so developers are not caught out when they zero out\n   *    `fieldset` elements in all browsers.\n   */\n  \n  legend {\n    box-sizing: border-box; /* 1 */\n    color: inherit; /* 2 */\n    display: table; /* 1 */\n    max-width: 100%; /* 1 */\n    padding: 0; /* 3 */\n    white-space: normal; /* 1 */\n  }\n  \n  /**\n   * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n   */\n  \n  progress {\n    vertical-align: baseline;\n  }\n  \n  /**\n   * Remove the default vertical scrollbar in IE 10+.\n   */\n  \n  textarea {\n    overflow: auto;\n  }\n  \n  /**\n   * 1. Add the correct box sizing in IE 10.\n   * 2. Remove the padding in IE 10.\n   */\n  \n  [type=\"checkbox\"],\n  [type=\"radio\"] {\n    box-sizing: border-box; /* 1 */\n    padding: 0; /* 2 */\n  }\n  \n  /**\n   * Correct the cursor style of increment and decrement buttons in Chrome.\n   */\n  \n  [type=\"number\"]::-webkit-inner-spin-button,\n  [type=\"number\"]::-webkit-outer-spin-button {\n    height: auto;\n  }\n  \n  /**\n   * 1. Correct the odd appearance in Chrome and Safari.\n   * 2. Correct the outline style in Safari.\n   */\n  \n  [type=\"search\"] {\n    -webkit-appearance: textfield; /* 1 */\n    outline-offset: -2px; /* 2 */\n  }\n  \n  /**\n   * Remove the inner padding in Chrome and Safari on macOS.\n   */\n  \n  [type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  \n  /**\n   * 1. Correct the inability to style clickable types in iOS and Safari.\n   * 2. Change font properties to `inherit` in Safari.\n   */\n  \n  ::-webkit-file-upload-button {\n    -webkit-appearance: button; /* 1 */\n    font: inherit; /* 2 */\n  }\n  \n  /* Interactive\n     ========================================================================== */\n  \n  /*\n   * Add the correct display in Edge, IE 10+, and Firefox.\n   */\n  \n  details {\n    display: block;\n  }\n  \n  /*\n   * Add the correct display in all browsers.\n   */\n  \n  summary {\n    display: list-item;\n  }\n  \n  /* Misc\n     ========================================================================== */\n  \n  /**\n   * Add the correct display in IE 10+.\n   */\n  \n  template {\n    display: none;\n  }\n  \n  /**\n   * Add the correct display in IE 10.\n   */\n  \n  [hidden] {\n    display: none;\n  }", "",{"version":3,"sources":["webpack://./src/css/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;CAED;IACG,iBAAiB,EAAE,MAAM;IACzB,8BAA8B,EAAE,MAAM;EACxC;;EAEA;iFAC+E;;EAE/E;;IAEE;;EAEF;IACE,SAAS;EACX;;EAEA;;IAEE;;EAEF;IACE,cAAc;EAChB;;EAEA;;;IAGE;;EAEF;IACE,cAAc;IACd,gBAAgB;EAClB;;EAEA;iFAC+E;;EAE/E;;;IAGE;;EAEF;IACE,uBAAuB,EAAE,MAAM;IAC/B,SAAS,EAAE,MAAM;IACjB,iBAAiB,EAAE,MAAM;EAC3B;;EAEA;;;IAGE;;EAEF;IACE,iCAAiC,EAAE,MAAM;IACzC,cAAc,EAAE,MAAM;EACxB;;EAEA;iFAC+E;;EAE/E;;IAEE;;EAEF;IACE,6BAA6B;EAC/B;;EAEA;;;IAGE;;EAEF;IACE,mBAAmB,EAAE,MAAM;IAC3B,0BAA0B,EAAE,MAAM;IAClC,iCAAiC,EAAE,MAAM;EAC3C;;EAEA;;IAEE;;EAEF;;IAEE,mBAAmB;EACrB;;EAEA;;;IAGE;;EAEF;;;IAGE,iCAAiC,EAAE,MAAM;IACzC,cAAc,EAAE,MAAM;EACxB;;EAEA;;IAEE;;EAEF;IACE,cAAc;EAChB;;EAEA;;;IAGE;;EAEF;;IAEE,cAAc;IACd,cAAc;IACd,kBAAkB;IAClB,wBAAwB;EAC1B;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,WAAW;EACb;;EAEA;iFAC+E;;EAE/E;;IAEE;;EAEF;IACE,kBAAkB;EACpB;;EAEA;iFAC+E;;EAE/E;;;IAGE;;EAEF;;;;;IAKE,oBAAoB,EAAE,MAAM;IAC5B,eAAe,EAAE,MAAM;IACvB,iBAAiB,EAAE,MAAM;IACzB,SAAS,EAAE,MAAM;EACnB;;EAEA;;;IAGE;;EAEF;UACQ,MAAM;IACZ,iBAAiB;EACnB;;EAEA;;;IAGE;;EAEF;WACS,MAAM;IACb,oBAAoB;EACtB;;EAEA;;IAEE;;EAEF;;;;IAIE,0BAA0B;EAC5B;;EAEA;;IAEE;;EAEF;;;;IAIE,kBAAkB;IAClB,UAAU;EACZ;;EAEA;;IAEE;;EAEF;;;;IAIE,8BAA8B;EAChC;;EAEA;;IAEE;;EAEF;IACE,8BAA8B;EAChC;;EAEA;;;;;IAKE;;EAEF;IACE,sBAAsB,EAAE,MAAM;IAC9B,cAAc,EAAE,MAAM;IACtB,cAAc,EAAE,MAAM;IACtB,eAAe,EAAE,MAAM;IACvB,UAAU,EAAE,MAAM;IAClB,mBAAmB,EAAE,MAAM;EAC7B;;EAEA;;IAEE;;EAEF;IACE,wBAAwB;EAC1B;;EAEA;;IAEE;;EAEF;IACE,cAAc;EAChB;;EAEA;;;IAGE;;EAEF;;IAEE,sBAAsB,EAAE,MAAM;IAC9B,UAAU,EAAE,MAAM;EACpB;;EAEA;;IAEE;;EAEF;;IAEE,YAAY;EACd;;EAEA;;;IAGE;;EAEF;IACE,6BAA6B,EAAE,MAAM;IACrC,oBAAoB,EAAE,MAAM;EAC9B;;EAEA;;IAEE;;EAEF;IACE,wBAAwB;EAC1B;;EAEA;;;IAGE;;EAEF;IACE,0BAA0B,EAAE,MAAM;IAClC,aAAa,EAAE,MAAM;EACvB;;EAEA;iFAC+E;;EAE/E;;IAEE;;EAEF;IACE,cAAc;EAChB;;EAEA;;IAEE;;EAEF;IACE,kBAAkB;EACpB;;EAEA;iFAC+E;;EAE/E;;IAEE;;EAEF;IACE,aAAa;EACf;;EAEA;;IAEE;;EAEF;IACE,aAAa;EACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\n html {\n    line-height: 1.15; /* 1 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n  }\n  \n  /* Sections\n     ========================================================================== */\n  \n  /**\n   * Remove the margin in all browsers.\n   */\n  \n  body {\n    margin: 0;\n  }\n  \n  /**\n   * Render the `main` element consistently in IE.\n   */\n  \n  main {\n    display: block;\n  }\n  \n  /**\n   * Correct the font size and margin on `h1` elements within `section` and\n   * `article` contexts in Chrome, Firefox, and Safari.\n   */\n  \n  h1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n  }\n  \n  /* Grouping content\n     ========================================================================== */\n  \n  /**\n   * 1. Add the correct box sizing in Firefox.\n   * 2. Show the overflow in Edge and IE.\n   */\n  \n  hr {\n    box-sizing: content-box; /* 1 */\n    height: 0; /* 1 */\n    overflow: visible; /* 2 */\n  }\n  \n  /**\n   * 1. Correct the inheritance and scaling of font size in all browsers.\n   * 2. Correct the odd `em` font sizing in all browsers.\n   */\n  \n  pre {\n    font-family: monospace, monospace; /* 1 */\n    font-size: 1em; /* 2 */\n  }\n  \n  /* Text-level semantics\n     ========================================================================== */\n  \n  /**\n   * Remove the gray background on active links in IE 10.\n   */\n  \n  a {\n    background-color: transparent;\n  }\n  \n  /**\n   * 1. Remove the bottom border in Chrome 57-\n   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n   */\n  \n  abbr[title] {\n    border-bottom: none; /* 1 */\n    text-decoration: underline; /* 2 */\n    text-decoration: underline dotted; /* 2 */\n  }\n  \n  /**\n   * Add the correct font weight in Chrome, Edge, and Safari.\n   */\n  \n  b,\n  strong {\n    font-weight: bolder;\n  }\n  \n  /**\n   * 1. Correct the inheritance and scaling of font size in all browsers.\n   * 2. Correct the odd `em` font sizing in all browsers.\n   */\n  \n  code,\n  kbd,\n  samp {\n    font-family: monospace, monospace; /* 1 */\n    font-size: 1em; /* 2 */\n  }\n  \n  /**\n   * Add the correct font size in all browsers.\n   */\n  \n  small {\n    font-size: 80%;\n  }\n  \n  /**\n   * Prevent `sub` and `sup` elements from affecting the line height in\n   * all browsers.\n   */\n  \n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  \n  sub {\n    bottom: -0.25em;\n  }\n  \n  sup {\n    top: -0.5em;\n  }\n  \n  /* Embedded content\n     ========================================================================== */\n  \n  /**\n   * Remove the border on images inside links in IE 10.\n   */\n  \n  img {\n    border-style: none;\n  }\n  \n  /* Forms\n     ========================================================================== */\n  \n  /**\n   * 1. Change the font styles in all browsers.\n   * 2. Remove the margin in Firefox and Safari.\n   */\n  \n  button,\n  input,\n  optgroup,\n  select,\n  textarea {\n    font-family: inherit; /* 1 */\n    font-size: 100%; /* 1 */\n    line-height: 1.15; /* 1 */\n    margin: 0; /* 2 */\n  }\n  \n  /**\n   * Show the overflow in IE.\n   * 1. Show the overflow in Edge.\n   */\n  \n  button,\n  input { /* 1 */\n    overflow: visible;\n  }\n  \n  /**\n   * Remove the inheritance of text transform in Edge, Firefox, and IE.\n   * 1. Remove the inheritance of text transform in Firefox.\n   */\n  \n  button,\n  select { /* 1 */\n    text-transform: none;\n  }\n  \n  /**\n   * Correct the inability to style clickable types in iOS and Safari.\n   */\n  \n  button,\n  [type=\"button\"],\n  [type=\"reset\"],\n  [type=\"submit\"] {\n    -webkit-appearance: button;\n  }\n  \n  /**\n   * Remove the inner border and padding in Firefox.\n   */\n  \n  button::-moz-focus-inner,\n  [type=\"button\"]::-moz-focus-inner,\n  [type=\"reset\"]::-moz-focus-inner,\n  [type=\"submit\"]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n  \n  /**\n   * Restore the focus styles unset by the previous rule.\n   */\n  \n  button:-moz-focusring,\n  [type=\"button\"]:-moz-focusring,\n  [type=\"reset\"]:-moz-focusring,\n  [type=\"submit\"]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n  \n  /**\n   * Correct the padding in Firefox.\n   */\n  \n  fieldset {\n    padding: 0.35em 0.75em 0.625em;\n  }\n  \n  /**\n   * 1. Correct the text wrapping in Edge and IE.\n   * 2. Correct the color inheritance from `fieldset` elements in IE.\n   * 3. Remove the padding so developers are not caught out when they zero out\n   *    `fieldset` elements in all browsers.\n   */\n  \n  legend {\n    box-sizing: border-box; /* 1 */\n    color: inherit; /* 2 */\n    display: table; /* 1 */\n    max-width: 100%; /* 1 */\n    padding: 0; /* 3 */\n    white-space: normal; /* 1 */\n  }\n  \n  /**\n   * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n   */\n  \n  progress {\n    vertical-align: baseline;\n  }\n  \n  /**\n   * Remove the default vertical scrollbar in IE 10+.\n   */\n  \n  textarea {\n    overflow: auto;\n  }\n  \n  /**\n   * 1. Add the correct box sizing in IE 10.\n   * 2. Remove the padding in IE 10.\n   */\n  \n  [type=\"checkbox\"],\n  [type=\"radio\"] {\n    box-sizing: border-box; /* 1 */\n    padding: 0; /* 2 */\n  }\n  \n  /**\n   * Correct the cursor style of increment and decrement buttons in Chrome.\n   */\n  \n  [type=\"number\"]::-webkit-inner-spin-button,\n  [type=\"number\"]::-webkit-outer-spin-button {\n    height: auto;\n  }\n  \n  /**\n   * 1. Correct the odd appearance in Chrome and Safari.\n   * 2. Correct the outline style in Safari.\n   */\n  \n  [type=\"search\"] {\n    -webkit-appearance: textfield; /* 1 */\n    outline-offset: -2px; /* 2 */\n  }\n  \n  /**\n   * Remove the inner padding in Chrome and Safari on macOS.\n   */\n  \n  [type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  \n  /**\n   * 1. Correct the inability to style clickable types in iOS and Safari.\n   * 2. Change font properties to `inherit` in Safari.\n   */\n  \n  ::-webkit-file-upload-button {\n    -webkit-appearance: button; /* 1 */\n    font: inherit; /* 2 */\n  }\n  \n  /* Interactive\n     ========================================================================== */\n  \n  /*\n   * Add the correct display in Edge, IE 10+, and Firefox.\n   */\n  \n  details {\n    display: block;\n  }\n  \n  /*\n   * Add the correct display in all browsers.\n   */\n  \n  summary {\n    display: list-item;\n  }\n  \n  /* Misc\n     ========================================================================== */\n  \n  /**\n   * Add the correct display in IE 10+.\n   */\n  \n  template {\n    display: none;\n  }\n  \n  /**\n   * Add the correct display in IE 10.\n   */\n  \n  [hidden] {\n    display: none;\n  }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 7 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 8 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 10 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_astra_liu_pEZ9uGCEdF4_unsplash_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_astra_liu_pEZ9uGCEdF4_unsplash_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  margin: 0;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-position: center center;\n  background-attachment: fixed;\n}\n\n/* header */\nheader {\n  width: 100vw;\n  height: 25vh;\n}\n\n.header-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 1fr;\n  grid-template-areas: 'left-header login-section';\n}\n\n.left-header {\n  grid-area: left-header;\n  background-color: #2e3038;\n}\n\n.left-header img,\n.left-header h1 {\n  margin-top: 10px;\n  margin-left: 15px;\n}\n\n#headerTitle,\n.welcome-message {\n  color: white;\n}\n\n.welcome-message {\n  font-size: xx-large;\n  font-weight: bold;\n  padding-inline-end: 0.65em;\n}\n\n.login-section {\n  background-color: #2e3038;\n  grid-area: login-section;\n  display: flex;\n  align-items: flex-end;\n  color: white;\n  flex-direction: column;\n}\n\n/* for screen readers to gain focus on input first */\n.login label {\n  order: 2;\n}\n\n.login input {\n  order: 1;\n}\n\n.login {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: flex-end;\n  padding: 0.2em 1em;\n  margin-top: 20px;\n  margin-right: 20px;\n}\n\n#username,\n#password,\n.submit {\n  margin: 0.4em;\n}\n\n.submit {\n  height: 2em;\n  width: 15em;\n}\n\n/* dashboard panel */\nmain {\n  position: relative;\n  width: 100%;\n  height: 100vh;\n}\n\n.dashboard {\n  margin-top: 20px;\n  color: antiquewhite;\n  display: grid;\n  height: 100vh;\n  width: 100vw;\n  grid-template-columns: 1.2fr 0.8fr;\n  grid-template-rows: 1fr;\n  column-gap: 1em;\n  grid-template-areas: 'left-side right-side';\n}\n\n.left-side {\n  grid-area: left-side;\n  row-gap: 1em;\n  margin-left: 2em;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 1.6fr 0.4fr;\n  grid-template-areas:\n    'trip-info '\n    'yearly-expense';\n  overflow-y: hidden;\n}\n\n.right-side {\n  grid-area: right-side;\n  margin-right: 2em;\n  row-gap: 1em;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 1.2fr 0.8fr;\n  grid-template-areas:\n    'traveler-inputs'\n    'cost-estimation';\n  overflow-y: hidden;\n}\n\n.book-trip {\n  align-items: center;\n  height: 8em;\n}\n\n.book-trip,\n.traveler-inputs,\n.cost-estimation,\n.trip-info,\n.yearly-expense {\n  background-color: #2e3038;\n  border-radius: 35px 35px 35px 35px;\n  -moz-border-radius: 35px 35px 35px 35px;\n  -webkit-border-radius: 35px 35px 35px 35px;\n  border: 5px solid #939cab;\n  opacity: 95%;\n}\n\n.book-trip,\n.traveler-inputs,\n.cost-estimation,\n.trip-info {\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.book-trip,\n.traveler-inputs {\n  grid-area: traveler-inputs;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.cost-estimation {\n  grid-area: cost-estimation;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.trip-cost-estimation div{\n  display: flex;\n  justify-content: space-between\n}\n.trip-cost-estimation div p{\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0.35em 2em 0.35em;\n}\n\n\n\n.trip-info {\n  grid-area: trip-info;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n/* Style the scrollbar track */\n.trip-info::-webkit-scrollbar,\n.traveler-inputs::-webkit-scrollbar,\n.book-trip::-webkit-scrollbar,\n.cost-estimation::-webkit-scrollbar,\n.yearly-expense::-webkit-scrollbar {\n  width: 10px;\n  border-radius: 45px;\n}\n\n/* Style the scrollbar thumb */\n.trip-info::-webkit-scrollbar-thumb,\n.traveler-inputs::-webkit-scrollbar-thumb,\n.book-trip::-webkit-scrollbar-thumb,\n.cost-estimation::-webkit-scrollbar-thumb,\n.yearly-expense::-webkit-scrollbar-thumb {\n  background-color: #939cab;\n  border-radius: 35px 600px 600px 35px;\n}\n\n/* Style the scrollbar track */\n.trip-info::-webkit-scrollbar-track,\n.traveler-inputs::-webkit-scrollbar-track,\n.book-trip::-webkit-scrollbar-track-track,\n.cost-estimation::-webkit-scrollbar-track,\n.yearly-expense::-webkit-scrollbar-track {\n  background-color: #f0f0f0;\n  border-radius: 35px 600px 600px 35px;\n  margin: 0.3em;\n}\n\n/* Hide scrollbar for Chrome, Safari and Opera */\nbody::-webkit-scrollbar {\n  display: none;\n}\n\n/* Hide scrollbar for IE, Edge and Firefox */\nbody {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n\n.past-trips {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.yearly-expense {\n  grid-area: yearly-expense;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#trip-submission div {\n  display: flex;\n  padding: 0.5em;\n  margin: 0.5em 1.5em;\n  flex-direction: column;\n}\n\n#trip-submission input,\n.login input {\n  height: 1.5em;\n  border-radius: 5px;\n}\n\n#trip-submission select {\n  height: 1.5em;\n  border-radius: 5px;\n}\n\n#specific-year {\n  width: 7em;\n  text-align: center;\n}\n\n.form-submit {\n  align-items: center;\n}\n\n.card-container {\n  display: flex;\n}\n\n.trip-cards {\n  border: 1px #bebebe solid;\n  margin: 1em;\n  height: 60vh;\n  width: 40vw;\n  box-shadow: 1px 1px 1px 2px #767f7a;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n}\n\n.trip-cards h3 {\n  font-size: 1.5rem;\n}\n\n.trip-image {\n  height: 35vh;\n  width: 40vw;\n}\n\n.book-button,\n#submit-to-travel-agent,\n.submit,\n.submit-estimate {\n  box-shadow: 1px 1px 3px 0px #899599;\n  background: linear-gradient(to bottom, #ededed 5%, #e1e3ed 100%);\n  background-color: #ededed;\n  border-radius: 10px;\n  border: 2px solid #899599;\n  display: inline-block;\n  cursor: pointer;\n  color: #333333;\n  font-family: Arial;\n  font-size: 19px;\n  padding: 6px 43px;\n  text-decoration: none;\n  text-shadow: 0px 0px 0px #e1e2ed;\n}\n\n.book-button:hover,\n#submit-to-travel-agent:hover,\n.submit:hover,\n.submit-estimate:hover {\n  background: linear-gradient(to bottom, #e1e3ed 10%, #928e8e 100%);\n  background-color: #e1e3ed;\n}\n\n.submit-estimate,\n.submit {\n  padding-bottom: 1.45em;\n}\n\n#submit-to-travel-agent.disable-button,\n.submit.disable-button {\n  background-color: #ededf3;\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.hidden {\n  display: none !important;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,yDAAmE;EACnE,sBAAsB;EACtB,kCAAkC;EAClC,4BAA4B;AAC9B;;AAEA,WAAW;AACX;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,uBAAuB;EACvB,gDAAgD;AAClD;;AAEA;EACE,sBAAsB;EACtB,yBAAyB;AAC3B;;AAEA;;EAEE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;;EAEE,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,iBAAiB;EACjB,0BAA0B;AAC5B;;AAEA;EACE,yBAAyB;EACzB,wBAAwB;EACxB,aAAa;EACb,qBAAqB;EACrB,YAAY;EACZ,sBAAsB;AACxB;;AAEA,oDAAoD;AACpD;EACE,QAAQ;AACV;;AAEA;EACE,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,qBAAqB;EACrB,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;;;EAGE,aAAa;AACf;;AAEA;EACE,WAAW;EACX,WAAW;AACb;;AAEA,oBAAoB;AACpB;EACE,kBAAkB;EAClB,WAAW;EACX,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,aAAa;EACb,aAAa;EACb,YAAY;EACZ,kCAAkC;EAClC,uBAAuB;EACvB,eAAe;EACf,2CAA2C;AAC7C;;AAEA;EACE,oBAAoB;EACpB,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,0BAA0B;EAC1B,+BAA+B;EAC/B;;oBAEkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,+BAA+B;EAC/B;;qBAEmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;EACnB,WAAW;AACb;;AAEA;;;;;EAKE,yBAAyB;EACzB,kCAAkC;EAClC,uCAAuC;EACvC,0CAA0C;EAC1C,yBAAyB;EACzB,YAAY;AACd;;AAEA;;;;EAIE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;;EAEE,0BAA0B;EAC1B,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,0BAA0B;EAC1B,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb;AACF;AACA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,yBAAyB;AAC3B;;;;AAIA;EACE,oBAAoB;;EAEpB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA,8BAA8B;AAC9B;;;;;EAKE,WAAW;EACX,mBAAmB;AACrB;;AAEA,8BAA8B;AAC9B;;;;;EAKE,yBAAyB;EACzB,oCAAoC;AACtC;;AAEA,8BAA8B;AAC9B;;;;;EAKE,yBAAyB;EACzB,oCAAoC;EACpC,aAAa;AACf;;AAEA,gDAAgD;AAChD;EACE,aAAa;AACf;;AAEA,4CAA4C;AAC5C;EACE,wBAAwB;EACxB,qBAAqB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;;EAEE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,YAAY;EACZ,WAAW;EACX,mCAAmC;EACnC,aAAa;EACb,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;;;;EAIE,mCAAmC;EACnC,gEAAgE;EAChE,yBAAyB;EACzB,mBAAmB;EACnB,yBAAyB;EACzB,qBAAqB;EACrB,eAAe;EACf,cAAc;EACd,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,qBAAqB;EACrB,gCAAgC;AAClC;;AAEA;;;;EAIE,iEAAiE;EACjE,yBAAyB;AAC3B;;AAEA;;EAEE,sBAAsB;AACxB;;AAEA;;EAEE,yBAAyB;EACzB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,wBAAwB;AAC1B","sourcesContent":["body {\n  margin: 0;\n  background-image: url(../images/astra-liu-pEZ9uGCEdF4-unsplash.jpg);\n  background-size: cover;\n  background-position: center center;\n  background-attachment: fixed;\n}\n\n/* header */\nheader {\n  width: 100vw;\n  height: 25vh;\n}\n\n.header-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-template-rows: 1fr;\n  grid-template-areas: 'left-header login-section';\n}\n\n.left-header {\n  grid-area: left-header;\n  background-color: #2e3038;\n}\n\n.left-header img,\n.left-header h1 {\n  margin-top: 10px;\n  margin-left: 15px;\n}\n\n#headerTitle,\n.welcome-message {\n  color: white;\n}\n\n.welcome-message {\n  font-size: xx-large;\n  font-weight: bold;\n  padding-inline-end: 0.65em;\n}\n\n.login-section {\n  background-color: #2e3038;\n  grid-area: login-section;\n  display: flex;\n  align-items: flex-end;\n  color: white;\n  flex-direction: column;\n}\n\n/* for screen readers to gain focus on input first */\n.login label {\n  order: 2;\n}\n\n.login input {\n  order: 1;\n}\n\n.login {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: flex-end;\n  padding: 0.2em 1em;\n  margin-top: 20px;\n  margin-right: 20px;\n}\n\n#username,\n#password,\n.submit {\n  margin: 0.4em;\n}\n\n.submit {\n  height: 2em;\n  width: 15em;\n}\n\n/* dashboard panel */\nmain {\n  position: relative;\n  width: 100%;\n  height: 100vh;\n}\n\n.dashboard {\n  margin-top: 20px;\n  color: antiquewhite;\n  display: grid;\n  height: 100vh;\n  width: 100vw;\n  grid-template-columns: 1.2fr 0.8fr;\n  grid-template-rows: 1fr;\n  column-gap: 1em;\n  grid-template-areas: 'left-side right-side';\n}\n\n.left-side {\n  grid-area: left-side;\n  row-gap: 1em;\n  margin-left: 2em;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 1.6fr 0.4fr;\n  grid-template-areas:\n    'trip-info '\n    'yearly-expense';\n  overflow-y: hidden;\n}\n\n.right-side {\n  grid-area: right-side;\n  margin-right: 2em;\n  row-gap: 1em;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 1.2fr 0.8fr;\n  grid-template-areas:\n    'traveler-inputs'\n    'cost-estimation';\n  overflow-y: hidden;\n}\n\n.book-trip {\n  align-items: center;\n  height: 8em;\n}\n\n.book-trip,\n.traveler-inputs,\n.cost-estimation,\n.trip-info,\n.yearly-expense {\n  background-color: #2e3038;\n  border-radius: 35px 35px 35px 35px;\n  -moz-border-radius: 35px 35px 35px 35px;\n  -webkit-border-radius: 35px 35px 35px 35px;\n  border: 5px solid #939cab;\n  opacity: 95%;\n}\n\n.book-trip,\n.traveler-inputs,\n.cost-estimation,\n.trip-info {\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n\n.book-trip,\n.traveler-inputs {\n  grid-area: traveler-inputs;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.cost-estimation {\n  grid-area: cost-estimation;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.trip-cost-estimation div{\n  display: flex;\n  justify-content: space-between\n}\n.trip-cost-estimation div p{\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0.35em 2em 0.35em;\n}\n\n\n\n.trip-info {\n  grid-area: trip-info;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n/* Style the scrollbar track */\n.trip-info::-webkit-scrollbar,\n.traveler-inputs::-webkit-scrollbar,\n.book-trip::-webkit-scrollbar,\n.cost-estimation::-webkit-scrollbar,\n.yearly-expense::-webkit-scrollbar {\n  width: 10px;\n  border-radius: 45px;\n}\n\n/* Style the scrollbar thumb */\n.trip-info::-webkit-scrollbar-thumb,\n.traveler-inputs::-webkit-scrollbar-thumb,\n.book-trip::-webkit-scrollbar-thumb,\n.cost-estimation::-webkit-scrollbar-thumb,\n.yearly-expense::-webkit-scrollbar-thumb {\n  background-color: #939cab;\n  border-radius: 35px 600px 600px 35px;\n}\n\n/* Style the scrollbar track */\n.trip-info::-webkit-scrollbar-track,\n.traveler-inputs::-webkit-scrollbar-track,\n.book-trip::-webkit-scrollbar-track-track,\n.cost-estimation::-webkit-scrollbar-track,\n.yearly-expense::-webkit-scrollbar-track {\n  background-color: #f0f0f0;\n  border-radius: 35px 600px 600px 35px;\n  margin: 0.3em;\n}\n\n/* Hide scrollbar for Chrome, Safari and Opera */\nbody::-webkit-scrollbar {\n  display: none;\n}\n\n/* Hide scrollbar for IE, Edge and Firefox */\nbody {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n\n.past-trips {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.yearly-expense {\n  grid-area: yearly-expense;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#trip-submission div {\n  display: flex;\n  padding: 0.5em;\n  margin: 0.5em 1.5em;\n  flex-direction: column;\n}\n\n#trip-submission input,\n.login input {\n  height: 1.5em;\n  border-radius: 5px;\n}\n\n#trip-submission select {\n  height: 1.5em;\n  border-radius: 5px;\n}\n\n#specific-year {\n  width: 7em;\n  text-align: center;\n}\n\n.form-submit {\n  align-items: center;\n}\n\n.card-container {\n  display: flex;\n}\n\n.trip-cards {\n  border: 1px #bebebe solid;\n  margin: 1em;\n  height: 60vh;\n  width: 40vw;\n  box-shadow: 1px 1px 1px 2px #767f7a;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n}\n\n.trip-cards h3 {\n  font-size: 1.5rem;\n}\n\n.trip-image {\n  height: 35vh;\n  width: 40vw;\n}\n\n.book-button,\n#submit-to-travel-agent,\n.submit,\n.submit-estimate {\n  box-shadow: 1px 1px 3px 0px #899599;\n  background: linear-gradient(to bottom, #ededed 5%, #e1e3ed 100%);\n  background-color: #ededed;\n  border-radius: 10px;\n  border: 2px solid #899599;\n  display: inline-block;\n  cursor: pointer;\n  color: #333333;\n  font-family: Arial;\n  font-size: 19px;\n  padding: 6px 43px;\n  text-decoration: none;\n  text-shadow: 0px 0px 0px #e1e2ed;\n}\n\n.book-button:hover,\n#submit-to-travel-agent:hover,\n.submit:hover,\n.submit-estimate:hover {\n  background: linear-gradient(to bottom, #e1e3ed 10%, #928e8e 100%);\n  background-color: #e1e3ed;\n}\n\n.submit-estimate,\n.submit {\n  padding-bottom: 1.45em;\n}\n\n#submit-to-travel-agent.disable-button,\n.submit.disable-button {\n  background-color: #ededf3;\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.hidden {\n  display: none !important;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 11 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/astra-liu-pEZ9uGCEdF4-unsplash.jpg");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newTripFromInput": () => (/* binding */ newTripFromInput)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _css_normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _images_astra_liu_pEZ9uGCEdF4_unsplash_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********









// --------- global variable
let newTripFromInput;

// --------- event listeners
window.addEventListener('load', function () {
  Promise.all(_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchPromises)
    .then(() => {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.getDestinationList)();
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.setCalendarMinDate)();
    })
    .catch((error) => console.log('Request failed from Promise.all', error));
});

_domUpdates__WEBPACK_IMPORTED_MODULE_1__.loginForm.addEventListener('submit', _domUpdates__WEBPACK_IMPORTED_MODULE_1__.login);
_domUpdates__WEBPACK_IMPORTED_MODULE_1__.loginForm.addEventListener('input', _domUpdates__WEBPACK_IMPORTED_MODULE_1__.toggle);
_domUpdates__WEBPACK_IMPORTED_MODULE_1__.specificYearDropdown.addEventListener('change', _domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayYearlyExpense);
_domUpdates__WEBPACK_IMPORTED_MODULE_1__.tripSubmissionForm.addEventListener('submit', _domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayCostOfTrip);
_domUpdates__WEBPACK_IMPORTED_MODULE_1__.bookButton.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_1__.onClickBook);

_domUpdates__WEBPACK_IMPORTED_MODULE_1__.submitToTravelAgentButton.addEventListener('click', () => {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.submitTripRequest)(_domUpdates__WEBPACK_IMPORTED_MODULE_1__.potentialVacation)
    .then((data) => {
      if (data) {
        newTripFromInput = data;
      return (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.fetchFromEndPoints)(`trips`)
      .then(() => { 
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.displayStatus)(newTripFromInput); 
      })}  
    })
    .catch((error) => console.error(`Error at ${error}`));
});



    
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map