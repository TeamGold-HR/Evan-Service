import React from 'react';

function Occupants(props) {
  const p = props;
  const increaseA = () => {
    p.increaseAdults();
  };
  const decreaseA = () => {
    p.decreaseAdults();
  };
  const increaseC = () => {
    p.increaseChildren();
  };
  const decreaseC = () => {
    p.decreaseChildren();
  };
  const increaseI = () => {
    p.increaseInfants();
  };
  const decreaseI = () => {
    p.decreaseInfants();
  };
  return (
    <div id="occupants">
      <div id="adults">
        <h2>Adults:</h2>
        <h2>{p.adultsSelected}</h2>
        <h5 className="maximum">Maximum Adults:</h5>
        <h5>{p.maxAdults}</h5>
        <button type="button" id="increase-adults" onClick={increaseA}>Increase Adults</button>
        <button type="button" id="decrease-adults" onClick={decreaseA}>Decrease Adults</button>
      </div>
      <div id="children">
        <h2>Children:</h2>
        <h2>{p.childrenSelected}</h2>
        <h5>Maximum Children</h5>
        <h5>{p.maxChildren}</h5>
        <button type="button" id="increase-children" onClick={increaseC}>Increase Children</button>
        <button type="button" id="decrease-children" onClick={decreaseC}>Decrease Children</button>
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
        <button type="button" id="increase-infants" onClick={increaseI}>Increase Infants</button>
        <button type="button" id="decrease-infants" onClick={decreaseI}>Decrease Infants</button>
      </div>
    </div>
  );
}

export default Occupants;
