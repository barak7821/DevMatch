import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdArrowBackIos } from "react-icons/md";
import NavBar from '../components/NavBar';

export default function UpdatePassword() {
    const nav = useNavigate()
    const notyf = new Notyf({ position: { x: 'center', y: 'top' } })
    const [userData, setUserData] = useState(null)
    const [updatePassword, setUpdatePassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isMatchPassVisible, setIsMatchPassVisible] = useState(false)

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return nav("/login")

            const { data } = await axios.get(`http://localhost:${import.meta.env.VITE_PORT}/api/user`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUserData(data)
        } catch (error) {
            console.error("Failed to fetch user data", error)
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401 || error.response?.status === 403) return nav("/login")
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    // If user data is not loaded yet, show loading message
    if (!userData) return <p className="flex justify-center items-center">Loading...</p>

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if (!token) return

            // Checking if password is valid
            if (updatePassword.length > 0) {
                if (updatePassword.length < 8 || updatePassword.length > 20) return notyf.error("Your password must be between 8 and 20 characters long.")
            }

            if (confirmPassword !== updatePassword) return notyf.error("The passwords do not match. Please try again.")

            const response = await axios.patch(`http://localhost:${import.meta.env.VITE_PORT}/api/user`, {
                password: updatePassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data)
            notyf.success("Profile updated successfully!")
        } catch (error) {
            console.error("Failed to update user data", error)
            if (axios.isAxiosError(error)) {
                if (updatePassword.length < 0) {
                    if (error.response?.status === 404) return notyf.error("User not found. Please try again.")
                    if (error.response?.status === 400) return notyf.error("New password cannot be the same as the current password.")
                }
            }
            notyf.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <div className='min-h-screen w-full bg-gray-100 select-none pt-[65px] pb-[70px]'>
            <div className="flex flex-grow items-center justify-center p-4">
                <div className="fixed top-0 w-full p-4 bg-gradient-to-r from-blue-400 to-blue-300 shadow-sm flex justify-center items-center rounded-b-xl">
                    <Link to="/profile" className='flex items-center'><MdArrowBackIos className='absolute right-[93%] text-gray-200 size-5 active:text-gray-400 cursor-pointer' /></Link>
                    <h1 className="text-2xl font-bold text-white">Settings</h1>
                </div>
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="flex flex-col relative gap-1 min-h-[82vh]">
                        {/* password */}
                        <label className="text-gray-700 px-3">New Password</label>
                        <input onChange={(e) => { setUpdatePassword(e.target.value) }} type={isPasswordVisible ? "text" : "password"}
                            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-300" placeholder="Enter new password" />
                        <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute right-3 top-11' type="button">
                            {isPasswordVisible ?
                                <LuEyeClosed className="text-gray-400 cursor-pointer active:text-black active:scale-105 duration-150" /> :
                                <LuEye className="text-gray-400 cursor-pointer active:text-black active:scale-105 duration-150" />}
                        </button>
                        <input onChange={(e) => { setConfirmPassword(e.target.value) }} type={isMatchPassVisible ? "text" : "password"}
                            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-300" placeholder="Confirm new password" />
                        <button onClick={() => setIsMatchPassVisible(!isMatchPassVisible)} className='absolute right-3 top-24' type="button">
                            {isMatchPassVisible ?
                                <LuEyeClosed className="text-gray-400 cursor-pointer active:text-black active:scale-105 duration-150" /> :
                                <LuEye className="text-gray-400 cursor-pointer active:text-black active:scale-105 duration-150" />}
                        </button>
                        <p className='text-sm text-gray-500 text-center'>Your new password must be between 8 and 20 characters long.</p>
                        <span className='flex mt-auto w-full justify-center'>
                            <button className="bg-blue-600 rounded-xl text-white w-full p-3 mt-4 hover:scale-105 active:scale-95 duration-150" type="submit">Update</button>
                        </span>
                    </form>
                </div>
            </div>
            <NavBar page='profile' />
        </div>
    )
}