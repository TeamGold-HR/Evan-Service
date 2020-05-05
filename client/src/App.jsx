/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import axios from 'axios';
import Fees from './Fees';
import Occupants from './Occupants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      startingRent: 0,
      rent: 0,
      cleaningFee: 0,
      startingService: 0,
      serviceFee: 0,
      startingOccupancy: 0,
      occupancyFee: 0,
      adultsSelected: 1,
      maxAdults: 0,
      childrenSelected: 0,
      maxChildren: 0,
      infantsSelected: 0,
      maxInfants: 0,
      maxNonInfants: 0,
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.finalize = this.finalize.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleOccupants = this.toggleOccupants.bind(this);
    this.toggleNote = this.toggleNote.bind(this);
  }

  /*
=====
  - initialization
=====
  */
  componentDidMount() {
    const s = this.state;
    let listingId;
    if (window.location.pathname) {
      listingId = window.location.pathname.slice(1, window.location.pathname.length - 1);
    } else {
      listingId = '0';
    }
    if (!isNaN(listingId) && listingId > -1 && listingId < 100) {
      axios.get(`/list/${listingId}`)
        .then((response) => {
          const { data } = response;
          for (let i = 0; i < data.length; i += 1) {
            s.dates.push({ date: data[i].calendar_date, available: data[i].is_available });
          }
          this.setState({
            rent: data[0].base_rent,
            startingRent: data[0].base_rent,
            cleaningFee: data[0].cleaning,
            startingService: data[0].service_fees,
            serviceFee: data[0].service_fees,
            startingOccupancy: data[0].occupancy,
            occupancyFee: data[0].occupancy,
            maxAdults: data[0].adults,
            maxChildren: data[0].children,
            maxInfants: data[0].infants,
            maxNonInfants: data[0].non_infants,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /*
=====
  - user input
=====
  */
  increase(occupant) {
    const {
      adultsSelected,
      maxAdults,
      childrenSelected,
      maxChildren,
      maxNonInfants,
      infantsSelected,
      rent,
      serviceFee,
      occupancyFee,
    } = this.state;
    if (adultsSelected + childrenSelected < maxNonInfants
      && ((occupant === 'increase-adults' && adultsSelected < maxAdults)
      || (occupant === 'increase-children' && childrenSelected < maxChildren))) {
      this.setState({
        rent: rent + 35,
        serviceFee: serviceFee + 7,
        occupancyFee: occupancyFee + 7,
      });
      if (occupant === 'increase-adults') {
        this.setState({ adultsSelected: adultsSelected + 1 });
      } else if (occupant === 'increase-children') {
        this.setState({ childrenSelected: childrenSelected + 1 });
      }
    } else if (occupant === 'increase-infants' && infantsSelected < 5) {
      this.setState({ infantsSelected: infantsSelected + 1 });
    }
  }

  decrease(occupant) {
    const {
      adultsSelected,
      childrenSelected,
      infantsSelected,
      rent,
      serviceFee,
      occupancyFee,
    } = this.state;
    if ((occupant === 'decrease-adults' && adultsSelected > 1) || (occupant === 'decrease-children' && childrenSelected > 0)) {
      this.setState({
        rent: rent - 35,
        serviceFee: serviceFee - 7,
        occupancyFee: occupancyFee - 7,
      });
      if (occupant === 'decrease-adults') {
        this.setState({ adultsSelected: adultsSelected - 1 });
      } else if (occupant === 'decrease-children') {
        this.setState({ childrenSelected: childrenSelected - 1 });
      }
    } else if (occupant === 'decrease-infants' && infantsSelected > 0) {
      this.setState({ infantsSelected: infantsSelected - 1 });
    }
  }

  /*
=====
  - render toggles
====
  */

  toggleCalendar() {
    document.getElementById('calendar-render').classList.toggle('hidden');
  }

  toggleOccupants() {
    document.getElementById('occupants-render').classList.toggle('hidden');
  }

  toggleNote(input) {
    if (input === 'service-click') {
      document.getElementById('service-note').classList.toggle('hidden');
    } else if (input === 'cleaning-click') {
      document.getElementById('cleaning-note').classList.toggle('hidden');
    } else if (input === 'occupancy-click') {
      document.getElementById('occupancy-note').classList.toggle('hidden');
    }
  }

  /*
=====
  - finalization
=====
  */

  finalize() {
    console.log(this.state.adultsSelected);
    console.log(this.state.childrenSelected);
    console.log(this.state.infantsSelected);
    alert('Reservation Confirmed!');
    this.setState({
      adultsSelected: 1,
      childrenSelected: 0,
      infantsSelected: 0,
      rent: this.state.startingRent,
      serviceFee: this.state.startingService,
      occupancyFee: this.state.startingOccupancy,
    });
  }

  /*
=====
  - rendering
=====
  */

  render() {
    const s = this.state;
    return (
      <div id="module-zone">
        <h2>${s.rent}/Night</h2>
        <button type="button" className="render-button" onClick={this.toggleCalendar}>Select Reservation Days</button>
        <h2 className="hidden" id="calendar-render">PLACEHOLDER - Calendar Goes Here</h2>
        <button type="button" className="render-button" onClick={this.toggleOccupants}>Select Number of Occupants</button>
        <div className="hidden" id="occupants-render">
          <Occupants
            maxAdults={s.maxAdults}
            adultsSelected={s.adultsSelected}
            maxChildren={s.maxChildren}
            childrenSelected={s.childrenSelected}
            infantsSelected={s.infantsSelected}
            maxInfants={s.maxInfants}
            nonInfants={s.maxNonInfants}
            increase={this.increase}
            decrease={this.decrease}
            />
        </div>
        <button type="button" id="finalize" onClick={this.finalize}>Reserve</button>
        <h5>Note: you will not be charged yet.</h5>
        <Fees
          rent={s.rent}
          service={s.serviceFee}
          cleaning={s.cleaningFee}
          occupancy={s.occupancyFee}
          toggleNote={this.toggleNote}
        />
      </div>
    );
  }
}

export default App;
