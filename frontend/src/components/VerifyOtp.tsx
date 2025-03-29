import { useState } from "react"
import axios from "axios"
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

interface VerifyOtpProps {
    email: string;
    onNext: (otp: string) => void;
}

export default function VerifyOtp({ email, onNext }: VerifyOtpProps) {
    const notyf = new Notyf({ position: { x: 'center', y: 'top' } })
    const [otp, setOtp] = useState("")

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        // Check if OTP field are filled
        if (!otp) return notyf.error("OTP is required. Please fill it in.")

        try {
            const response = await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/api/auth/verify-otp`,
                { email, otp }
            )
            console.log(response.data)
            notyf.success("Code verified successfully.")
            onNext(otp)
        } catch (error) {
            console.error("Error verifying code:", error)
            notyf.error("Invalid or expired code. Please try again.")
        }
    }

    return (
        <>
            <div className="w-full max-w-md p-8 text-white">
                <div className='w-full max-w-md p-8'>

                    <h2 className="text-4xl font-bold text-center mb-2">Verify Code</h2>
                    <p className="text-sm text-center mb-2"> Enter the 6-digit code we sent to your email</p>

                    {/* form section */}
                    <form onSubmit={handleVerify} className="flex flex-col gap-4">
                        <input type="text" placeholder="Enter code" className="p-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        <button type="submit" className="bg-white text-purple-600 font-semibold rounded-xl py-3 w-full hover:scale-105 active:scale-95 duration-300 cursor-pointer">Verify</button>
                    </form>

                </div>
            </div>
        </>
    )
}