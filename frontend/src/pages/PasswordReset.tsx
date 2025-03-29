import { useState } from "react"
import ForgotPassword from "../components/ForgotPassword"
import VerifyOtp from "../components/VerifyOtp"
import ResetPassword from "../components/ResetPassword"

export default function PasswordReset() {
    const [step, setStep] = useState("email")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-400 text-white px-4">
            {step === "email" && <ForgotPassword onNext={(e: string) => {
                setEmail(e)
                setStep("otp")
            }} />}

            {step === "otp" && <VerifyOtp email={email} onNext={(o: string) => {
                setOtp(o)
                setStep("reset")
            }} />}

            {step === "reset" && <ResetPassword email={email} otp={otp} />}
        </div>
    )
}
