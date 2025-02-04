
const ThemeCard = () => {
  return (
    <div className="w-full p-2 bg-slate-700 text-white h-80 rounded-lg">
        <div className="w-full h-48 bg-slate-600 rounded-lg"></div>
        <div className="mt-2">
            <h1 className="text-2xl font-bold">Theme Name</h1>
            <p className="text-sm">Description</p>
        </div>
    </div>
  )
}

export default ThemeCard