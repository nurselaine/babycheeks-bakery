CREATE TABLE CUSTOMER_ORDER (
	id integer primary key AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    subtotal decimal NOT NULL,
    total decimal NOT NULL,
    fulfilled boolean NOT NULL DEFAULT false,
	order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ORDER_ITEM (
	id integer primary key AUTO_INCREMENT,
    order_id integer NOT NULL,
    menu_id integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (order_id) references CUSTOMER_ORDER(id),
    FOREIGN KEY (menu_id) references MENU(id)
);
