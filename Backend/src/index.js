import app from "./app.js";
import ConnectDB from "./db/index.js"
import dotenv from "dotenv"
dotenv.config()// for accessing the .env variables
ConnectDB()//calling the function for connection
.then(() => {
    app.listen((process.env.PORT), ()=>{
        console.log(`Server is running on port:${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGODB Conncetion Failed",err)
});