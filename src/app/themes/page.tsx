'use client'
import ThemeCard from "@/components/themeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ThemesPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const themes = Array.from({ length: 50 })

  const themesPerPage = 15
  const totalPages = Math.ceil(themes.length / themesPerPage)

  const displayedThemesPerPage = themes.slice(
    (currentPage - 1) * themesPerPage,
    currentPage * themesPerPage
  )

  return (
    <>
      <main className="py-16">
        <div className="px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-3 gap-y-8">
          {displayedThemesPerPage.map((_, i) => (
            <ThemeCard key={i} />
          ))}
        </div>
      </main>
      
      <section className="py-16">
        <div className="flex justify-center gap-6 sm:gap-14">
          <button
            className="flex items-center text-sm hover:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => {setCurrentPage(prev => Math.max(prev - 1, 1));}}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </button>
          <div className="flex space-x-1">
            {
            ( totalPages <= 7 ) ?
              [...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center rounded-full hover:text-gray-400 disabled:cursor-not-allowed ${index + 1 === currentPage ? 'bg-[#1E1E1E]' : ''}`}
                  onClick={() => {setCurrentPage(index + 1)}}
                  disabled={index + 1 === currentPage}
                >
                  {index + 1}
                </button>
              )):
              (<button></button>)
              }
            
          </div>
          <button
            className="flex items-center text-sm hover:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => {setCurrentPage(prev => Math.min(prev + 1, totalPages))}}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}
