import 'notyf/notyf.min.css';
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdArrowForwardIos } from "react-icons/md";

type UserData = {
    name: string;
    email?: string;
    profileImageUrl: any
}

export default function Profile() {
    const nav = useNavigate()
    const [userData, setUserData] = useState<UserData | null>(null)

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

    return (
        <div className='min-h-screen w-full bg-gray-100 select-none pt-[65px] pb-[70px]'>
            <Header text='Profile' />
            <NavBar page="profile" />
            {userData && (
                <div className='my-[15%] lg:my-[5%]'>
                    <div className='flex flex-col items-center text-center'>
                        <img className="rounded-full border border-blue-300 w-32 h-32" src={userData?.profileImageUrl} alt="PROFILE_IMG" />
                        <h1 className='font-bold text-3xl my-2'>{userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}</h1>
                    </div>
                    <div className='flex flex-col items-center rounded-2xl bg-white mx-5 my-10 text-gray-800 text-lg'>
                        {/* Update Info */}
                        <Link to="updateinfo" className='flex justify-between w-full items-center active:bg-gray-300 active:rounded-t-2xl py-2 cursor-pointer'>
                            <h1 className='px-3'>Update Information</h1>
                            <MdArrowForwardIos className='text-gray-500' />
                        </Link>
                        <hr className='border w-full border-gray-100' />
                        {/* Update Email */}
                        <Link to="updateemail" className='flex justify-between w-full items-center active:bg-gray-300 active:rounded-t-2xl py-2 cursor-pointer'>
                            <h1 className='px-3'>Email</h1>
                            <MdArrowForwardIos className='text-gray-500' />
                        </Link>
                        <hr className='border w-full border-gray-100' />
                        {/* Update Password */}
                        <Link to="updatepassword" className='flex justify-between w-full items-center active:bg-gray-300 active:rounded-t-2xl py-2 cursor-pointer'>
                            <h1 className='px-3'>Password</h1>
                            <MdArrowForwardIos className='text-gray-500' />
                        </Link>
                        <hr className='border w-full border-gray-100' />
                        {/* Delete Account */}
                        <Link to="deleteaccount" className='flex justify-between w-full items-center active:bg-gray-300 py-2 cursor-pointer'>
                            <h1 className='px-3'>Delete Account</h1>
                            <MdArrowForwardIos className='text-gray-500' />
                        </Link>
                        <hr className='border w-full border-gray-100' />
                        <Link to={"/"} onClick={() => localStorage.removeItem("token")} className='py-2 active:bg-gray-300 active:rounded-b-2xl w-full justify-center flex'>Log Out</Link>
                    </div>
                </div>
            )}
        </div>
    )
}