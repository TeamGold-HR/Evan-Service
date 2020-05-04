import React from 'react';
import axios from 'axios';
import Fees from './Fees';
import Occupants from './Occupants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      rent: undefined,
      cleaningFee: undefined,
      serviceFee: undefined,
      occupancyFee: undefined,
      adultsSelected: 1,
      maxAdults: undefined,
      childrenSelected: 0,
      maxChildren: undefined,
      infantsSelected: 0,
      maxInfants: undefined,
      maxNonInfants: undefined,
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.finalize = this.finalize.bind(this);
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
            cleaningFee: data[0].cleaning,
            serviceFee: data[0].service_fees,
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
    } = this.state;
    if (occupant === 'adults'
       && adultsSelected < maxAdults
       && adultsSelected + childrenSelected < maxNonInfants) {
      this.setState({ adultsSelected: adultsSelected + 1 });
    } else if (occupant === 'children'
      && childrenSelected < maxChildren
      && adultsSelected + childrenSelected < maxNonInfants) {
      this.setState({ childrenSelected: childrenSelected + 1 });
    } else if (occupant === 'infants' && infantsSelected < 20) {
      this.setState({ infantsSelected: infantsSelected + 1 });
    }
  }

  decrease(occupant) {
    const {
      adultsSelected,
      childrenSelected,
      infantsSelected,
    } = this.state;
    if (occupant === 'adults' && adultsSelected > 1) {
      this.setState({ adultsSelected: adultsSelected - 1 });
    } else if (occupant === 'children' && childrenSelected > 0) {
      this.setState({ childrenSelected: childrenSelected - 1 });
    } else if (occupant === 'infants' && infantsSelected > 0) {
      this.setState({ infantsSelected: infantsSelected - 1 });
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
      <div>
        <h2>Calendar Goes Here</h2>
        <button type="button" id="finalize" onClick={this.finalize}>Reserve</button>
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
        <Fees
          rent={s.rent}
          service={s.serviceFee}
          cleaning={s.cleaningFee}
          occupancy={s.occupancyFee}
        />
      </div>
    );
  }
}

export default App;
