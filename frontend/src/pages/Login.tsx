import { FormEvent, useState } from 'react'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from "axios"
import { useAuth } from '../utils/AuthContext'
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
    const nav = useNavigate()
    const notyf = new Notyf({ position: { x: 'center', y: 'top' } })
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setIsAuthenticated } = useAuth()
    const login = useGoogleLogin({
        onSuccess: async (TokenResponse) => {
            try {
                const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/google`, {
                    token: TokenResponse.access_token
                })
                localStorage.setItem("token", response.data.token)
                setIsAuthenticated(true)
                notyf.success("Logged in successfully with Google!")
                nav("/main")
            } catch (error) {
                console.error("Google login error:", error)
                notyf.error("Google login failed. Please try again.")
            }
        },
        onError: () => {
            notyf.error("Google login was cancelled or failed.")
        }
    })

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Check if all fields are filled
        if (!email || !password) return notyf.error("All fields are required. Please fill them in.")

        // Check if email is valid
        if (!email.includes("@")) return notyf.error("Please enter a valid email address.")

        // Checking if password is valid
        if (password.length < 8 || password.length > 20) return notyf.error("Your password must be between 8 and 20 characters long.")

        try {
            const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/`, {
                email,
                password
            })

            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            setIsAuthenticated(true)
            notyf.success("Login successful! Redirecting...")
            nav("/main")
        } catch (error) {
            console.error("Login error:", error)
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) return notyf.error("Invalid email or password. Please try again.")
            }
            notyf.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-400 text-white px-4">
            <div className="w-full max-w-md p-8">

                {/* inputs & buttons */}
                <h2 className="text-4xl font-bold text-center mb-4">Login</h2>
                <p className="text-sm text-center mb-6">If you are already a member, log in to continue.</p>

                {/* inputs */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input onChange={(e) => setEmail(e.target.value)} className="p-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none" type="email" placeholder='Email' />

                    {/* password */}
                    <div className="relative">
                        <input onChange={(e) => setPassword(e.target.value)} className="p-3 rounded-xl w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none" type={isPasswordVisible ? "text" : "password"} placeholder='Password' />
                        <button onClick={() => { !isPasswordVisible ? setIsPasswordVisible(true) : setIsPasswordVisible(false) }} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" type="button">
                            {isPasswordVisible ? <LuEyeClosed className='cursor-pointer' /> : <LuEye className='cursor-pointer' />}
                        </button>
                    </div>
                    <button type='submit' className="bg-white text-purple-600 font-semibold rounded-xl py-3 w-full hover:scale-105 active:scale-95 duration-300 cursor-pointer">Login</button>
                </form>

                {/* Seperator */}
                <div className='my-5 grid grid-cols-3 items-center text-white'>
                    <hr className='border-white' />
                    <p className='text-center text-sm'>OR</p>
                    <hr className='border-white' />
                </div>

                {/* Login with Google */}
                <button onClick={() => login()} className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-white text-gray-800 font-semibold hover:scale-105 active:scale-95 duration-300 cursor-pointer">
                    <img src="google-icon.svg" className="w-5 h-5" alt="google" />
                    Continue with Google
                </button>

                <div className="mt-6 text-center">
                    <span className="text-white text-sm">Don't have an account?</span>
                    <Link to="/signup" className="ml-2 text-white font-bold underline">Register</Link>
                </div>
            </div>
        </div>
    )
}
