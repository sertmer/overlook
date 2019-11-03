import chai, { expect } from 'chai';
import Hotel from '../src/Hotel';

let bookings;
let rooms;
let hotel;

beforeEach(() => {
  bookings = [
    {
      id: 1572293130156,
      userID: 1,
      date: "2019/11/06",
      roomNumber: 18,
      roomServiceCharges: []
    },
    {
      id: 1572293130159,
      userID: 1,
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

  hotel = new Hotel(bookings, rooms);
})

describe('Hotel', () => {
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  })

  it('should have bookings', () => {
    expect(hotel).to.have.deep.property('bookings', [
      {
        id: 1572293130156,
        userID: 1,
        date: "2019/11/06",
        roomNumber: 18,
        roomServiceCharges: []
      },
      {
        id: 1572293130159,
        userID: 1,
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
    ])
  })

  it('should have rooms', () => {
    expect(hotel).to.have.deep.property('rooms', [
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
    ])
  })

  describe('getBookings', () => {
    it('should get bookings by date', () => {
      expect(hotel.getBookings('date', "2019/11/06")).to.deep.equal([
        {
          id: 1572293130156,
          userID: 1,
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
      expect(hotel.getBookings('userID', 12)).to.deep.equal([
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
      expect(hotel.calculateRevenue('date',"2019/11/06")).to.equal(727.87)
    })

    it('should calculate total spent by ID', () => {
      expect(hotel.calculateRevenue('userID', 12)).to.equal(497.64)
    })
  })

  describe('getAvailableRooms', () => {
    it('should get available rooms by date', () => {
      expect(hotel.getAvailableRooms('date', "2019/11/06")).to.deep.equal([
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

  describe('getFilteredRooms', () => {
    it('should filter rooms by any property', () => {
      expect(hotel.getFilteredRooms("roomType", "residential suite")).to.deep.equal([
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4
        }
      ])

      expect(hotel.getFilteredRooms('bidet', false)).to.deep.equal([
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
        }
      ])

      expect(hotel.getFilteredRooms("bedSize", "queen")).to.deep.equal([
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
      ])
    }) 
  })
})