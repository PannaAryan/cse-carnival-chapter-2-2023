const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const createExpertInDB = async (payload) => {
  const { Username, BMDC_reg, FullName, Specialization, Email, PhoneNumber, Password} = payload;

  const query =
    "INSERT INTO Doctors (Username, BMDC_reg, FullName, Specialization, Email, PhoneNumber, Password) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [Username, BMDC_reg, FullName, Specialization, Email, PhoneNumber, Password];

  const selectQuery =
  "SELECT Username, BMDC_reg, FullName, Specialization, Email, PhoneNumber, Password FROM Doctors";

  await pool.promise().query(query, values);

  const [createdExpert] = (await pool.promise().query(selectQuery))[0];

  return createdExpert;
};

const loginExpert = async (payload) => {
  const { Email, Password } = payload;
  const query = "SELECT * FROM Doctors";
  const values = [Email];

  const [expert] = (await pool.promise().query(query, values))[0];

  if (expert) {
    if (expert.Password === Password) {
      const { Username, BMDC_reg, Email } = expert;

      const accessToken = jwt.sign(
        {
          Username, 
          BMDC_reg,
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
    throw new ApiError(404, "Expert does not exist");
  }
};

const expertService = {
  createExpertInDB,
  loginExpert,
};

module.exports = expertService;
