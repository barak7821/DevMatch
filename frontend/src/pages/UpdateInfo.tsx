import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";
import NavBar from '../components/NavBar';

interface userData {
    ID: number
    name: string
    profile_IMG: string
}

export default function UpdateInfo() {
    const nav = useNavigate()
    const notyf = new Notyf({ position: { x: 'center', y: 'top' } })
    const [userData, setUserData] = useState<userData | null>(null)
    const [updateName, setUpdateName] = useState("")

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

            // Checking if name length is less than 2 characters
            if (updateName.length > 0) {
                if (updateName.length < 2) return notyf.error("Your name must be at least 2 characters long.")
            }

            // Check if email is valid

            const response = await axios.patch(`http://localhost:${import.meta.env.VITE_PORT}/api/user`, {
                name: updateName
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data)
            notyf.success("Profile updated successfully!")
        } catch (error) {
            console.error("Failed to update user data", error)
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) return notyf.error("User not found. Please try again.")
                if (error.response?.status === 400) return notyf.error("New password cannot be the same as the current password.")
                if (error.response?.status === 409) return notyf.error("Username already taken.")
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
                    <form onSubmit={handleSubmit} className="flex flex-col gap-1 min-h-[82vh]">
                        <label className="text-gray-700 px-3">Name:</label>
                        <input onChange={(e) => { setUpdateName(e.target.value) }}
                            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-300" placeholder={userData.name.charAt(0).toUpperCase() + userData.name.slice(1)} />
                        <span className='flex justify-center mt-auto w-full'>
                            <button className="bg-blue-600 rounded-xl text-white w-full p-3 mt-4 hover:scale-105 active:scale-95 duration-150" type="submit">Update</button>
                        </span>
                    </form>
                </div>
            </div>
            <NavBar page='profile' />
        </div>
    )
}