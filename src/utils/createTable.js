const pool = require("../pool");


const createTable = ()=>{
    pool.query(
      "CREATE TABLE IF NOT EXISTS Doctors (Username VARCHAR(255), BMDC_reg VARCHAR(20) PRIMARY KEY NOT NULL, FullName VARCHAR(255), Specialization VARCHAR(255), Email VARCHAR(255), PhoneNumber VARCHAR(15), Password VARCHAR(255));",
      (error) => {
        if (error) {
          console.log(`error occurred while creating users table ${error}`);
        } else {
          console.log("patient table created");
        }
      }
    );

}

module.exports = createTable;