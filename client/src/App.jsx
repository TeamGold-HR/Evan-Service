import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/listingInfo/1')
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <h2>hello world 2</h2>
        )
    }
}

export default App;