import * as dotenv from "dotenv";
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRET ?? "",
    expiresIn: process.env.JWT_EXPIRESIN ?? "1h",
  },
};

export default config;
