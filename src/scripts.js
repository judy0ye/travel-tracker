// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import {
  fetchFromEndPoints
} from './apiCalls'

import {
  getAllTrips
} from '../src/utils'

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

window.addEventListener('load', function () {
  Promise.all(fetchFromEndPoints())
    .then(data => {
      console.log('data:', data)
      console.log('travelers: ', data[0].travelers);
      console.log('trips: ', data[1].trips)
      console.log('destinations: ', data[2].destinations)
    })
})

