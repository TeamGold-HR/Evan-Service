/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

function Fees(props) {
  const toggle = () => {
    props.toggleNote(event.target.id);
  };
  const p = props;
  const baseRent = props.startingRent - 35;
  const totalOccupants = p.adults + p.childrenSelected;
  const occupancyFee = totalOccupants * 35;
  return (
    <div id="fees">
      <h4><a onClick={toggle} id="rent-click" className="note">Rent Due:</a> ${p.rent}</h4>
      <h6 className="hidden" id="rent-note">
        <p>Rent Breakdown:</p>
        <p>Base Rent per Night: ${baseRent}</p>
        <p>(Fee per person: $35 x{totalOccupants}) Total Cost of Occupants: ${occupancyFee}</p>
      </h6>
      <h4><a onClick={toggle} id="service-click" className="note">Service Fee:</a> ${p.service}</h4>
      <h6 className="hidden" id="service-note">This helps us run our platform and offer services like 24/7 support on your trip.</h6>
      <h4><a onClick={toggle} id="cleaning-click" className="note">Cleaning Fee:</a> ${p.cleaning}</h4>
      <h6 className="hidden" id="cleaning-note">One-time fee charged by host to cover the cost of cleaning their space.</h6>
      <h4><a onClick={toggle} id="occupancy-click" className="note">Occupancy Fee:</a> ${p.occupancy}</h4>
      <h6 className="hidden" id="occupancy-note">Dependent on local taxes of the location you are renting in.</h6>
      <h2>Total: ${p.rent + p.service + p.cleaning + p.occupancy}</h2>
    </div>
  );
}

export default Fees;
