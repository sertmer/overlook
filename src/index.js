import $ from 'jquery';
import './css/base.scss';


$( document ).ready(() => {
  $('#login-button-js').click(() => {
    $('#login-menu-js').slideToggle('slow')
  });

  $('#login-submit-button-js').click((e) => {
    event.preventDefault();
    if ($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2019') {
      displayManagerDashboard();
    } if ($('#password-input').val() === 'overlook2019') {
      displayCustomerDashboard();
    } else {
      displayLoginError();
    }
  });

  function displayManagerDashboard() {
    $('body').html(`
    <header>
        <nav>
          <h1>The Overlook Hotel</h1>
          <section class="nav-buttons-container">
            <button id="dashboard-button-js" class="dashboard-button">Dashboard</button>
            <button id="log-out-button-js" class="log-out-button">Log Out</button>
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
  }

  function displayCustomerDashboard() {
    $('body').html(`
    <header>
          <nav>
            <h1>The Overlook Hotel</h1>
            <section class="nav-buttons-container">
              <button id="log-out-button-js" class="log-out-button">Log Out</button>
            </section>
          </nav>
        </header>
        <main>
          <article class="quick-look">
            <h2>Quick Look</h2>
            <section class="previous-visits">
              <h3>Previous Visits</h3>
              <p>stay one</p>
            </section>
            <section class="upcoming-visits">
              <h3>Upcoming Visits</h3>
              <p>future stay</p>
            </section>
            <section class="customer-loyalty">
                <h3>Loyalty Points</h3>
                <p>x points</p>
            </section>
          </article>
        </main>`)
  }

  function displayLoginError() {
    $('#login-error-js').toggle();
  }
});