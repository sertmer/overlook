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

  calculateRevenue(date, id) {
    let bookings;
    if (id) {
      bookings = this.getBookings('', id)
    } else {
      bookings = this.getBookings(date)
    } return bookings.reduce((totalRevenue, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalRevenue += room.costPerNight
        }
      })
      return totalRevenue;
    }, 0)
  }
}
export default Hotel;