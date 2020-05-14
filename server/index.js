const express = require('express');

const app = express();
const path = require('path');

const PORT = process.env.PORT || 3007;
const db = require('../database/index.js');


app.use(express.json());

app.use('/:listingId', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.redirect(301, `http://127.0.0.1:${PORT}/0`);
});

app.get('/reservation/:listingId', (req, res) => {
  console.log('ping recieved');
  const queryStatement = `SELECT DISTINCT
                    listings.url_id,
                    dates.calendar_date, dates.is_available,
                    fees.base_rent, fees.service_fees, fees.cleaning, fees.occupancy,
                    occupants.adults, occupants.children, occupants.infants, occupants.non_infants
                    FROM dates, fees, occupants, listings
                    WHERE listings.url_id = ?
                    AND dates.listing_id = listings.url_id
                    AND fees.listing_id = listings.url_id
                    AND occupants.listing_id = listings.url_id`;
  const queryArgs = [req.params.listingId];
  db.connection.query(queryStatement, queryArgs, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log('WOW WOW 3007');
});
