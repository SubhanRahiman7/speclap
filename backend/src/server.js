import express from "express"
import {ENV} from "./config/env.js"
import { connectDB } from "./config/db.js";

const app = express();

app.get('/', (req, res) => {
    res.json({message: "Hello World"})
})

app.listen(ENV.PORT, () => {{
    console.log("Server started on http://localhost:"+ ENV.PORT)
    connectDB()
}})