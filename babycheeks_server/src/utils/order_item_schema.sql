CREATE TABLE ORDER_ITEM (
	id integer primary key AUTO_INCREMENT,
    order_id integer NOT NULL,
    menu_id integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (order_id) references CUSTOMER_ORDER(id),
    FOREIGN KEY (menu_id) references MENU(id)
);
