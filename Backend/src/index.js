import dotenv from "dotenv";
import app from "./app.js"; // Import the app instance
import ConnectDB from "./src/db/index.js";
dotenv.config(); 
ConnectDB()
  .then(() => {
    console.log("MONGODB Connection Successful");
  })
  .catch((err) => {
    console.log("MONGODB Connection Failed", err);
  });

export default function handler(req, res) {
  app(req, res);
}
