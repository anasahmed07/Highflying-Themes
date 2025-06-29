const ThemeCard = () => {
  return (
    <div className="group w-full p-3 bg-[#1E1E1E] text-white rounded-lg hover:translate-y-1 duration-300 hover:bg-[#2A2A2A] transition-all cursor-pointer">
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-emerald-600/20 to-blue-600/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-emerald-600/80 backdrop-blur-sm text-xs rounded-full text-white">
            New
          </span>
        </div>
      </div>
      
      <div className="mt-3 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
            Minimal Dark
          </h3>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-300">4.8</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 line-clamp-2">
          A clean and minimal dark theme with subtle animations
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">A</span>
            </div>
            <span className="text-xs text-gray-400">by Artist</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              3DS
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              1.2k
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;