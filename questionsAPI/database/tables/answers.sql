CREATE TABLE answerTable (
    id varchar(50) PRIMARY KEY,
    user_email varchar(50) NOT NULL,
	question_id varchar(50) NOT NULL,
	answer varchar(max) NOT NULL,
    isDeleted bit DEFAULT '0',
	date_answered DATETIME,
	FOREIGN KEY (user_email) REFERENCES usersTable(email),
	FOREIGN KEY (question_id) REFERENCES questionsTable(id),
);
