
const ThemeCard = () => {
  return (
    <div className="w-full p-2 bg-[#1E1E1E] text-white h-80 rounded-lg hover:translate-y-2 duration-300 hover:bg-[#066B48]">
        <div className="w-full h-48 bg-[#333333] rounded-lg"></div>
        <div className="mt-2">
            <h1 className="text-2xl font-bold">Theme Name</h1>
            <p className="text-sm">Description</p>
        </div>
    </div>
  )
}

export default ThemeCard