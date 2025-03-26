import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoPerson, IoHeart, IoChatbox } from "react-icons/io5";
import { FaHandshakeSimple } from "react-icons/fa6";

export default function NavBar({ page }: { page: string }) {
  const [active, setActive] = useState("")

  useEffect(() => {
    if (page) setActive(page)
  }, [page])

  const handleClick = (btn: string) => {
    setActive(btn)
  }

  return (
    <nav className="fixed bottom-0 w-full p-4 bg-gradient-to-r from-blue-400 to-blue-300 shadow-sm rounded-t-xl">
      <ul className="flex gap-10 justify-center text-4xl">
        <Link to='/main' onClick={() => { handleClick("home") }} className={`active:scale-90 duration-150 font-semibold cursor-pointer transition ${active === "home" ? 'text-white' : 'text-blue-200'}`}><FaHandshakeSimple /></Link>
        <Link to='/connection' onClick={() => { handleClick("connection") }} className={`active:scale-90 duration-150 font-semibold cursor-pointer transition ${active === "connection" ? 'text-white' : 'text-blue-200'}`}><IoHeart /></Link>
        <Link to='/message' onClick={() => { handleClick("message") }} className={`active:scale-90 duration-150 font-semibold cursor-pointer transition ${active === "message" ? 'text-white' : 'text-blue-200'}`}><IoChatbox /></Link>
        <Link to='/profile' onClick={() => { handleClick("profile") }} className={`active:scale-90 duration-150 font-semibold cursor-pointer transition ${active === "profile" ? 'text-white' : 'text-blue-200'}`}><IoPerson /></Link>
      </ul>
    </nav>
  )
}
