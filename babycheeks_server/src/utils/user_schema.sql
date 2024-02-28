CREATE database babycheeks_bakery;

USE babycheeks_bakery;

CREATE TABLE ADMIN_USER (
	id integer primary key AUTO_INCREMENT,
    employee_id integer NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO ADMIN_USER (employee_id, firstname, lastname)
VALUES
(0000, 'Hanna', 'Huynh'),
(0000, 'Elaine', 'Huynh'),
(0000, 'Bao', 'Dinh');

-- using mysql on local dev env for simpler development
