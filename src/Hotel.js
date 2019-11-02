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
    if (id) {
      let userBookings = this.getBookings('', id);
      return userBookings.reduce((totalSpent, booking) => {
        let match = this.rooms.find(room => {
          return room.number === booking.roomNumber
        })
        totalSpent += match.costPerNight;
        return totalSpent;
      }, 0)
    } else {
      let todaysBookings = this.getBookings(date);
      return todaysBookings.reduce((totalRevenue, booking) => {
        let bookedRooms = this.rooms.forEach(room => {
          if (booking.roomNumber === room.number) {
            totalRevenue += room.costPerNight
          }
        })
        return totalRevenue;
      }, 0)
    }
  }
}
export default Hotel;