const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");


dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
    .then(()=>console.log("DB Connection Successfull"))
    .catch((err)=>{
        console.log(err);
    });

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 3030, () => {
    console.log("backend server tá funcionando");
});
