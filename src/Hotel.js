class Hotel {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
  }

  getBookings(key, value) {
    return this.bookings.filter(booking => booking[key] === value)
  }

  calculateRevenue(key, value) {
    let bookings = this.getBookings(key, value)
    return bookings.reduce((totalRevenue, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalRevenue += room.costPerNight
        }
      })
      return totalRevenue;
    }, 0)
  }

  getAvailableRooms(key, value) {
    const bookingsByDate = this.getBookings(key, value);
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