const jwt = require("jsonwebtoken");

const generateJWT = (
  _id: string,
  email: string,
  roles: string[],
  usuario: any = {},
  expiresIn: string | number = "12h",
  jwtSecret = process.env.JWTSECRET
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id,
      email,
      usuario: {
        ...usuario,
        roles,
      },
    };
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: expiresIn,
      },
      (error: string, token: string) => {
        if (error) {
          console.log(error);
          reject("No se puede generar el token");
        } else resolve(token);
      }
    );
  });
};

export default generateJWT;
