import { useState } from 'react'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import tempDB from "../utils/DB"
import Header from '../components/Header'
import projects from "../utils/DBProject"
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Main() {
  const filteredUsers = tempDB.filter(user => projects.some(project => project.USER_ID === user.ID))
  const [currentIndex, setCurrentIndex] = useState(0)
  const notyf = new Notyf({ position: { x: 'center', y: 'top' } })

  const handleSide = (sideDirection: string) => {
    if (sideDirection === "right") {
      console.log("Like")
      notyf.success("Like!")
    } else if (sideDirection === "left"){
      console.log("Dislike")
      notyf.error("Dislike")
    }
  }

  const handleSwipe = () => {
    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      console.log("No More Cards Available")
      setCurrentIndex(filteredUsers.length)
    }
  }

  if (currentIndex >= filteredUsers.length) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 overflow-hidden select-none pt-[65px] pb-[70px]">
        <Header text='DevMatch' />
        <NavBar page="home" />
        <p className="text-xl font-bold">No More Placeholder Available.</p>
      </div>
    )
  }

  const cardsToShow = filteredUsers.slice(currentIndex, currentIndex + 2)

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 overflow-hidden select-none pt-[65px] pb-[70px]">
      <Header text='DevMatch' />
      <NavBar page="home" />
      <div className="relative w-[95%] h-[90%] lg:h-156 lg:w-156">
        {cardsToShow.map((item, index) => {
          const isTop = index === 0
          const offsetStyle = isTop ? { scale: 1, zIndex: 2 } : { scale: 1, zIndex: 1 }
          return (
            <Card key={currentIndex + index} data={item} onSwipe={isTop ? handleSwipe : undefined} style={offsetStyle} side={handleSide} />
          )
        })
          .reverse()
        }
      </div>
    </div>
  )
}
