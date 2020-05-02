import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    const listing = window.location.pathname.slice(1, window.location.pathname.length - 1);
    if (!isNaN(listing) && listing > -1 && listing < 100) {
      console.log('success');
      axios.get('/list/' + listing)
        .then((response) => {
          this.setState({
            data: response.data,
          });
          console.log(this.state.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert (`AIN'T GONNA SQL INJECT ME SON!`);
    }
  }

  render() {
    return (
      <h2>hello world 3</h2>
    );
  }
}

export default App;
