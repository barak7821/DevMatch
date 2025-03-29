import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface ResetPasswordProps {
    email: string;
    otp: string;
}

export default function ResetPassword({ email, otp }: ResetPasswordProps) {
    const nav = useNavigate()
    const notyf = new Notyf({ position: { x: "center", y: "top" } })
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Checking if password is valid
        if (newPassword.length < 8 || newPassword.length > 20) return notyf.error("Your password must be between 8 and 20 characters long.")

        // Check if passwords match
        if (newPassword !== confirmPassword) return notyf.error("The passwords do not match. Please try again.")

        try {
            const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/reset-password`, {
                email,
                otp,
                newPassword
            })
            console.log(response.data)
            notyf.success("Password has been reset successfully.")
            nav("/main")
        } catch (error) {
            console.error("Error resetting password:", error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                return notyf.error("New password cannot be the same as the current password.")
            }
            notyf.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <>
            <div className="w-full max-w-md p-8 text-white">
                <div className='w-full max-w-md p-8'>
                    <h2 className='text-4xl font-bold text-center mb-4'>Reset Your Password</h2>
                    <p className='text-sm text-center mb-6'>Enter your new password and confirm it</p>

                    {/* form section */}
                    <form onSubmit={handleReset} className="flex flex-col gap-4">
                        <div className="relative">
                            <input onChange={(e) => setNewPassword(e.target.value)} className="p-3 rounded-xl w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none" type={isPasswordVisible ? "text" : "password"} placeholder='New Password' value={newPassword} required />
                            <button onClick={() => { !isPasswordVisible ? setIsPasswordVisible(true) : setIsPasswordVisible(false) }} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" type="button">
                                {isPasswordVisible ? <LuEyeClosed className='cursor-pointer' /> : <LuEye className='cursor-pointer' />}
                            </button>
                        </div>
                        <div className="relative">
                            <input onChange={(e) => setConfirmPassword(e.target.value)} className="p-3 rounded-xl w-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none" type={isConfirmPasswordVisible ? "text" : "password"} placeholder='New Password' value={confirmPassword} required />
                            <button onClick={() => { !isConfirmPasswordVisible ? setIsConfirmPasswordVisible(true) : setIsConfirmPasswordVisible(false) }} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" type="button">
                                {isConfirmPasswordVisible ? <LuEyeClosed className='cursor-pointer' /> : <LuEye className='cursor-pointer' />}
                            </button>
                        </div>

                        <button type="submit" className="bg-white text-purple-600 font-semibold rounded-xl py-3 w-full hover:scale-105 active:scale-95 duration-300 cursor-pointer" >Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}