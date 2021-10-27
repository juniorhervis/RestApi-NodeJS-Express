import express from "express";
import cors from "cors";
import winston from "winston";
import clientesRouter from "./routes/cliente.route.js";
import livrosRouter from "./routes/livro.route.js";
import autoresRouter from "./routes/autor.route.js";
import vendasRouter from "./routes/venda.route.js";
import usersRouter from "./routes/user.route.js";
import jwt from "jsonwebtoken";
import fs from "fs"

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "livraria-api.log" }),
  ],
  format: combine(label({ label: "livraria-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());

function getRole(username) {
  if (username == "admin") {
    return "admin";
  } else if (username == "junior") {
    return "role1";
  }
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Denied!" });
      return;
    }

    const token = authHeader.substring(7, authHeader.length);

    const publicKey = fs.readFileSync("./security/public.key", "utf-8");

    jwt.verify(
      token,
      publicKey,
      { algorithms: ["RS256"] },
      function (err, decoded) {
        if (err) {
          res.status(401).json({ message: "Denied!" });
          return;
        }
        if (isAllowed(decoded.role)) {
          next();
        } else {
          res.status(403).json({ message: "Denied!" });
        }
      }
    );
  };
}

app.use("/user", usersRouter);
app.use("/cliente", authorize("admin", "junior"), clientesRouter);
app.use("/livro", livrosRouter);
app.use("/autor", autoresRouter);
app.use("/venda", vendasRouter);
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(3000, () => console.log("API Started!"));
