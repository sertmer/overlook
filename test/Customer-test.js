import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Customer from '../src/Customer';

chai.use(spies);


let customer;
let bookings;
let rooms;

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

  customer = new Customer({ id: 1, name: "Leatha Ullrich"}, bookings, rooms)
})

describe('Customer', () => {
  it('should be a function', () => {
    expect(Customer).to.be.a('function')
  });

  it('should have an ID', () => {
    expect(customer.id).to.equal(1)
  })

  it('should have a name', () => {
    expect(customer.name).to.equal("Leatha Ullrich")
  })

  describe('getMyBookings', () => {
    it('should find their own bookings', () => {
      chai.spy.on(customer, 'getbookings', () => {
        return [
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
          }
        ]
      })
      expect(customer.getMyBookings()).to.deep.equal([
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
        }
      ])
    })
  })

  describe('calculateTotalExpenses', () => {
    it('should know how much it has spent', () => {
      chai.spy.on(customer, 'calculateRevenue', () => {
        return 757.67;
      })
      expect(customer.calculateTotalExpenses()).to.equal(757.67)
    })
  })
})