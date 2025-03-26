import axios from 'axios'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";
import NavBar from '../components/NavBar';

export default function DeleteAccount() {
    const nav = useNavigate()
    const notyf = new Notyf({ position: { x: 'center', y: 'top' } })

    const deleteUser = async () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return

            const response = await axios.delete(`http://localhost:${import.meta.env.VITE_PORT}/api/user`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.data)
            notyf.success("Your account has been deleted successfully.")
            localStorage.removeItem("token")
            nav("/login")
        } catch (error) {
            console.error("Failed to delete user data", error)
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) return notyf.error("User not found. Please try again.")
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
                <div className="w-full max-w-md text-center flex flex-col min-h-[82vh]">
                    <h1 className='font-bold text-2xl my-4'>Delete Account</h1>
                    <span className='flex gap-1 justify-center'>
                        <p className='text-red-500 font-bold'>Warning</p>
                        <p className='text-red-500'>this is permanent and cannot be undone!</p>
                    </span>
                    <p className='my-5'>Once you delete your account, all your data and profile information will be permanently erased from the app. This action cannot be reversed.</p>
                    <p>We're sorry to see you go. Please take a moment to consider this carefully before proceeding.</p>
                    <span className='flex flex-col mt-auto w-full'>
                        <button onClick={deleteUser} className="bg-red-500 rounded-xl text-white p-3 w-full mt-4 hover:scale-105 active:scale-95 duration-150" type="button">Delete My Account Permanently</button>
                    </span>
                </div>
            </div>
            <NavBar page='profile' />
        </div>
    )
}