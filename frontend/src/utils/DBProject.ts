interface DBProject {
  ID: number
  TITLE: string
  DESCRIPTION: string
  USER_ID: number
}

const projects: DBProject[] = [
  {
    "ID": 101,
    "TITLE": "Full-Stack Developer Needed for an E-commerce Platform",
    "DESCRIPTION": "I’m looking for an experienced Full-Stack Developer to help build an innovative online marketplace for handmade crafts. The platform should include user authentication, product listings, secure payment processing, and inventory management. This is a paid contract position, and I am specifically looking for someone skilled in React, Node.js, and MongoDB. The ideal candidate should have experience developing scalable e-commerce platforms with a focus on performance and security.",
    "USER_ID": 1
  },
  {
    "ID": 102,
    "TITLE": "Web Developer Wanted for a Portfolio Website",
    "DESCRIPTION": "I need a front-end developer to help design and develop my personal portfolio website. The goal is to create a sleek, professional, and mobile-friendly site that highlights my work. This project is open to freelancers or students looking to gain experience. While this is a low-paid or volunteer-based opportunity, it offers great exposure and a chance to work on a real-world project. HTML, CSS, JavaScript, and React are preferred skills.",
    "USER_ID": 1
  },
  {
    "ID": 103,
    "TITLE": "React Native Developer Needed for a Task Manager App",
    "DESCRIPTION": "I am developing a mobile productivity app that helps users manage their daily tasks efficiently. I am seeking a React Native developer who can build an intuitive and responsive UI while integrating with Firebase for data storage. This is an equity-based partnership, meaning we will share profits as the app grows. Ideal for someone who wants to be part of an exciting startup and contribute to a meaningful project.",
    "USER_ID": 2
  },
  {
    "ID": 104,
    "TITLE": "Back-End Developer Required for a Weather Dashboard",
    "DESCRIPTION": "I need a Node.js developer to build the back-end for a real-time weather tracking dashboard. The system should fetch and display live weather data from external APIs, providing users with accurate forecasts and climate insights. This is a paid contract, and experience with Express.js, MongoDB, and API integrations is required. The project should focus on speed, reliability, and user-friendly data visualization.",
    "USER_ID": 2
  },
  {
    "ID": 105,
    "TITLE": "AI Developer Wanted for a Customer Service Chatbot",
    "DESCRIPTION": "I’m looking for a developer with experience in AI and NLP to create an intelligent chatbot for automating customer support. The chatbot should be capable of handling FAQs, providing recommendations, and improving user experience over time. I am open to a partnership where we share equity or a contract-based agreement. Skills in Python, TensorFlow, and chatbot development are preferred.",
    "USER_ID": 3
  },
  {
    "ID": 106,
    "TITLE": "C++ Developer Needed for Stock Market Analysis Software",
    "DESCRIPTION": "I am building a real-time stock analysis tool that provides traders with actionable insights based on market trends. I am seeking a skilled C++ developer with experience in algorithmic trading and financial data processing. This is a paid contract, and proficiency in Python and API integration is a plus. The system should be optimized for high-performance computing and low-latency data retrieval.",
    "USER_ID": 4
  },
  {
    "ID": 107,
    "TITLE": "Mobile App Developer Wanted for a Fitness Tracker",
    "DESCRIPTION": "I am looking for a developer to create a fitness tracking app that allows users to log their workouts, monitor nutrition, and track health metrics over time. This project is open to a paid contract or an equity-based partnership, depending on the candidate’s preference. Experience with Flutter or React Native is essential, and familiarity with Firebase for cloud storage is preferred.",
    "USER_ID": 4
  },
  {
    "ID": 108,
    "TITLE": "Junior Developer Opportunity – Language Learning App",
    "DESCRIPTION": "I am developing an interactive language learning app that includes multimedia lessons, gamification, and progress tracking. This is a volunteer opportunity, ideal for a junior developer looking to gain experience in app development. The project focuses on web and mobile platforms, and JavaScript, React, and Firebase are preferred technologies. While this role is unpaid, there is potential for paid work in the future if the app gains traction.",
    "USER_ID": 5
  }
]

export default projects;
