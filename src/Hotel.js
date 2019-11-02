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

  getAvailableRooms(date) {
    let bookingsByDate = this.getBookings(date);
    let bookedRooms = [];
    bookingsByDate.forEach(booking => {
      bookedRooms.push(booking.roomNumber)
    })
    return this.rooms.reduce((availableRooms, room) => {
      if (!bookedRooms.includes(room.number)) {
        availableRooms.push(room);
      }
      return availableRooms;
    }, [])
  }

  // loop(reduce - array of available rooms) through rooms, and for each room, compare to bookings. If bookings ! includes the room, push to accumulatore
}
export default Hotel;