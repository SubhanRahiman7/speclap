import express from "express"
import dotenv from "dotenv"
import {ENV} from "./config/env.js"

const app = express();

app.get('/', (req, res) => {
    res.json({message: "Hello World"})
})

console.log("mongo uri", ENV.MONGO_URI)

app.listen(ENV.PORT, () => {{
    console.log("Server started on http://localhost:"+ ENV.PORT)
}})