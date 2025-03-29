import mongoose from "mongoose"

// Define the schema for the User model
const userSchema = new mongoose.Schema(
    {
        // name: required
        name: {
            type: String,
            required: true,
        },
        // email: unique and required
        email: {
            type: String,
            required: true,
            unique: true
        },
        // password: optional for Google login, must be at least 8 characters if present
        password: {
            type: String,
            minlength: 8
        },
        // Profile image URL (defaults to a template image)
        profileImageUrl: {
            type: String, default: "/user-img-template.jpg"
        },
        // Account provider (defaults to "local", can be "google", etc.)
        provider: {
            type: String, default: "local"
        },
        otpCode: {
            type: String
        },
        otpExpiresAt: {
            type: Date
        }
    },
    { timestamps: true }  // Automatically adds 'createdAt' and 'updatedAt' fields
)

const User = mongoose.model("User", userSchema)

export default User