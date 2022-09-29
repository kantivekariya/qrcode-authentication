import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes/index.js";
import connectMongo from "./config/mongoconnect.js";
import config from "./config.js";
import logger from "./services/logger.js";
import { connectSocketIo } from "./config/socketconnect.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());

/* production environment */
const isProduction = config.server.environment === "production";

app.use(bodyParser.json());

/* https debug */
app.use(morgan("dev"));

/* connect mongoDB */
connectMongo();

const publicDirectoryPath = path.join(__dirname, "../client/build");

app.use(express.static(publicDirectoryPath));

/* API's route */
app.use("/", mainRouter);

/* route client path */
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

/* listen server port */
const server = app.listen(config.server.port, () => {
  logger.info(`Server is running on isProduction => ${isProduction}`);
  logger.info(`🚀🚀 Server is running on PORT ${config.server.port} 🚀🚀`);
});

/* connect socket event */
connectSocketIo(server);
