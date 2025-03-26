import { useState } from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import tempDB from "../utils/DB"

export default function Connection() {
  const [active, setActive] = useState("your")

  const handleClick = (btn: string) => {
    setActive(btn)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-100 select-none pt-[105px] pb-[70px]">
      <Header text='Connection' />
      <NavBar page="connection" />
      <nav className="fixed top-[4.5%] left-0 right-0 p-4 bg-gradient-to-r from-blue-400 to-blue-300 text-white text-lg rounded-md shadow-sm">
        <ul className="flex gap-4 justify-center">
          <button onClick={() => handleClick("your")} className={`active:scale-90 duration-150 font-semibold cursor-pointer transition ${active === "your" ? 'text-white' : 'text-blue-200'}`}>Your Connections</button>
          <p>|</p>
          <button onClick={() => handleClick("potential")} className={`active:scale-90 duration-150 font-semibold cursor-pointer transition ${active === "potential" ? 'text-white' : 'text-blue-200'}`}>Potential Connections</button>
        </ul>
      </nav>
      {active === "your" &&
        <div className="grid grid-cols-2 gap-4 overflow-auto p-5 w-full lg:w-200 lg:grid-cols-4">
          {tempDB.map((item, index) => (
            <button key={index} className="aspect-[2/3] bg-blue-50 border border-blue-200 shadow-md rounded-2xl text-xl font-bold flex flex-col items-center justify-center p-4 active:opacity-75">
              <img className="rounded-full border border-blue-300 w-16 h-16" src={item.PROFILE_IMG} alt="" />
              <p className="mt-2 text-blue-400 font-bold text-xl">{item.NAME}</p>
            </button>
          ))}
        </div>
      }
      {active === "potential" &&
        <div className="grid grid-cols-2 gap-4 overflow-auto p-5 w-full lg:w-200 lg:grid-cols-4">
          {tempDB.map((item, index) => (
            <button key={index} className="aspect-[2/3] bg-blue-50 border border-blue-200 shadow-md rounded-2xl text-xl font-bold flex flex-col items-center justify-center p-4 active:opacity-75">
              <img className="rounded-full border border-blue-300 w-16 h-16" src={item.PROFILE_IMG} alt="" />
              <p className="mt-2 text-blue-400 font-bold text-xl">{item.NAME}</p>
            </button>
          ))}
        </div>
      }
    </div>
  )
}
