const getAllTrips = (travelerId, tripsData) => {
  if (!travelerId) {
    return undefined
  }

  return tripsData.trips.filter(trip => trip.userID === travelerId)
}

export {
  getAllTrips
}