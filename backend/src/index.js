import Express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import setConnectionDB from "./config/dbConfig.js"

dotenv.config()

const app = Express()
app.use(Express.json())
app.use(cors({
    origin: "*"
}))

// Define route handlers for authentication, user, and admin-related routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

const PORT = process.env.PORT // Get the port number from environment variables

try {
    await setConnectionDB()
    app.listen(PORT, async () => {
        console.log(`listening on ${PORT}...`)
    })
} catch (error) {
    console.error("Failed to connect to the database", error)
}
