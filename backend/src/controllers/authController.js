import User from "../models/userModel.js"
import { hashPassword, checkPassword } from "../utils/passwordUtils.js"
import jwt from "jsonwebtoken"
import axios from "axios"

// Controller for user login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        // Check if both email and password are provided
        if (!email || !password) return res.status(400).json({ error: "Email and password are required." })

        // Check if the email is already registered
        const userData = await User.findOne({ email: email.toLowerCase() })
        if (!userData) return res.status(401).json({ message: "Invalid email or password. Please try again." })

        // Check if the password is correct
        const isPasswordCorrect = await checkPassword(password, userData.password)
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password. Please try again." })

        // Ensure JWT_SECRET is defined in the environment variables
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined")
        }

        // Create a JWT token for the user
        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        console.log("Login successful.")
        res.status(200).json({ message: "Login successful.", token, exist: true })
    } catch (error) {
        console.error("Error in login controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Controller for user registration
export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        // Check if all fields are provided
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" })

        // Check if the password length is valid
        if (password.length < 8 || password.length > 20) return res.status(400).json({ message: "Password should be between 8 and 20 characters" })

        // Check if the email is already registered
        const userData = await User.findOne({ email: email.toLowerCase() })
        if (userData) return res.status(409).json({ message: "Email already exists" })

        // Hash the password before saving the user
        const hashedPassword = await hashPassword(password)

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            provider: "local"
        })

        await newUser.save()

        // Create a JWT token for the user
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        console.log(`${name} added successfully`)
        res.status(201).json({ message: `${name} added successfully`, token, exist: true })
    } catch (error) {
        console.error("Error in register controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// Controller to check if the user is authenticated based on the JWT token
export const checkUser = (req, res) => {
    res.status(200).json({ exist: true })
}

// Controller to login with Google
export const googleLogin = async (req, res) => {
    const { token } = req.body

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined")
        }

        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${token}` }
        })

        const { email, name, picture } = data
        
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({
                email,
                name,
                profileImageUrl: picture,
                provider: "google"
            })
        }

        // Create a JWT token for the user
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).json({ token: jwtToken, exist: true })
    } catch (error) {
        console.error("Error in googleLogin controller", error.message)
        if (error.message === "JWT_SECRET is not defined") {
            return res.status(500).json({ message: "Internal Server Error" })
        }
        res.status(400).json({ message: "Invalid token" })
    }
}