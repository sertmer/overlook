import $ from 'jquery';
import './css/base.scss';
import Manager from './Manager';
import Customer from './Customer';

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
    // customer = new Customer()
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
    }
  })

  function evaluateLogin() {
    if ($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2019') {
      displayDashboard('manager');
    } if ($('#password-input').val() === 'overlook2019') {
      instantiateCustomerById();
      displayDashboard();
      populateCustomerDashboard();
    } else {
      event.preventDefault();
      displayLoginError();
    }
  };

  function toggleLoginMenu() {
    $('#login-menu-js').slideToggle('slow')
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
          <section class="operations-vacancies">
            <h3>Vacancies</h3>
            <p>10 rooms available</p>
          </section>
          <section class="operations-occupied">
            <h3>Rooms Occupied</h3>
            <p>40% full</p>
          </section>
          <section class="operations-revenue">
              <h3>Total Revenue</h3>
              <p>💰</p>
            </section>
        </article>
      </main>`)
    } else {
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
        </main>`)
    }
  }

  function displayLoginError() {
    $('#username-input').val('');
    $('#password-input').val('');
    $('#login-error-js').toggle();
  };

  function findCustomerByID() {
    let customerId = parseInt($('#username-input').val().slice(-2));
    let newCustomer = users.find(user => user.id === customerId)
    return newCustomer;
  }

  function instantiateCustomerById() {
    customer = new Customer(findCustomerByID(), bookings, rooms)
  }

  function populateCustomerDashboard() {
    displayCustomerData('bookings');
    displayCustomerData('loyalty points');
  }

  function displayCustomerData(type) {
    if (type == 'bookings'){
      return customer.bookings.forEach(booking => {
        $('#customer-bookings').append(`
          <div>
            <h4>Date:</h4>
            <p>${booking.date}</p>
            <h4>Room:</h4>
            <p>${booking.roomNumber}</p>
          </div>`)
      })
    } else {
      return $('#customer-loyalty').html(`
          <div>
            <p>${customer.calculateTotalExpenses()}</p>
          </div>`)
    }
  }


});