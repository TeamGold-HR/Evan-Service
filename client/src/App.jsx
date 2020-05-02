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
    let listing;
    if (window.location.pathname) {
      listing = window.location.pathname.slice(1, window.location.pathname.length - 1);
    } else {
      listing = '0';
    }
    const here = this.state;
    if (!isNaN(listing) && listing > -1 && listing < 100) {
      axios.get('/list/' + listing)
        .then((response) => {
          const { data } = response;
          for (let i = 0; i < data.length; i += 1) {
            here.dates.push({ date: data[i].calendar_date, available: data[i].is_available });
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
    const here = this.state;
    return (
      <div>
        <h2>hello world 2</h2>
        <h3>Max Adults: {here.maxAdults}</h3>
        <h3>Max Children: {here.maxChildren}</h3>
        <h3>Max Infants: {here.maxInfants}</h3>
        <h3>Max Non-infants: {here.maxNonInfants}</h3>
        <h3>Base Rent: {here.rent}</h3>
        <h3>Cleaning Fee: {here.cleaningFee}</h3>
        <h3>Service Fee: {here.serviceFee}</h3>
        <h3>Occupancy Fee: {here.occupancyFee}</h3>
      </div>
    );
  }
}

export default App;
