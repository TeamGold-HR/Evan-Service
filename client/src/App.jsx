/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Calendar from 'react-calendar';
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
      date: new Date(),
      firstPick: false,
      secondPick: false,
      firstSelection: '',
      secondSelection: '',
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.finalize = this.finalize.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleOccupants = this.toggleOccupants.bind(this);
    this.toggleNote = this.toggleNote.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.dataSynthesis = this.dateSynthesis.bind(this);
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

  toggleOccupants() {
    document.getElementById('occupants-render').classList.toggle('hidden');
    document.getElementById('occupant-button-symbol').classList.toggle('rotated');
  }

  toggleNote(input) {
    if (input === 'service-click') {
      document.getElementById('service-note').style.display = 'block';
    } else if (input === 'cleaning-click') {
      document.getElementById('cleaning-note').style.display = 'block';
    } else if (input === 'occupancy-click') {
      document.getElementById('occupancy-note').style.display = 'block';
    } else if (input === 'rent-click') {
      document.getElementById('rent-note').style.display = 'block';
    }
  }

  closeModal(input) {
    if (input === 'service-exit') {
      document.getElementById('service-note').style.display = 'none';
    } else if (input === 'cleaning-exit') {
      document.getElementById('cleaning-note').style.display = 'none';
    } else if (input === 'occupancy-exit') {
      document.getElementById('occupancy-note').style.display = 'none';
    } else if (input === 'rent-exit') {
      document.getElementById('rent-note').style.display = 'none';
    }
  }

  /*
=====
  - calendar
=====
  */

  toggleCalendar() {
    if (document.getElementById('calendar-render').classList.contains('hidden')) {
      document.getElementById('dual-button-left').classList.toggle('highlighted');
      document.getElementById('date-1').innerHTML = 'Add Date';
      document.getElementById('date-2').innerHTML = 'Add Date';
      this.setState({
        firstPick: true,
        secondPick: false,
        firstSelection: '',
        secondSelection: '',
      });
    } else {
      if (document.getElementById('dual-button-left').classList.contains('highlighted')) {
        document.getElementById('dual-button-left').classList.remove('highlighted');
      } else if (document.getElementById('dual-button-right').classList.contains('highlighted')) {
        document.getElementById('dual-button-right').classList.remove('highlighted');
      }
      let dateOne = document.getElementById('date-1');
      let dateTwo = document.getElementById('date-2');
      dateOne.innerHTML = 'Add Date';
      dateTwo.innerHTML = 'Add Date';
      if (this.state.secondPick === '') {
        this.setState({
          firstSelection: '',
          secondSelection: '',
        });
      }
    }
    document.getElementById('calendar-render').classList.toggle('hidden');
  }

  dateChange(date) {
    const synth = this.dataSynthesis(date);
    const humanDate = date.toDateString();
    const {
      firstSelection,
      firstPick,
      secondPick,
    } = this.state;
    if (secondPick) {
      document.getElementById('dual-button-right').classList.toggle('highlighted');
      document.getElementById('calendar-render').classList.toggle('hidden');
      if (synth[0] < firstSelection[0] || (synth[0] >= firstSelection[0] && synth[1] < firstSelection[1])) {
        document.getElementById('date-1').innerHTML = 'Add Date';
        this.setState({
          firstPick: false,
          secondPick: false,
          firstSelection: '',
        });
        alert('The selected check out date must be after the selected check in date.');
      } else {
        document.getElementById('date-2').innerHTML = humanDate;
        this.setState({ secondSelection: synth });
      }
    } else if (firstPick) {
      document.getElementById('dual-button-left').classList.toggle('highlighted');
      document.getElementById('dual-button-right').classList.toggle('highlighted');
      document.getElementById('date-1').innerHTML = humanDate;
      this.setState({
        firstPick: false,
        secondPick: true,
        firstSelection: synth,
      });
    }
  }

  dateSynthesis(date) {
    let p = date.toDateString().split(' ').slice(1, 3);
    console.log(p);
    p[1] = Number(p[1]);
    switch (p[0]) {
      case 'Jan':
        p[0] = 0;
        break;
      case 'Feb':
        p[0] = 1;
        break;
      case 'Mar':
        p[0] = 2;
        break;
      case 'Apr':
        p[0] = 3;
        break;
      case 'May':
        p[0] = 4;
        break;
      case 'Jun':
        p[0] = 5;
        break;
      case 'Jul':
        p[0] = 6;
        break;
      case 'Aug':
        p[0] = 7;
        break;
      case 'Sep':
        p[0] = 8;
        break;
      case 'Oct':
        p[0] = 9;
        break;
      case 'Nov':
        p[0] = 10;
        break;
      case 'Dec':
        p[0] = 11;
        break;
      default:
        p[0] = 'error';
    }
    return p;
  }

  /*
=====
  - finalization
=====
  */

  finalize() {
    const {
      adultsSelected,
      childrenSelected,
      infantsSelected,
      firstSelection,
      secondSelection,
    } = this.state;
    if (firstSelection === '' || secondSelection === '') {
      alert('Please select a check in and checkout date.');
    } else {
      console.log(`Adults: ${adultsSelected}`);
      console.log(`Children: ${childrenSelected}`);
      console.log(`Infants: ${infantsSelected}`);
      console.log(`Start Date: ${firstSelection}`);
      console.log(`End Date: ${secondSelection}`);
      alert('Reservation Confirmed!');
      document.getElementById('date-1').innerHTML = 'Add Date';
      document.getElementById('date-2').innerHTML = 'Add Date';
      this.setState({
        adultsSelected: 1,
        childrenSelected: 0,
        infantsSelected: 0,
        rent: this.state.startingRent,
        serviceFee: this.state.startingService,
        occupancyFee: this.state.startingOccupancy,
        firstSelection: '',
        secondSelection: '',
      });
    }
  }

  /*
=====
  - rendering
=====
  */

  render() {
    const s = this.state;
    let totalOcc = s.adultsSelected + s.childrenSelected;
    return (
      <div id="module-zone">
        <div id="top-summary">
          <h2>${s.rent} / Night</h2>
        </div>
        <div className="flex-button">
          <button type="button" className="render-button" id="calendar-button" onClick={this.toggleCalendar}>
            <div id="dual-button-container">
              <div className="dual-button border-right" id="dual-button-left">
                <p className="dual-text bold">Check In</p>
                <p className="dual-text faded" id="date-1">Add Date</p>
              </div>
              <div className="dual-button" id="dual-button-right">
                <p className="dual-text bold">Check Out</p>
                <p className="dual-text faded" id="date-2">Add Date</p>
              </div>
            </div>
          </button>
        </div>
        <h2 className="hidden" id="calendar-render">
          <Calendar
            onChange={this.dateChange}
            value={this.state.date}
            className="react-calendar"
          />
        </h2>
        <div className="center-box">
          <button type="button" className="render-button" id="occupant-button" onClick={this.toggleOccupants}>
            <div id="occupant-button-container">
              <div id="total-occupant-tracker">
                <p className="bold">Guests</p>
                <p>{`${totalOcc} ${totalOcc > 1 ? 'Guests' : 'Guest'} ${!s.infantsSelected > 0 ? '' : `${s.infantsSelected} ${s.infantsSelected > 1 ? 'Infants' : 'Infant'}`}`}</p>
              </div>
              <div id="occupant-modal-button">
                <button type="button" id="occupant-button-symbol">^</button>
              </div>
            </div>
          </button>
        </div>
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
        <div className="center-box">
          <button type="button" id="finalize" onClick={this.finalize}>Reserve</button>
        </div>
        <div className="center-box faded">
          <h5>Note: You will not be charged yet.</h5>
        </div>
        <Fees
          rent={s.rent}
          startingRent={s.startingRent}
          service={s.serviceFee}
          cleaning={s.cleaningFee}
          occupancy={s.occupancyFee}
          adults={s.adultsSelected}
          childrenSelected={s.childrenSelected}
          toggleNote={this.toggleNote}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default App;
