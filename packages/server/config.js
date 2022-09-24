const config = {
  server: {
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV || "development",
    // socketPort: process.env.SOCKET_PORT || 3700,
    logLevel: process.env.LOG_LEVEL || "all",
  },
  database: {
    connectionUrl:
      process.env.NODE_DB_BASE_URL || "mongodb://127.0.0.1:27017/authDemo",
    debugEnabled: process.env.NODE_MONGO_DEBUG === "true" ? true : false,
    dbOptions: {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    },
  },
  jwt: {
    key: process.env.NODE_JWT_KEY,
    expiration: process.env.NODE_JWT_EXPIRATION,
  },
};

export default config;
