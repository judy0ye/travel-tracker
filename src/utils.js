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

// const getAllTrips = (travelerId, tripsData, destinationsData) => {
//   console.log(destinationsData);
 
//   const travelerTrips = tripsData.trips.filter(trip => trip.userID === travelerId);
  
//   const destinations = destinationsData.destinations.filter(destination => {
//     return travelerTrips.map(trip => trip.destinationID).includes(destination.id);
//   });

//   console.log('1st', travelerTrips);
//   console.log('destination', destinations);
//   return destinations;
// }



// const getTripInfo = (trips, userID, status) => {
//       return trips.filter(trip => {
//           return trip.userID === userID &&
//           (trip.status === status || status === undefined)
//       })
// }


// const getTrips = (trips, userID) => {
//   return trips.filter(trip => {
//       return trip.userID === userID
//   })
// }

// const getPastTrips = (trips, userID) => {
//   return trips.filter(trip => {
//       return trip.userID === userID && trip.status === 'approved'
//   })
// }

const getUpcomingTrips = (trips, userID) => {
  return trips.filter(trip => {
      return trip.userID === userID && trip.status === 'pending'
  })
}

// const getTripsByStatus = (travelerId, tripsData, status) => {
//   const traverlerTrips = tripsData.trips.filter(trip => trip.userID === travelerId)

//   return traverlerTrips.filter(travelerTrip => travelerTrip.status === status)
// }
// const getTripsByStatus = (travelerId, tripsData, status) => {
//   return tripsData.trips.filter(trip => trip.userID === travelerId 
//     && trip.status === status)
// }

const getYearlyExpense = (travelerId, year, tripsData, destinationData) => {
  const tripsInTheSameYear = tripsData.trips
    .filter(trip => trip.userID === travelerId)
    .filter(trip => trip.date.split('/')[0] === year)

  return destinationData.destinations.reduce((total, destination) => {
    tripsInTheSameYear.forEach(trip => {
      if (trip.destinationID === destination.id) {
        const totalFlightCostForTrip = trip.travelers * destination.estimatedFlightCostPerPerson;
        const totalCostOfFlightAndLodging = destination.estimatedLodgingCostPerDay + totalFlightCostForTrip
        const travelAgentFee = totalCostOfFlightAndLodging * .10
        total += totalCostOfFlightAndLodging + travelAgentFee
      }
    })
    return total
  }, 0)
}



// Using "today" as the current date is ok - all past trips will be prior to today, 
// and your user will be booking trips for the future
// Trips should be sorted between past/upcoming or past/upcoming/pending - if there 
// are no trips in one of these categories, you should indicate to the user that no 
// trips exist for that category
// Users booking trips for this year (2023) should accumulate to the yearly total.

export {
  getAllTrips,
  getAllDestination,
  // getTripsByStatus,
  getYearlyExpense,
  getTravelerById
}