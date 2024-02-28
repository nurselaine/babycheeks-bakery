CREATE TABLE MENU (
	id integer primary key AUTO_InCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    cost decimal NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOw()
);
