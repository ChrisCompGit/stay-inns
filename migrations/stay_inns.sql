CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    username varchar(20) NOT NULL,
    password TEXT NOT NULL,
    type varchar(16) DEFAULT 'customer',
    date_created timestamp DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE properties (
    property_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    location varchar(255) NOT NULL,
    rating INT,
    price NUMERIC(8,2) NOT NULL,
    type varchar(50) NOT NULL,
    img TEXT NOT NULL,
    details TEXT,
    admin_id INT NOT NULL REFERENCES users,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    user_id INT NOT NULL REFERENCES users,
    property_id INT NOT NULL REFERENCES properties,
    date_created timestamp DEFAULT CURRENT_TIMESTAMP
);


/*
CREATE AN ADMIN
UPDATE users SET type = 'admin' WHERE user_id = ${id};
*/