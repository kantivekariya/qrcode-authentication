import log4js from "log4js";
import config from "../config.js";

const appenders = {
  out: {
    type: "stdout",
    layout: {
      type: "coloured",
    },
  },
  //store logs in file
  // allLogs: {
  //   type: "file",
  //   filename: "all.log",
  //   maxLogSize: 10485760,
  //   backups: 10,
  //   compress: true,
  // },
  //for console logging
  outFilter: {
    type: "logLevelFilter",
    appender: "out",
    level: config.server.logLevel,
  },
};

const categories = {
  default: {
    appenders: ["outFilter"],
    // appenders: ["allLogs", "outFilter"],
    level: "all",
  },
};

/**
 * Add logger configuration
 * logging level ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
 */
log4js.configure({ appenders, categories });

const logger = log4js.getLogger();

export default logger;
