const db = require('../../database/index.js');
const dummy = require('./dummy-data.js');

const seed = (month) => {
    //month is an integer representing the starting month and is zero indexed to dummy.months
    //function to generate a new set of data
    for (let i = 0; i < 100; i++) {
        let ranAdults = Math.floor(Math.random() * dummy.adults.length);
        let ranKids = Math.floor(Math.random() * dummy.kids.length);
        let ranInfants = Math.floor(Math.random() * dummy.infants.length);
        let ranRent = Math.floor(Math.random() * dummy.rents.length); 
        let ranService = Math.floor(Math.random() * dummy.services.length);
        let ranOccupancy = Math.floor(Math.random() * dummy.occupancies.length);
        let ranCleaning = Math.floor(Math.random() * dummy.cleanings.length);
        let nonInfants = undefined

        if (dummy.adults[ranAdults] > dummy.kids[ranKids]) {
            nonInfants = dummy.adults[ranAdults]
        } else {
            nonInfants = dummy.kids[ranKids];
        }

        let feesQuery = `INSERT INTO fees (base_rent, service_fees, cleaning, occupancy, listing_id) VALUES 
                        (${dummy.rents[ranRent]}, ${dummy.services[ranService]}, ${dummy.cleanings[ranCleaning]}, ${dummy.occupancies[ranOccupancy]}, ${i})`;

        let occupantsQuery = `INSERT INTO occupants (adults, children, infants, non_infants, listing_id) VALUES
                        (${dummy.adults[ranAdults]}, ${dummy.kids[ranKids]}, ${dummy.infants[ranInfants]}, ${nonInfants}, ${i})`;


        db.connection.query(`INSERT INTO listings (url_id) VALUES (${i})`, (err) => {
            if (err) {
                console.log('listing: ' + err);
            } else {
                db.connection.query(feesQuery, (err) => {
                    if (err) {
                        console.log('fees: ' + err);
                    } else {
                        db.connection.query(occupantsQuery, (err) => {
                            if (err) {
                                console.log('occupants: ' + err);
                            } else {
                                for (let j = 0; j < 2; j++) {
                                    let daysInMonth = undefined;
                                    if (month + j === 3 || month + j === 5 || month + j === 8 || month + j === 10) {
                                        daysInMonth = 30;
                                    } else if (month + j === 1) {
                                       daysInMonth = 29;
                                    } else {
                                        daysInMonth = 31;
                                    }
                                    for (let k = 0; k < daysInMonth; k++) {
                                        let ranReserve = Math.floor(Math.random() * dummy.reservations.length);
                                        let daysQuery = `INSERT INTO dates (calendar_date, is_available, listing_id) VALUES 
                                                                    ("${month + 1 + j}/${k + 1}", ${dummy.reservations[ranReserve]}, ${i})`;
                                        db.connection.query(daysQuery, (err) => {
                                            if (err) {
                                                console.log('days: ' + err);
                                            }
                                        })
                                    }
                                }
                            }
                        })
                    }
                })     
            }
        })      
    }
}

module.exports = {
    seed
}