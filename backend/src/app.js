import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import userRouter from "./routes/user.routes.js";
import session from "express-session"
const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))


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

app.get("/",(req,res)=>{
    res.send("WHISPERHUB")
})

export {app}