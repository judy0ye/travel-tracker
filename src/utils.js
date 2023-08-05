const getAllTrips = (travelerId, tripsData) => {
  if (!travelerId) {
    return undefined
  }

  return tripsData.trips.filter(trip => trip.userID === travelerId)
}

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
  getYearlyExpense
}