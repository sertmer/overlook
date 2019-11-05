import $ from 'jquery';
import './css/base.scss';
import Manager from './Manager';
import Customer from './Customer';
import flatpickr from "flatpickr";

let customer;
let manager;

let users = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => data.users)
  .catch(err => console.log(err));

let rooms = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(err => console.log(err));

let bookings = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => data.bookings)
  .catch(err => console.log(err));

Promise.all([users, rooms, bookings])
  .then(element => {
    users = element[0];
    rooms = element[1];
    bookings = element[2];
  })
  .then(() => {
    console.log("foo")
  })

$(document).ready(() => {
  $('body').click(() => {
    if (event.target.id === 'login-button-js') {
      toggleLoginMenu();
    } if (event.target.id === 'login-submit-button-js') {
      evaluateLogin();
    } if (event.target.id === 'logout-button-js') {
      logout();
    } if (event.target.id === 'roomtype-dropdown') {
      toggleRoomFilterMenu();
    } if (event.target.id === 'booking-submit-js' && $('#date-picker-js').val() === '') {
      event.preventDefault();
      displayBookingError();
    } if (event.target.id === 'booking-submit-js' && $('#date-picker-js').val().includes('/')) {
      hideBookingError();
      displayFilteredRooms('roomType', $('#roomtype-dropdown-js option:selected').val());
    } if (event.target.className === 'book-room-button') {
      prepRoomForPost(event);
    }
  })


  function evaluateLogin() {
    if ($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2019') {
      instantiateUser('manager');
      displayDashboard('manager');
      populateDashboard('manager')
    } if ($('#password-input').val() === 'overlook2019') {
      instantiateUser('customer');
      displayDashboard('customer');
      populateDashboard('customer');
    } else {
      event.preventDefault();
      displayLoginError();
    }
  };

  function toggleLoginMenu() {
    $('#login-menu-js').slideToggle('slow');
  }

  function toggleRoomFilterMenu() {
    $('#roomtype-dropdown').slideToggle('slow');
  }

  function logout() {
    $('body').html(`
    <header>
      <nav>
        <h1>The Overlook Hotel</h1>
        <button id="login-button-js" class="login-button">Log In</button>
      </nav>
    </header>
    <main>
      <div>
        <section id="login-menu-js" class="login-menu" hidden>
          <form>
            <label for="username-input">Username</label>
            <input type="text" id="username-input">
            <label for="password-input">Password</label>
            <input type="password" id="password-input">
            <p class="login-error" id="login-error-js" hidden>Invalid Login</p>
            <button type="submit" class="login-submit-button" id="login-submit-button-js">Submit</button>
          </form>
        </section>
      </div> 
    </main>`)
  };

  function displayDashboard(user) {
    if (user === 'manager') {
      displayManagerDashboard();
    } else {
      displayCustomerDashboard();
    }
  }

  function displayCustomerDashboard() {
    $('body').html(`
    <header>
          <nav>
            <h1>The Overlook Hotel</h1>
            <section class="nav-buttons-container">
              <button id="logout-button-js" class="logout-button">Log Out</button>
            </section>
          </nav>
        </header>
        <main>
          <article class="quick-look">
            <h2>Quick Look</h2>
            <section id="customer-bookings">
              <h3>Your Bookings</h3>
            </section>
            <section id="customer-loyalty">
            </section>
          </article>
          <article class="customer-bookings" id="customer-bookings-js">
          <h2 class="booking-title">Book Your Next Stay</h2>
            <section class="booking-filters">
              <input id="date-picker-js" class="date-picker" type="text" placeholder="Select Date..." value=""> 
              <div id="booking-error">
              </div>
              <form class="roomtype-dropdown">
              <select name="room-type" id="roomtype-dropdown-js">
              <option value="residential suite">Residential Suite</option>
              <option value="suite">Suite</option>
              <option value="single room">Single Room</option>
              <option value="junior suite">Junior Suite</option>
              </select>
              <input class="booking-submit" id="booking-submit-js" type="submit" value="Submit">
              </form>
            </section>
            <section class="rooms-available">
              <h2>Available Rooms<h2>
              <div class="available-bookings" id="available-bookings-js">
              </div>
            </section>
          </article>
        </main>`);
    addDatePicker();
  }

  function displayManagerDashboard() {
    $('body').html(`
    <header>
        <nav>
          <h1>The Overlook Hotel</h1>
          <section class="nav-buttons-container">
            <button id="dashboard-button-js" class="dashboard-button">Dashboard</button>
            <button id="logout-button-js" class="logout-button">Log Out</button>
          </section>
        </nav>
      </header>
      <main>
        <article class="operations">
          <h2>Operations</h2>
          <section id="operations-vacancies">
            <h3>Today's Vacancies</h3>
          </section>
          <section id="operations-occupied">
            <h3>Rooms Occupied</h3>
          </section>
          <section id="operations-revenue">
              <h3>Total Revenue</h3>
            </section>
        </article>
      </main>`)
  }

  function displayLoginError() {
    $('#username-input').val('');
    $('#password-input').val('');
    $('#login-error-js').toggle();
  };

  function displayBookingError() {
    $("#date-picker-js").val('Select Date...');
    $('#booking-error').html(`
    <p class="error">Please Select a Date</p>`);
  }

  function hideBookingError() {
    $('.error').hide();
  }

  function findCustomerByID() {
    let customerId = parseInt($('#username-input').val().slice(-2));
    let newCustomer = users.find(user => user.id === customerId);
    return newCustomer;
  }

  function instantiateUser(userType) {
    if (userType === 'customer') {
      customer = new Customer(findCustomerByID(), bookings, rooms)
    } else {
      manager = new Manager(users, bookings, rooms);
    }
  }

  function populateDashboard(userType) {
    if (userType === 'customer') {
      displayUserData('customer','bookings');
      displayUserData('customer', 'loyalty points');
    } else {
      displayUserData('manager', 'vacancies');
      displayUserData('manager', 'revenue');
      displayUserData('manager', 'percent');
    }
  }

  function displayUserData(user, type) {
    if (user === 'customer' && type === 'bookings'){
      displayCustomerBookings();
    } if (user === 'customer' && type === 'loyalty points') {
      displayCustomerLoyalty();
    } if (user === 'manager' && type === 'vacancies') {
      displayManagerVacancies();
    } if (user === 'manager' && type === 'revenue') {
      displayManagerRevenue();
    } if (user === 'manager' && type === 'percent') {
      displayPercentRoomsOccupied();
    }
  } 

  function displayPercentRoomsOccupied() {
    return $('#operations-occupied').append(`
    <p>${manager.calculatePercentRoomsAvailable('date', getCurrentDate())}%`)
  }

  function displayManagerRevenue() {
    return $('#operations-revenue').append(`
      <p>$${manager.calculateRevenue('date', getCurrentDate())}`)
  }

  function displayManagerVacancies() {
    return $('#operations-vacancies').append(`
    <p>${manager.getAvailableRooms('date', getCurrentDate()).length}</p>`)
  }

  function displayCustomerLoyalty() {
    return $('#customer-loyalty').html(`
          <div>
            <h3>Loyalty Points</h3>
            <p>${customer.calculateTotalExpenses()}</p>
          </div>`)
  }

  function displayCustomerBookings() {
    return customer.bookings.forEach(booking => {
      $('#customer-bookings').append(`
        <div>
          <h4>Date:</h4>
          <p>${booking.date}</p>
          <h4>Room:</h4>
          <p>${booking.roomNumber}</p>
        </div>`)
    })
  }

  function getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
  
    if (dd < 10) {
      dd = '0' + dd;
    }
  
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    today = `${yyyy}/${mm}/${dd}`;
    return today;
  }

  function addDatePicker() {
    flatpickr("#date-picker-js", {
      dateFormat: "Y/m/d"
    });
  } 

  function getCustomerBookingOptions() {
    event.preventDefault();
    let chosenDate = $("#date-picker-js").val();
    let openRooms = customer.getAvailableRooms('date', chosenDate);
    return openRooms;
  }

  function displayFilteredRooms(key, value) {
    let availableRooms = getCustomerBookingOptions()
    let openFilteredRooms = customer.getFilteredRooms(availableRooms, key, value)
    $('#available-bookings-js').empty()
    if (openFilteredRooms.length === 0) {
      displayNoVacancies()
    } else {
      openFilteredRooms.forEach(room => {
        $('#available-bookings-js').append(`
        <div class="room-to-book">
          <h4>Room Number:</h4>
          <p>${room.number}</p>
          <h4>Room Type:</h4>
          <p>${room.roomType}</p>
          <h4>Cost per Night</h4>
          <p>${room.costPerNight}</p>
          <button class="book-room-button" id="${room.number}">Book This Room</button>
        </div>`)
      })
    }
  }

  function displayNoVacancies() {
    $('#available-bookings-js').append(`
    <div>
      <h2>We are unable to accomodate your request.</h2>
      <h3>Please adjust your search, and try again.</h3>
    </div>
    `)
  }

  function selectRoomToBook(event) {
    let targetID = parseInt(event.target.id);
    let match = customer.rooms.find(room => {
     return targetID === room.number;
    })
    return match;
  }

  function prepRoomForPost(event) {
    let room = selectRoomToBook(event);
    let idNum = parseInt(customer.id);
    let date = $("#date-picker-js").val()
    let roomNum = parseInt(room.number);
    let roomReadyForPost = {
      "userID": idNum,
      "date": date,
      "roomNumber": roomNum
    }
    return roomReadyForPost;
  }
});