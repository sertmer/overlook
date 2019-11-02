import Hotel from './Hotel';

class Manager extends Hotel {
  constructor(users, bookings, rooms) {
    super(bookings, rooms)
    this.users = users
  }
}

export default Manager;