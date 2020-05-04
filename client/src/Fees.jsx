import React from 'react';

function Fees(props) {
  const p = props;
  return (
    <div id="fees">
      <h4>Rent per Night:</h4>
      <h2>{p.rent}</h2>
      <h4>Service Fee:</h4>
      <h2>{p.service}</h2>
      <h4>Cleaning Fee:</h4>
      <h2>{p.cleaning}</h2>
      <h4>Occupancy Fee:</h4>
      <h2>{p.occupancy}</h2>
    </div>
  );
}

export default Fees;
