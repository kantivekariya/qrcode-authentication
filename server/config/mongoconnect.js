import mongoose from "mongoose";
import debug from "debug";
import config from "../config";

const log = debug("app");

mongoose.Promise = global.Promise;

mongoose.connection.on("connected", () => {
  log("MongoDB Connection Established");
});

mongoose.connection.on("reconnected", () => {
  log("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
  log("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
  log("MongoDB Connection Closed");
});

mongoose.connection.on("error", (error) => {
  log("MongoDB ERROR: " + error);
  process.exit(1);
});

mongoose.set("debug", config.database.debugEnabled);

const connectMongo = async () => {
  await mongoose
    .connect(config.database.connectionUrl, config.database.dbOptions)
    .catch((err) => {
      Logger.log.fatal(`DATABASE - Error:${err}`);
    });
};

export default connectMongo;
