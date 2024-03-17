CREATE TABLE ITEM_TYPE (
	id integer primary key AUTO_INCREMENT,
	category TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
