CREATE TABLE questionsTable (
    id varchar(50) PRIMARY KEY,
	title varchar(50) NULL,
	description varchar(max) NOT NULL,
    user_id varchar(50) NOT NULL,
    isDeleted bit DEFAULT '0',
	date_asked DATETIME,
	FOREIGN KEY (user_id) REFERENCES UsersTable(id),
);

CREATE TABLE UsersTable (
    firstname varchar(50),
	lastname varchar(50) NULL,
	username varchar(50) NOT NULL,
    email varchar(50) PRIMARY KEY NOT NULL,
	password varchar(50),
);