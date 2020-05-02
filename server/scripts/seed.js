const db = require('../../database/index.js');
const dummy = require('./dummy-data.js');

const seed = (month) => {
  // month is an integer representing the starting month and is zero indexed to dummy.months
  // function to generate a new set of data
  for (let i = 0; i < 100; i += 1) {
    const ranAdults = Math.floor(Math.random() * dummy.adults.length);
    const ranKids = Math.floor(Math.random() * dummy.kids.length);
    const ranInfants = Math.floor(Math.random() * dummy.infants.length);
    const ranRent = Math.floor(Math.random() * dummy.rents.length);
    const ranService = Math.floor(Math.random() * dummy.services.length);
    const ranOccupancy = Math.floor(Math.random() * dummy.occupancies.length);
    const ranCleaning = Math.floor(Math.random() * dummy.cleanings.length);
    let nonInfants;

    if (dummy.adults[ranAdults] > dummy.kids[ranKids]) {
      nonInfants = dummy.adults[ranAdults];
    } else {
      nonInfants = dummy.kids[ranKids];
    }

    const feesQuery = `INSERT INTO fees (base_rent, service_fees, cleaning, occupancy, listing_id) VALUES 
                        (${dummy.rents[ranRent]}, ${dummy.services[ranService]}, ${dummy.cleanings[ranCleaning]}, ${dummy.occupancies[ranOccupancy]}, ${i})`;

    const occupantsQuery = `INSERT INTO occupants (adults, children, infants, non_infants, listing_id) VALUES
                        (${dummy.adults[ranAdults]}, ${dummy.kids[ranKids]}, ${dummy.infants[ranInfants]}, ${nonInfants}, ${i})`;


    db.connection.query(`INSERT INTO listings (url_id) VALUES (${i})`, (errList) => {
      if (errList) {
        console.log(`listing: ${errList}`);
      } else {
        db.connection.query(feesQuery, (errFees) => {
          if (errFees) {
            console.log(`fees: ${errFees}`);
          } else {
            db.connection.query(occupantsQuery, (errOcc) => {
              if (errOcc) {
                console.log(`occupants: ${errOcc}`);
              } else {
                for (let j = 0; j < 2; j += 1) {
                  let daysInMonth;
                  if (month + j === 3 || month + j === 5 || month + j === 8 || month + j === 10) {
                    daysInMonth = 30;
                  } else if (month + j === 1) {
                    daysInMonth = 29;
                  } else {
                    daysInMonth = 31;
                  }
                  for (let k = 0; k < daysInMonth; k += 1) {
                    const ranReserve = Math.floor(Math.random() * dummy.reservations.length);
                    const daysQuery = `INSERT INTO dates (calendar_date, is_available, listing_id) VALUES 
                                                                    ("${month + 1 + j}/${k + 1}", ${dummy.reservations[ranReserve]}, ${i})`;
                    db.connection.query(daysQuery, (errDate) => {
                      if (errDate) {
                        console.log(`days: ${errDate}`);
                      } else if (i === 99 && j === 1 && k === daysInMonth - 1) {
                        db.connection.end();
                      }
                    });
                  }
                }
              }
            });
          }
        });
      }
    });
  }
};

seed(3);
