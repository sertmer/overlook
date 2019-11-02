import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Manager from '../src/Manager';

chai.use(spies);

let manager;
let bookings;
let rooms;
let users;

beforeEach(() => {
  users = [
    {
      id: 1,
      name: "Leatha Ullrich"
    },
    {
      id: 2,
      name: "Rocio Schuster"
    },
    {
      id: 3,
      name: "Kelvin Schiller"
    },
    {
      id: 4,
      name: "Kennedi Emard"
    },
    {
      id: 5,
      name: "Rhiannon Little"
    }
  ]

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

  manager = new Manager(users, bookings, rooms);
})

describe('Manager', () => {
  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  })

  it('should have users', () => {
    expect(manager).to.have.deep.property('users', [
      {
        id: 1,
        name: "Leatha Ullrich"
      },
      {
        id: 2,
        name: "Rocio Schuster"
      },
      {
        id: 3,
        name: "Kelvin Schiller"
      },
      {
        id: 4,
        name: "Kennedi Emard"
      },
      {
        id: 5,
        name: "Rhiannon Little"
      }
    ])
  })

})