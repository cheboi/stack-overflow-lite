CREATE TABLE questionsTable (
    id varchar(50) PRIMARY KEY,
	title varchar(50) NULL,
	description varchar(max) NOT NULL,
    user_email varchar(50) NOT NULL,
	answer_id varchar(50),
    isDeleted bit DEFAULT '0',
	date_asked DATETIME,
	FOREIGN KEY (user_email) REFERENCES usersTable(email),
	--FOREIGN KEY (answer_id) REFERENCES answerTable(id),
);

CREATE TABLE UsersTable (
    firstname varchar(50),
	lastname varchar(50) NULL,
	username varchar(50) NOT NULL,
    email varchar(50) PRIMARY KEY NOT NULL,
	password varchar(50),
);