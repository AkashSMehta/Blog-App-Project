import express from "express"; //To get the package
import dotenv from "dotenv";
import cors from "cors";
import "./db/database.js";
import UserRouter from "./routes/user.js";
import BlogRouter from "./routes/blog.js";

dotenv.config() //To get data stored in the .env file

const app = express(); //To create express app
const port = process.env.PORT;  //To get the port from .env to port variable

app.use(express.json())
app.use(cors(
    {
        origin: ["https://blog-app-alpha-two.vercel.app"], 
        methods: ["POST", "GET"],
        credentials: true
    }
)
)

//using routes
app.use("/api/user", UserRouter)
app.use("/api/blog", BlogRouter)

app.listen(port, () => {
    console.log("App is running on port: ", port);  //To let us know, app is started
})