import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

const users = {};

async function createUser(user) {
  const encryptedPwd = await bcrypt.hash(user.password, 1);

  users[user.username] = {
    password: encryptedPwd,
    role: user.role,
  };
}

async function getUser() {
  return users
}

async function login(user) {
  const databaseUser = users[user.username];
  if (databaseUser) {
    const pwdMatches = bcrypt.compareSync(user.password, databaseUser.password);

    if (pwdMatches) {
      const privateKey = fs.readFileSync("./security/private.key", "utf-8");
      const jwtToken = jwt.sign(
        { role: databaseUser.role, disciplina: "mod2Node" },
        privateKey,
        {
          expiresIn: 300,
          algorithm: "RS256",
        }
      );
      return jwtToken;
    } else {
      throw new Error("Invalid password!");
    }
  } else {
    throw new Error("User not found!");
  }
}

export default {
  getUser,
  createUser,
  login,
};
