CREATE Table downUpVote(
    user_id VARCHAR(50) FOREIGN KEY REFERENCES UsersTable(id) NOT NULL,
    answer_id VARCHAR(50)  FOREIGN KEY REFERENCES answerTable(id) NOT NULL,
    Vote BIT DEFAULT 0,
)