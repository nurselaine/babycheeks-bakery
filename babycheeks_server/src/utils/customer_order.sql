CREATE TABLE CUSTOMER_ORDER (
	id integer primary key AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    subtotal decimal NOT NULL,
    total decimal NOT NULL,
    fulfilled boolean NOT NULL DEFAULT false,
	order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
