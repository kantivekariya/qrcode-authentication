import mongoose from "mongoose";
import config from "../config.js";
import logger from "../services/logger.js";

mongoose.Promise = global.Promise;

mongoose.connection.on("connected", () => {
  logger.info("🚀🚀 MongoDB Connection Established 🚀🚀");
});

mongoose.connection.on("reconnected", () => {
  logger.info("🚀🚀 MongoDB Connection Reestablished 🚀🚀");
});

mongoose.connection.on("disconnected", () => {
  logger.info("🚀🚀 MongoDB Connection Disconnected 🚀🚀");
});

mongoose.connection.on("close", () => {
  logger.info("🚀🚀 MongoDB Connection Closed 🚀🚀");
});

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB ERROR: " + error);
  process.exit(1);
});

mongoose.set("debug", config.database.debugEnabled);
console.log("config.database.connectionUrl", config.database.connectionUrl);
const connectMongo = async () => {
  await mongoose
    .connect(config.database.connectionUrl, config.database.dbOptions)
    .catch((err) => {
      logger.error(`DATABASE - Error:${err}`);
    });
};

export default connectMongo;
