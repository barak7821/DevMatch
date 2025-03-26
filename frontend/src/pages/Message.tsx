import Header from '../components/Header'
import NavBar from '../components/NavBar'
import tempDB from "../utils/DB"
import { Link } from 'react-router-dom'

export default function Message() {

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100 select-none pt-[65px] pb-[70px]">
      <Header text='Message' />
      <NavBar page="message" />
      <div className="flex flex-col gap-4 overflow-auto p-5">
        {tempDB.map((item, index) => (
          <Link to={`/chat/${item.ID}`} key={index} className="flex items-center gap-4 border-b border-blue-100 py-2 active:opacity-60 duration-150">
            <img className="rounded-full border border-blue-300 w-12 h-12" src={item.PROFILE_IMG} alt="" />
            <div>
              <p className="font-semibold text-lg text-blue-500">{item.NAME}</p>
              <p className="text-md text-blue-400">Placeholder for last message</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
