import express from "express";
import ConnectDB from "../db/index.js"; 
import dotenv from "dotenv";
import app from "./app.js"; // Import the app instance

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
