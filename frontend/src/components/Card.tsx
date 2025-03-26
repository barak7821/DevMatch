import { CSSProperties, FC, useEffect, useState } from 'react'
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion"
import projects from '../utils/DBProject'

interface User {
  ID: number
  NAME: string
  PROFILE_IMG: string
}

interface CardProps {
  data: User
  onSwipe?: () => void
  style: CSSProperties
  side: (sideDirection: string) => void
}

const Card: FC<CardProps> = ({ data, onSwipe, style, side }) => {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-10, 10])
  const [hasProjects, setHasProjects] = useState(false)

  useEffect(() => {
    const userHasProjects = projects.some(project => project.USER_ID === data.ID)
    setHasProjects(userHasProjects)
  }, [data.ID])

  const handleDragEnd = async (_: Event, info: PanInfo) => {
    if (!onSwipe) return
    const offsetX = info.offset.x
    const velocityX = info.velocity.x

    if (offsetX > 150 || velocityX > 500) {
      await controls.start({ x: 500, opacity: 0, rotate: 20, transition: { duration: 0.3 } })
      onSwipe()
      side("right")
    } else if (offsetX < -150 || velocityX < -500) {
      await controls.start({ x: -500, opacity: 0, rotate: -20, transition: { duration: 0.3 } })
      onSwipe()
      side("left")
    } else {
      controls.start({ x: 0, y: 0, rotate: 0, transition: { duration: 0.2 } })
    }
  }

  return (
    <>
      {hasProjects && (
        <motion.div drag={onSwipe ? "x" : false} dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }} onDragEnd={handleDragEnd} animate={controls} style={{ x, rotate, ...style }}
          className="absolute inset-0 bg-blue-50 shadow-lg rounded-2xl cursor-grab active:cursor-grabbing overflow-auto">
          <div className='flex flex-col items-center p-6'>
            <img className='rounded-full border-gray-300' src={data.PROFILE_IMG} alt="" />
            <p className='mt-4 text-gray-800 font-bold text-xl'>{data.NAME}</p>
            <p className='mt-2 text-gray-800 text-base'>{projects.find(p => p.USER_ID === data.ID)?.DESCRIPTION}</p>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Card
