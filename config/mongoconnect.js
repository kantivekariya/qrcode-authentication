import mongoose from "mongoose";
import debug from "debug";

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

mongoose.set("debug", process.env.NODE_MONGO_DEBUG);

const connectMongo = async () => {
  const dbOptions = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  };
  let connectionUri = process.env.NODE_DB_BASE_URL;
  await mongoose.connect(connectionUri, dbOptions).catch((err) => {
    Logger.log.fatal(`DATABASE - Error:${err}`);
  });
};

export default connectMongo;
