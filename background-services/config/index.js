const dotenv = require("dotenv");
const sql = require("mssql");
dotenv.config();

const sqlConfig = {
  user: "",
  password: "",
  database: "",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: false,
  },
};

sql.connect(sqlConfig).then((pool) => {
  if (pool.connected) {
    console.log("Connected..");
  }
});

module.exports = { sqlConfig };
