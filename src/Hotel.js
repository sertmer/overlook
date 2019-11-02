class Hotel {
  constructor(bookings, users, rooms) {
    this.bookings = bookings;
    this.users = users;
    this.rooms = rooms;
  }

  getBookings(date, id) {
    if (id) {
      return this.bookings.filter(booking => booking.userID === id)
    } else {
      return this.bookings.filter(booking => booking.date === date) 
    }
  }

  // calculateRevenue(date) {

  // }
}
export default Hotel;