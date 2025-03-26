export default function Header({ text }: { text: string }) {
  return (
    <div className="fixed top-0 w-full p-4 bg-gradient-to-r from-blue-400 to-blue-300 shadow-sm flex justify-center rounded-b-xl">
      <h1 className="text-2xl font-bold text-white">{text}</h1>
    </div>
  )
}
