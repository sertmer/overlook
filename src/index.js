import $ from 'jquery';
import './css/base.scss';


$( document ).ready(() => {
  $('#login-button-js').click(() => {
    $('#login-menu-js').slideToggle('slow')
  });

  $('#login-submit-button-js').click((e) => {
    event.preventDefault();
    if ($('#username-input').val() === 'manager' && $('#password-input').val() === 'overlook2019') {
      displayManagerDashbard();
    } else {
      displayLoginError();
    }
  });

  function displayManagerDashbard() {
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

  function displayLoginError() {
    $('#login-error-js').toggle();
  }
});