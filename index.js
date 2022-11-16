const express = require('express');
const app = express();
const port =  8000;
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require("cookie-parser")

const mysql = require('mysql2');


dotenv.config({path: './.env'})




app.set("view engine", "hbs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", require("./routes/register_routes"));
app.use("/auth", require("./routes/auth"));
app.use(cookieParser());


app.listen (port, () => {
    console.log(`Server is starting in port ${port}`);
   // db.connect((err) => {
       // if (err){
       //     console.log("ERROR" + err);
      //  } else {
       //     console.log("DB connected");
      //  }

  //  });
        
});


