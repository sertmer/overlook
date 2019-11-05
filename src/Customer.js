import Hotel from './Hotel';

class Customer extends Hotel {
  constructor(user, bookings, rooms) {
    super(bookings, rooms)
    this.id = user.id;
    this.name = user.name;
    this.bookings = bookings;
  }

  getMyBookings() {
    return this.getBookings('userID', this.id);
  }

  calculateTotalExpenses() {
    return this.calculateRevenue('userID', this.id);
  }
}


export default Customer;