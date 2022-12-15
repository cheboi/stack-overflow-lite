CREATE TABLE answerTable (
    id varchar(50) PRIMARY KEY,
    user_id varchar(50) NOT NULL,
	question_id varchar(50) NOT NULL,
	answer varchar(max) NOT NULL,
    isDeleted bit DEFAULT '0',
	date_answered DATETIME,
	prefered BIT DEFAULT 0 NOT NULL,
	FOREIGN KEY (user_id) REFERENCES UsersTable(id),
	FOREIGN KEY (question_id) REFERENCES questionsTable(id),
);