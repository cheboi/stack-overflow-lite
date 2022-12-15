const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

exports.verifyToken = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      return res.status(401).json({
        message: 'You are not authorized'
      })
    }
    const token = tokenHeader.split(' ')[1];
    const decodedData = jwt.verify(token, SECRET_KEY);
    req.user = decodedData;
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
  next();
}

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.verifyToken  = (req, res, next) => {
//   // const token = req.headers["x-access-token"];
// const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJNYXJrIiwibGFzdG5hbWUiOiJUb28iLCJ1c2VybmFtZSI6ImNoZWJvaSIsImVtYWlsIjoibWFya3Rvb0BnbWFpbC5jb20iLCJpYXQiOjE2NzEwMDE3NzQsImV4cCI6MTc5MTg5MjY2NH0.3tmBOsWm6wxB5OOvwdfRz6yQShvnwiStRe0cOXpS5yY"
//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.email = decoded.email;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

