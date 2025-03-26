import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-400 text-white px-4">
            <div className="text-center space-y-6">
                <h1 className="text-5xl font-bold">DevMatch</h1>
                <p className="text-xl tracking-wide">Welcome</p>

                <div className="space-y-4">
                    <div>
                        <Link to="/signup" className="block bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-100 transition">Register</Link>
                        <p className="mt-1 text-sm text-white/80">New here? Sign up and explore exciting projects</p>
                    </div>

                    <div>
                        <Link to="/login" className="block border border-white text-white font-semibold py-3 px-6 rounded-xl hover:bg-white hover:text-blue-600 transition">Login</Link>
                        <p className="mt-1 text-sm text-white/80">Already have an account? Welcome back!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
