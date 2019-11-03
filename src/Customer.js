import Hotel from './Hotel';

class Customer extends Hotel {
  constructor(user, bookings, rooms) {
    super(bookings, rooms)
    this.id = user.id;
    this.name = user.name;
    this.bookings = this.getMyBookings();
  }

  getMyBookings() {
    return this.getBookings('', this.id);
  }

  calculateTotalExpenses() {
    return this.calculateRevenue('', this.id);
  }
}


export default Customer;