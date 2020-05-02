import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      rent: undefined,
      cleaningFee: undefined,
      serviceFee: undefined,
      occupancyFee: undefined,
      maxAdults: undefined,
      maxChildren: undefined,
      maxInfants: undefined,
      maxNonInfants: undefined,
    };
  }

  componentDidMount() {
    const s = this.state;
    let listingId;
    if (window.location.pathname) {
      listingId = window.location.pathname.slice(1, window.location.pathname.length - 1);
    } else {
      listingId = '0';
    }
    if (!isNaN(listingId) && listingId > -1 && listingId < 100) {
      axios.get('/list/' + listingId)
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

  render() {
    const s = this.state;
    return (
      <div>
        <h2>hello world 2</h2>
        <h3>Max Adults: {s.maxAdults}</h3>
        <h3>Max Children: {s.maxChildren}</h3>
        <h3>Max Infants: {s.maxInfants}</h3>
        <h3>Max Non-infants: {s.maxNonInfants}</h3>
        <h3>Base Rent: {s.rent}</h3>
        <h3>Cleaning Fee: {s.cleaningFee}</h3>
        <h3>Service Fee: {s.serviceFee}</h3>
        <h3>Occupancy Fee: {s.occupancyFee}</h3>
      </div>
    );
  }
}

export default App;
