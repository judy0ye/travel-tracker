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

export {
  getAllTrips,
  getAllDestination,
  getYearlyExpense,
  getTravelerById,
  createVacation
}