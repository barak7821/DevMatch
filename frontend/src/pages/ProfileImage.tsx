import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

type UserData = {
  name: string;
  email?: string;
  profileImageUrl: any
}

export default function ProfileImage() {
  const inputRef = useRef<HTMLInputElement>(null)
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

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      console.log(file)
      nav('/main')
    }
  }

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-blue-500 to-purple-400 text-white px-4">
      <div className="flex flex-col text-center my-50 items-center">
        <h1 className='text-3xl my-5 font-black'>Add a Profile Photo</h1>
        <p className='mb-5 text-md text-gray-200'>Adding a photo helps others recognize you and increases your chances of matching.</p>
        <img className="rounded-full border border-blue-300 w-64 h-64" src={userData?.profileImageUrl} alt="PROFILE_IMG" />
        <button onClick={handleClick} className='mt-auto bg-white text-purple-600 font-semibold rounded-xl py-3 w-full hover:scale-105 active:scale-95 duration-300 cursor-pointer'>Upload Photo</button>
        <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} hidden />
        <button onClick={() => nav('/main')} className="mt-auto border border-white text-white font-semibold w-full py-3 px-6 rounded-xl hover:bg-white active:bg-white hover:text-purple-600 active:text-purple-600 transition hover:scale-105 active:scale-95 duration-300 cursor-pointer">Skip for now</button>
      </div>
    </div>
  )
}