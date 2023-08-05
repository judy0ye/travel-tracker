import chai from 'chai';
const expect = chai.expect;

import {
  getAllTrips
} from '../src/utils'


describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});



describe('all trips', function() {
  let travelerData, tripsData;

  beforeEach(() => {
    travelerData = {
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
  it('should return all trips', function() {
    const travelerId = travelerData.travelers.find(traveler => traveler.id = 3)
    const allTrips = getAllTrips(travelerId.id, tripsData)
    
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
  })
})