import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import {app} from "./server.js"
import connectDB from "./DB/Database.js";


//  second approach to connect the database


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`App is listening on PORT ${process.env.PORT} `);

    })
  })
  .catch((error) => {
    console.log("Mongodb connection failed", error);

  })





























































// method 1 to use to connection with mongodb

/*
import express from "express"
const app= express();
; (async () => {
  try {
    await  mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
    app.on("error",(error)=>{
      console.log("our express is not able to talk to the databasee");
    throw error
    
  })
  app.listen(process.env.PORT ,()=>{
    console.log(`App is listing on PORT ${process.env.PORT}`);
    
  })
  } catch (error) {
    console.error("ERROR", error);
    throw error
  }
})()

*/
