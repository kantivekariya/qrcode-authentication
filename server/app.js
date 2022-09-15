import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mainRouter from "./routes";
import connectMongo from "./config/mongoconnect";

const app = express();

app.use(cors());
// Production environment
const isProduction = process.env.NODE_ENV === "production";
app.use(bodyParser.json());

//https debug
app.use(morgan("dev"));

//Connect Mongo
connectMongo();

app.use("/", mainRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on isProductionss => ${isProduction}`);
  console.log(`Server is running on PORT ${PORT}`);
});
