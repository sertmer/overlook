import $ from 'jquery';
import './css/base.scss';


$( document ).ready(() => {
  $('#log-in-button-js').click(() => {
    $('#log-in-menu-js').slideToggle('slow')
  });

  $('#log-in-submit-button-js').click(() => {
    console.log('heyo')
    event.preventDefault();
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
  });

});