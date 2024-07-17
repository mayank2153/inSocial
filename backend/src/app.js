import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session"
import "./middlewares/googleauth.middleware.js";
import "./middlewares/discordauth.middleware.js"

const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
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
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import voteRouter from "./routes/vote.routes.js";
import categoryRouter from "./routes/category.routes.js";
app.use("/users", userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)
app.use("/vote",voteRouter)
app.use("/category", categoryRouter);
app.get("/",(req,res)=>{
    res.send("WHISPERHUB")
})

export {app}