import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes";
import connectMongo from "./config/mongoconnect";
import config from "./config";
import logger from "./services/logger";
import { connectSocketIo } from "./config/socketconnect";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
// Production environment
const isProduction = config.server.environment === "production";

app.use(bodyParser.json());

//https debug
app.use(morgan("dev"));

//Connect Mongo
connectMongo();

const publicDirectoryPath = path.join(__dirname, "../client/build");

app.use(express.static(publicDirectoryPath));

app.use("/", mainRouter);

const server = app.listen(config.server.port, () => {
  logger.info(`Server is running on isProduction => ${isProduction}`);
  logger.info(`🚀🚀 Server is running on PORT ${config.server.port} 🚀🚀`);
});

// connect socket event
connectSocketIo(server);
