import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes";
import connectMongo from "./config/mongoconnect";
import config from "./config";

const app = express();

app.use(cors());
// Production environment
const isProduction = config.server.environment === "production";
app.use(bodyParser.json());

//https debug
app.use(morgan("dev"));

//Connect Mongo
connectMongo();

app.use("/", mainRouter);

app.listen(config.server.port, () => {
  console.log(`Server is running on isProduction => ${isProduction}`);
  console.log(`Server is running on PORT ${config.server.port}`);
});
