DROP DATABASE IF EXISTS reservations;
CREATE DATABASE reservations;
USE reservations;

CREATE TABLE listings (
    id INT NOT NULL AUTO_INCREMENT,
    url_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE dates (
    id INT NOT NULL AUTO_INCREMENT,
    calendar_date VARCHAR(20) NOT NULL,
    is_available BOOLEAN NOT NULL,
    listing_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE occupants (
    id INT NOT NULL AUTO_INCREMENT,
    adults INT NOT NULL,
    children INT NOT NULL,
    infants INT NOT NULL,
    non_infants INT NOT NULL,
    listing_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE fees (
    id INT NOT NULL AUTO_INCREMENT,
    base_rent INT NOT NULL,
    service_fees INT NOT NULL,
    cleaning INT NOT NULL,
    occupancy INT NOT NULL,
    listing_id INT NOT NULL,
    PRIMARY KEY (id)
);