import React from 'react';

function Fees(props) {
  const p = props;
  const baseRent = p.rent;
  return (
    <div id="fees">
      <h2>Rent Due:</h2>
      <h2>{p.rent}</h2>
      <h4>Rent per Night:</h4>
      <h4>{baseRent}</h4>
      <h4>Service Fee:</h4>
      <h4>{p.service}</h4>
      <h4>Cleaning Fee:</h4>
      <h4>{p.cleaning}</h4>
      <h4>Occupancy Fee:</h4>
      <h4>{p.occupancy}</h4>
    </div>
  );
}

export default Fees;
