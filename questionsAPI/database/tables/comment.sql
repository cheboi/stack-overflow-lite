CREATE TABLE commentsTable (
    id varchar(50) PRIMARY KEY,
	comment varchar(max) NOT NULL,
    user_email varchar(50) NOT NULL,
	answer_id varchar(50),
    isDeleted bit DEFAULT '0',
	date_commented DATETIME,
	FOREIGN KEY (user_email) REFERENCES usersTable(email),
	FOREIGN KEY (answer_id) REFERENCES answerTable(id),
);