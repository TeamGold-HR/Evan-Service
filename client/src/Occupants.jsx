/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-restricted-globals */
import React from 'react';

function Occupants(props) {
  const p = props;
  const increase = () => {
    p.increase(event.target.id);
  };
  const decrease = () => {
    p.decrease(event.target.id);
  };
  return (
    <div id="occupants">
      <div id="adults">
        <div className="occupant-tracker">
          <div className="occupant-type">
            <h2 className="occupant">Adults</h2>
          </div>
          <div className="occupant-adjustor">
            <button type="button" className="decrement" id="decrease-adults" onClick={decrease}>-</button>
            <h2 className="tally">{p.adultsSelected}</h2>
            <button type="button" className="increment" id="increase-adults" onClick={increase}>+</button>
          </div>
        </div>
      </div>
      <div id="children">
        <div className="occupant-tracker">
          <div className="occupant-type">
            <p className="occupant bold">Children</p>
            <p>age 2 - 12</p>
          </div>
          <div className="occupant-adjustor">
            <button type="button" className="decrement" id="decrease-children" onClick={decrease}>-</button>
            <h2 className="tally">{p.childrenSelected}</h2>
            <button type="button" className="increment" id="increase-children" onClick={increase}>+</button>
          </div>
        </div>
      </div>
      <div id="infants">
        <div className="occupant-tracker">
          <div className="occupant-type">
            <p className="occupant bold">Infants</p>
            <p>under age 2</p>
          </div>
          <div className="occupant-type">
            <button type="button" className="decrement" id="decrease-infants" onClick={decrease}>-</button>
            <h2 className="tally">{p.infantsSelected}</h2>
            <button type="button" className="increment" id="increase-infants" onClick={increase}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Occupants;
