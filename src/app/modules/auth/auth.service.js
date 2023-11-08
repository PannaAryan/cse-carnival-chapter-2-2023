const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const createUserInDB = async (payload) => {
  const { FirstName , LastName , Username, Email, PhoneNumber, NID, Password } = payload;
  

  const query =
    "INSERT INTO patients ( FirstName , LastName , Username, Email, PhoneNumber, NID, Password) VALUES ( ?, ?,?, ?,?, ?, ?)";
  const values = [FirstName , LastName , Username, Email, PhoneNumber, NID, Password];

  const selectQuery =
  "SELECT FirstName , LastName , Username, Email, PhoneNumber, NID, Password FROM patients";

  await pool.promise().query(query, values);

  const [createdUser] = (await pool.promise().query(selectQuery));

  return createdUser;
};

const loginUser = async (payload) => {
  const { Email, Password } = payload;
  const query = "SELECT * FROM patients";
  const values = [Email];

  const [user] = (await pool.promise().query(query, values))[0];

  if (user) {
    if (user.Password === Password) {
      const { NID, Username, Email } = user;

      const accessToken = jwt.sign(
        {
          NID, 
          Username,
          Email,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expires_in }
      );

      return {
        accessToken,
      };
    } else {
      throw new ApiError(401, "Invalid password");
    }
  } else {
    throw new ApiError(404, "User does not exist");
  }
};

const authService = {
  createUserInDB,
  loginUser,
};

module.exports = authService;
