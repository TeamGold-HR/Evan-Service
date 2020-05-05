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
      <div id="non-infants">
        <h5>Maximum non-Infants: {p.nonInfants}</h5>
      </div>
      <div id="adults">
        <span className="occupant-tracker">
          <h2 className="occupant">Adults</h2>
          <button type="button" className="decrement" id="decrease-adults" onClick={decrease}>-</button>
          <h2 className="tally">{p.adultsSelected}</h2>
          <button type="button" className="increment" id="increase-adults" onClick={increase}>+</button>
        </span>
        <h5 className="maximum">Maximum Adults: {p.maxAdults}</h5>
      </div>
      <div id="children">
        <span className="occupant-tracker">
          <h2 className="occupant">Children (age 2 - 12)</h2>
          <button type="button" className="decrement" id="decrease-children" onClick={decrease}>-</button>
          <h2 className="tally">{p.childrenSelected}</h2>
          <button type="button" className="increment" id="increase-children" onClick={increase}>+</button>
        </span>
        <h5>Maximum Children: {p.maxChildren}</h5>
      </div>
      <div id="infants">
        <span className="occupant-tracker">
          <h2 className="occupant">Infants (under age 2)</h2>
          <button type="button" className="decrement" id="decrease-infants" onClick={decrease}>-</button>
          <h2 className="tally">{p.infantsSelected}</h2>
          <button type="button" className="increment" id="increase-infants" onClick={increase}>+</button>
        </span>
        <h5>Maximum Infants: {p.maxInfants}</h5>
      </div>
    </div>
  );
}

export default Occupants;
