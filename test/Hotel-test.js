const chai = require('chai');
const expect = chai.expect;

import Hotel from '../src/Hotel';

let bookings;
let users;
let rooms;
let hotel;

beforeEach(() => {
  bookings = [
    {
      id: 1572293130156,
      userID: 19,
      date: "2019/11/06",
      roomNumber: 18,
      roomServiceCharges: []
    },
    {
      id: 1572293130159,
      userID: 21,
      date: "2019/11/12",
      roomNumber: 8,
      roomServiceCharges: []
    },
    {
      id: 1572293130159,
      userID: 12,
      date: "2019/10/29",
      roomNumber: 10,
      roomServiceCharges: []
    },
    {
      id: 1572293130159,
      userID: 27,
      date: "2019/11/15",
      roomNumber: 4,
      roomServiceCharges: []
    },
    {
      id: 1572293130160,
      userID: 16,
      date: "2019/11/06",
      roomNumber: 7,
      roomServiceCharges: []
    }
  ];

  users = [
    {
      id: 12,
      name: "Kari Keeling"
    },
    {
      id: 16,
      name: "Garry Mills"
    },
    {
      id: 19,
      name: "Leatha Hettinger"
    },
    {
      id: 21,
      name: "Kelsie Rath"
    },
    {
      id: 27,
      name: "Sigrid Barrows"
    },
  ];

  rooms = [
    {
      number: 18,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 2,
      costPerNight: 496.41
    },
    {
      number: 8,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 261.26
    },
    {
      number: 10,
      roomType: "suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 497.64
    },
    {
      number: 4,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 429.44
    },
    {
      number: 7,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 231.46
    },
    {
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    }
  ];

  hotel = new Hotel(bookings, users, rooms);
})

describe('hotel', () => {
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  describe('getBookings', () => {
    it('should get bookings by date', () => {
      expect(hotel.getBookings("2019/11/06")).to.deep.equal([
        {
          id: 1572293130156,
          userID: 19,
          date: "2019/11/06",
          roomNumber: 18,
          roomServiceCharges: []
        },
        {
          id: 1572293130160,
          userID: 16,
          date: "2019/11/06",
          roomNumber: 7,
          roomServiceCharges: []
        }
      ])
    })

    it('should get bookings by ID', () => {
      expect(hotel.getBookings('', 12)).to.deep.equal([
        {
          id: 1572293130159,
          userID: 12,
          date: "2019/10/29",
          roomNumber: 10,
          roomServiceCharges: []
        }
      ])
    })
  })

  describe('calculateRevenue', () => {
    it('should calculate total revenue by date', () => {
      expect(hotel.calculateRevenue("2019/11/06")).to.equal(727.87)
    })

    it('should calculate total spent by ID', () => {
      expect(hotel.calculateRevenue('', 12)).to.equal(497.64)
    })
  })

  describe('getAvailableRooms', () => {
    it('should get available rooms by date', () => {
      expect(hotel.getAvailableRooms("2019/11/06")).to.deep.equal([
        {
          number: 8,
          roomType: "junior suite",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 261.26
        },
        {
          number: 10,
          roomType: "suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 1,
          costPerNight: 497.64
        },
        {
          number: 4,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 429.44
        },
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4
        }
      ])
    })
  })

})

