/* eslint-disable no-restricted-globals */
import React from 'react';

function Occupants(props) {
  const p = props;
  const increase = () => {
    p.increase(event.target.className);
  };
  const decrease = () => {
    p.decrease(event.target.className);
  };
  return (
    <div id="occupants">
      <div id="adults">
        <h2>Adults:</h2>
        <h2>{p.adultsSelected}</h2>
        <h5 className="maximum">Maximum Adults:</h5>
        <h5>{p.maxAdults}</h5>
        <button type="button" className="adults" id="increase-adults" onClick={increase}>Increase Adults</button>
        <button type="button" className="adults" id="decrease-adults" onClick={decrease}>Decrease Adults</button>
      </div>
      <div id="children">
        <h2>Children:</h2>
        <h2>{p.childrenSelected}</h2>
        <h5>Maximum Children</h5>
        <h5>{p.maxChildren}</h5>
        <button type="button" className="children" id="increase-children" onClick={increase}>Increase Children</button>
        <button type="button" className="children" id="decrease-children" onClick={decrease}>Decrease Children</button>
      </div>
      <div id="non-infants">
        <h2>Maximum non-Infants:</h2>
        <h2>{p.nonInfants}</h2>
      </div>
      <div id="infants">
        <h2>Infants:</h2>
        <h2>{p.infantsSelected}</h2>
        <h5>Maximum Infants:</h5>
        <h5>{p.maxInfants}</h5>
        <button type="button" className="infants" id="increase-infants" onClick={increase}>Increase Infants</button>
        <button type="button" className="infants" id="decrease-infants" onClick={decrease}>Decrease Infants</button>
      </div>
    </div>
  );
}

export default Occupants;
