class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
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
    const bookingsByDate = this.getBookings(date);
    const bookedRooms = [];
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

  getFilteredRooms(key, value) {
    return this.rooms.filter(room => room[key] === value);
  }
}
export default Hotel;