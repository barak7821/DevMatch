import { useState } from "react"
import axios from "axios"
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link } from 'react-router-dom';

interface ForgotPasswordProps {
    onNext: (email: string) => void;
}

export default function ForgotPassword({ onNext }: ForgotPasswordProps) {
    const notyf = new Notyf({ position: { x: 'center', y: 'top' } })
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Check if all fields are filled
        if (!email) return notyf.error("Email is required. Please fill it in.")

        // Check if email is valid
        if (!email.includes("@")) return notyf.error("Please enter a valid email address.")

        try {
            const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/request-reset`, { email })
            console.log(response.data)
            notyf.success("Code sent to your email.")
            onNext(email)
        } catch (error) {
            console.error("Error while requesting password reset:", error)
            if (axios.isAxiosError(error) && error.response?.status === 400 && error.response.data?.code === "reg_google") {
                return notyf.error("It looks like this account was created with Google. To sign in, please continue with Google.")
            }
            notyf.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <>
            <div className="w-full max-w-md p-8 text-white">
                <div className='w-full max-w-md p-8'>
                    <h2 className='text-4xl font-bold text-center mb-4'>Reset Password</h2>
                    <p className='text-sm text-center mb-6'>Enter your email and we’ll send you an OTP</p>

                {/* form section */}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input type="email" placeholder="Enter your email" className="p-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button type="submit" className="bg-white text-purple-600 font-semibold rounded-xl py-3 w-full hover:scale-105 active:scale-95 duration-300 cursor-pointer" >Send Code</button>
                    </form>

                    <div className='mt-2'>
                        <Link to="/login" className='text-sm text-white font-semibold cursor-pointer hover:underline'>Back to login?</Link>
                    </div>
                </div>
            </div>
        </>

    )
}
