/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-restricted-globals */
import React from 'react';

class Occupants extends React.Component {
  constructor(props) {
    super(props);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  increase(event) {
    this.props.increase(event.target.id);
  }

  decrease(event) {
    this.props.decrease(event.target.id);
  }

  render() {
    const p = this.props;
    return (
      <div id="occupants">
        <div id="adults">
          <div className="occupant-tracker" id="occupant-tracker-adults">
            <div className="occupant-type">
              <h2 className="occupant" id="occupant-type-adult">Adults</h2>
            </div>
            <div className="occupant-adjustor">
              <button type="button" className="decrement" id="decrease-adults" onClick={this.decrease}>-</button>
              <h2 className="tally">{p.adultsSelected}</h2>
              <button type="button" className="increment" id="increase-adults" onClick={this.increase}>+</button>
            </div>
          </div>
        </div>
        <div id="children">
          <div className="occupant-tracker" id="occupant-tracker-children">
            <div className="occupant-type">
              <p className="occupant bold">Children</p>
              <p className="occupant">age 2 - 12</p>
            </div>
            <div className="occupant-adjustor">
              <button type="button" className="decrement" id="decrease-children" onClick={this.decrease}>-</button>
              <h2 className="tally">{p.childrenSelected}</h2>
              <button type="button" className="increment" id="increase-children" onClick={this.increase}>+</button>
            </div>
          </div>
        </div>
        <div id="infants">
          <div className="occupant-tracker">
            <div className="occupant-type">
              <p className="occupant bold">Infants</p>
              <p className="occupant">under age 2</p>
            </div>
            <div className="occupant-adjustor">
              <button type="button" className="decrement" id="decrease-infants" onClick={this.decrease}>-</button>
              <h2 className="tally">{p.infantsSelected}</h2>
              <button type="button" className="increment" id="increase-infants" onClick={this.increase}>+</button>
            </div>
          </div>
        </div>
        <div id="modal-close-button">
          <div id="modal-close-button-div">
            <p className="bold note" id="close-text" onClick={this.props.toggleOccupants}>Close</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Occupants;
