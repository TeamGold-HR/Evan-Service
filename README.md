# SpaceCabin-Reservations

This is the repo for the reservations module of Space Cabin, a cabin booking app. To access the full functionality of Space cabin, use this in conjunction with the following:
[Photo Gallery Module](https://github.com/space-cabin/PhotoGallery)
[Description Module](https://github.com/space-cabin/room-description-service)
[Review Module](https://github.com/space-cabin/reviews)
[Proxy Module](https://github.com/space-cabin/Evan-Proxy)

## Getting Started

Clone this repo with the following command:

```
Git clone https://github.com/space-cabin/Evan-Service-Reservations.git
```

## Functionality

* This module serves the ability for users to select dates and guest numbers for their cabin reservation

[Summary pic](./screenshots/summary.png "summary pic")

* Clicking on the 'check in/ check out' button will bring up the calendar, allowing a user to select a start and end date for their reservation
* Clicking an end date that is before the start date (ie start june 5th end june 1st) will prompt an error from the module and ask the user to re-enter their dates.

[calendar](./screenshots/calendar.png "calendar")

* Clicking on the 'guests' button will bring up a modal for altering the number of guests the user wishes to bring to their reservation.
* Altering these values automatically re-calculates the total price of the reservation and displays the breakdown of that price.

[Guest tab](./screenshots/guests.png "guest tab")

[Price readjust](./screenshots/recalculate.png "Price readjust")

* Clicking on 'Rent Due', 'Service Fee', 'Cleaning Fee', or 'Occupancy Fee' will bring up modals with additional information about each.

[additional info](./screenshots/additionalInfo.png "additional info")

* Clicking the 'Reserve' button will send the information along to be used in final processing of the user's reservation [NOTE: this functionality has not been completed].

## Technologies Used
* React
* MySQL
* Axios
* Brotli
* Jest
* Enzyme
* Eslint
* Babel
* Webpack

## Authors

Evan Schafer
* [Github Profile](https://github.com/E-Schaferer)
* [Linkedin Profile](www.linkedin.com/in/schaferer)

## Other Space Cabin Authors

Kayla Golder
* [Github Profile](https://github.com/kgolder92)

Michael Justice
* [Github Profile](https://github.com/M-A-Justice)

Wonil Park
* [Github Profile](https://github.com/wonil-park)
