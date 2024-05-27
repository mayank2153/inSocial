import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import userRouter from "./routes/user.routes.js";
const app = express();


app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
)

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
app.use("/users", userRouter)



export {app}