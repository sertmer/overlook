import Hotel from './Hotel';
import Customer from './Customer';

class Manager extends Hotel {
  constructor(users, bookings, rooms) {
    super(bookings, rooms)
    this.users = users
  }

  instantiateCustomer(name) {
    const foundCustomer = this.users.find(user => user.name === name);
    let customer = new Customer(foundCustomer, this.bookings, []);
    return customer;
  }

  calculatePercentRoomsAvailable(key, value) {
    let totalRooms = this.rooms.length;
    let numAvailableRooms = this.getAvailableRooms(key, value).length;
    return Math.round((numAvailableRooms / totalRooms) * 100)
  }
}

export default Manager;