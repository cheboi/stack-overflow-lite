CREATE TABLE votesTable (
  id VARCHAR(50) PRIMARY KEY,
  answer_id VARCHAR(50) FOREIGN KEY REFERENCES answerTable(id),
  user_email VARCHAR(50) FOREIGN KEY REFERENCES UsersTable(email),
  votes INT DEFAULT 0,
);