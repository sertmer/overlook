import Hotel from './Hotel';

class Customer extends Hotel {
  constructor(id, name, bookings, rooms) {
    super(bookings, rooms)
    this.id = id;
    this.name = name;
  }

  getMyBookings() {
    return this.getBookings('', this.id);
  }

  calculateTotalExpenses() {
    return this.calculateRevenue('', this.id);
  }
}


export default Customer;