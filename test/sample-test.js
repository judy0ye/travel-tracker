import chai from 'chai';
const expect = chai.expect;

import {
  getAllTrips,
  getTripsByStatus,
  getYearlyExpense,
  getTravelerById
} from '../src/utils'


describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('all trips for specific traveler', function() {
  let travelersData, tripsData;

  beforeEach(() => {
    travelersData = {
      travelers: [
        {
          "id": 1,
          "name": "Ham Leadbeater",
          "travelerType": "relaxer"
        },
        {
          "id": 2,
          "name": "Rachael Vaughten",
          "travelerType": "thrill-seeker"
        },
        {
          "id": 3,
          "name": "Sibby Dawidowitsch",
          "travelerType": "shopper"
        },
      ]
    };
    tripsData = {
      trips: [
        {
          "id": 3,
          "userID": 3,
          "destinationID": 22,
          "travelers": 4,
          "date": "2022/05/22",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 41,
          "userID": 3,
          "destinationID": 25,
          "travelers": 3,
          "date": "2020/08/30",
          "duration": 11,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    }
  });
  it('should return specific user', function() {
    const getTraveler = getTravelerById(3, travelersData)

    expect(getTraveler).to.deep.equal(  {
      "id": 3,
      "name": "Sibby Dawidowitsch",
      "travelerType": "shopper"
    },)
  })
  it('should return all trips', function() {
    const allTrips = getAllTrips(3, tripsData)

    expect(allTrips).to.deep.equal(
      [
        {
          "id": 3,
          "userID": 3,
          "destinationID": 22,
          "travelers": 4,
          "date": "2022/05/22",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 41,
          "userID": 3,
          "destinationID": 25,
          "travelers": 3,
          "date": "2020/08/30",
          "duration": 11,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    )
  });
  it('should return trips by status', function() {
    const tripStatus = getTripsByStatus(3, tripsData, 'approved')
    expect(tripStatus).to.deep.equal(
      [
        {
          "id": 3,
          "userID": 3,
          "destinationID": 22,
          "travelers": 4,
          "date": "2022/05/22",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 41,
          "userID": 3,
          "destinationID": 25,
          "travelers": 3,
          "date": "2020/08/30",
          "duration": 11,
          "status": "approved",
          "suggestedActivities": []
        }
      ]
    )
  })
  it.skip('should return undefined if no data is passed in', function() {
    const allTrips = getAllTrips()
    expect(allTrips).to.be.undefined
  })
})

describe('total yearly expenses', function() {
  let travelersData, tripsData, destinationsData;

  beforeEach(() => {
    travelersData = {
      travelers: [
        {
          "id": 1,
          "name": "Ham Leadbeater",
          "travelerType": "relaxer"
        },
        {
          "id": 2,
          "name": "Rachael Vaughten",
          "travelerType": "thrill-seeker"
        },
        {
          "id": 3,
          "name": "Sibby Dawidowitsch",
          "travelerType": "shopper"
        },
      ]
    };
    tripsData = {
      trips: [
        {
          "id": 3,
          "userID": 3,
          "destinationID": 22,
          "travelers": 4,
          "date": "2022/05/22",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 41,
          "userID": 3,
          "destinationID": 25,
          "travelers": 3,
          "date": "2020/08/30",
          "duration": 11,
          "status": "approved",
          "suggestedActivities": []
        },
        {
          "id": 50,
          "userID": 3,
          "destinationID": 16,
          "travelers": 5,
          "date": "2020/07/02",
          "duration": 17,
          "status": "approved",
          "suggestedActivities": []
        },
      ]
    };
    destinationsData = {
      destinations: [
        {
          "id": 16,
          "destination": "Bangkok, Thailand",
          "estimatedLodgingCostPerDay": 35,
          "estimatedFlightCostPerPerson": 988,
          "image": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
          "alt": "ornate buildings with a garden during the day"
        },
        {
          "id": 25,
          "destination": "New York, New York",
          "estimatedLodgingCostPerDay": 175,
          "estimatedFlightCostPerPerson": 200,
          "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
        }
      ]
    }
  });
  it('should return total amount spent in a given year', function() {
    const expenseIn2020 = getYearlyExpense(3, '2020', tripsData, destinationsData)
    expect(expenseIn2020).to.equal(6325)
  })
})