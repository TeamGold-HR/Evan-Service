/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

class Fees extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.exit = this.exit.bind(this);
  }

  toggle(event) {
    this.props.toggleNote(event.target.id);
  }

  exit(event) {
    this.props.closeModal(event.target.id);
  }

  render() {
    const p = this.props;
    const baseRent = p.startingRent - 35;
    const totalOccupants = p.adults + p.childrenSelected;
    const occupancyFee = totalOccupants * 35;
    const numDays = (p.first !== '' && p.second !== '') ? (p.second[1] - p.first[1]) : 1;
    return (
      <div id="fees">
        <div className="fee-box">
          <h4><a onClick={this.toggle} id="rent-click" className="note">Rent Due:</a></h4>
          <h4>${p.rent}</h4>
        </div>
        <div className="modal" id="rent-note">
          <div className="modal-content">
            <div className="modal-text">
              <div id="rent-note-modal">
                <p className="bold under-border">Rent Breakdown:</p>
                <div className="rent-breakdown under-border">
                  <div>
                    <p>Base Rent per Night:</p>
                  </div>
                  <div>
                    <p>${baseRent} x{numDays}</p>
                  </div>
                </div>
                <div className="rent-breakdown under-border">
                  <div>
                    <p>Fee per person:</p>
                  </div>
                  <div>
                    <p>$35 x{totalOccupants}</p>
                  </div>
                </div>
                <div className="rent-breakdown">
                  <div>
                    <p className="bold">Total Cost:</p>
                  </div>
                  <div>
                    <p className="bold">${occupancyFee + (baseRent * numDays)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-top">
              <p><a className="modal-exit-button bold" onClick={this.exit} id="rent-exit">X</a></p>
            </div>
          </div>
        </div>
        <div className="fee-box">
          <h4><a onClick={this.toggle} id="service-click" className="note">Service Fee:</a></h4>
          <h4>${p.service}</h4>
        </div>
        <div className="modal" id="service-note">
          <div className="modal-content">
            <div className="modal-text">
              <p>This helps us run our platform and offer services like 24/7 support on your trip.</p>
            </div>
            <div className="modal-top">
              <p><a className="modal-exit-button bold" onClick={this.exit} id="service-exit">X</a></p>
            </div>
          </div>
        </div>
        <div className="fee-box">
          <h4><a onClick={this.toggle} id="cleaning-click" className="note">Cleaning Fee:</a></h4>
          <h4>${p.cleaning}</h4>
        </div>
        <div className="modal" id="cleaning-note">
          <div className="modal-content">
            <div className="modal-text">
              <p>One-time fee charged by host to cover the cost of cleaning their space.</p>
            </div>
            <div className="modal-top">
              <p><a className="modal-exit-button bold" id="cleaning-exit" onClick={this.exit}>X</a></p>
            </div>
          </div>
        </div>
        <div className="fee-box">
          <h4><a onClick={this.toggle} id="occupancy-click" className="note">Occupancy Fee:</a></h4>
          <h4>${p.occupancy}</h4>
        </div>
        <div className="modal" id="occupancy-note">
          <div className="modal-content">
            <div className="modal-text">
              <p>Dependent on local taxes of the location you are renting in.</p>
            </div>
            <div className="modal-top">
              <p><a className="modal-exit-button bold" onClick={this.exit} id="occupancy-exit">X</a></p>
            </div>
          </div>
        </div>
        <div className="fee-box top-border">
          <h2>Total:</h2>
          <h2>${p.rent + p.service + p.cleaning + p.occupancy}</h2>
        </div>
      </div>
    );
  }
}

export default Fees;
