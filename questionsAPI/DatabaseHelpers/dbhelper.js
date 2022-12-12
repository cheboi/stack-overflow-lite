const mssql = require("mssql");
const sqlConfig = require("../Config/index");

class Connection {
  constructor() {
    this.connecttoDb();
  }
  connecttoDb = async () => {
    try {
      this.pool = await mssql.connect(sqlConfig);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  createRequest = async (request, data = {}) => {
    try {
      const keys = Object.keys(data);
      keys.map((key) => {
        const keyValue = data[key];
        request.input(key, keyValue);
      });

      return request;
    } catch (error) {
      return error.message;
    }
  };
  exec = async (storedproc, data = {}) => {
    try {
      let request = await (await this.pool).request();
      request = this.createRequest(request, data);
      const results = await request.execute(storedproc);
      return results;
    } catch (error) {
      return error.message;
    }
  };
  query = async (query) => {
    try {
      const result = await this.pool.request().query(query);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = {
  exec: new Connection().exec,
  query: new Connection().query,
};