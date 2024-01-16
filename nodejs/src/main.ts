import "dotenv/config";
import express from "express";
import { routes } from "./routes";

const app = express();
const PORT = Number(process.env.APP_PORT) || 3000;

const TIMEOUT = Number(process.env.REQ_TIMEOUT) || 30000;
const TIMEOUT_ENABLER = process.env.REQ_TIMEOUT_ENABLER || false;

app.use(express.json());
app.use(routes);

app.listen(PORT, "0.0.0.0", () => {
  if (TIMEOUT_ENABLER) {
    app.set("timeout", TIMEOUT);
  }
});
