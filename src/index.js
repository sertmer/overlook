import $ from 'jquery';
import './css/base.scss';


$( document ).ready(() => {
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
      displayManagerDashboard();
    } if ($('#password-input').val() === 'overlook2019') {
      displayCustomerDashboard();
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
              <button id="logout-button-js" class="logout-button">Log Out</button>
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
  };

  function displayLoginError() {
    $('#username-input').val('');
    $('#password-input').val('');
    $('#login-error-js').toggle();
  };
});