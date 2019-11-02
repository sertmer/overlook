class Hotel {
  constructor(bookings, users, rooms) {
    this.bookings = bookings;
    this.users = users;
    this.rooms = rooms;
  }

  getBookings(date) {
    return this.bookings.filter(booking => booking.date === date) 
  }

  calculateRevenue(date) {

  }
}
export default Hotel;