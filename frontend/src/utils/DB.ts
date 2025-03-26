interface DBItem {
  ID: number
  NAME: string
  PROFILE_IMG: string
}

const users: DBItem[] = [
  {
    "ID": 1,
    "NAME": "Alice Doe",
    "PROFILE_IMG": "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    "ID": 2,
    "NAME": "Bob Smith",
    "PROFILE_IMG": "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    "ID": 3,
    "NAME": "Charlie Johnson",
    "PROFILE_IMG": "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    "ID": 4,
    "NAME": "David Brown",
    "PROFILE_IMG": "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    "ID": 5,
    "NAME": "Emily White",
    "PROFILE_IMG": "https://randomuser.me/api/portraits/women/5.jpg"
  }
]

export default users