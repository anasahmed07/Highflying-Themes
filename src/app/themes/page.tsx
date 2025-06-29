'use client'
import ThemeCard from "@/components/themeCard";
import { ChevronLeft, ChevronRight, Filter, Search, Grid, List } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const themes = Array.from({ length: 50 });
  const themesPerPage = 15;
  const totalPages = Math.ceil(themes.length / themesPerPage);

  const displayedThemesPerPage = themes.slice(
    (currentPage - 1) * themesPerPage,
    currentPage * themesPerPage
  );

  // Set view mode based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 450) { // sm breakpoint
        setViewMode('list');
      } else {
        setViewMode('grid');
      }
    };

    // Set initial view mode
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      <main className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-4">Browse Themes</h1>
            <p className="text-gray-300 max-w-2xl">
              Discover thousands of custom themes created by our community. 
              Find the perfect theme for your Nintendo handheld.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-[#1E1E1E] rounded-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search themes..."
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-600 rounded-lg text-white hover:border-gray-500 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                {/* View Mode Toggle - Visible on all screen sizes */}
                <div className="flex border border-gray-600 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select className="w-full px-3 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option value="">All Categories</option>
                      <option value="gaming">Gaming</option>
                      <option value="anime">Anime</option>
                      <option value="nature">Nature</option>
                      <option value="abstract">Abstract</option>
                      <option value="minimal">Minimal</option>
                      <option value="retro">Retro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">System</label>
                    <select className="w-full px-3 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option value="">All Systems</option>
                      <option value="3ds">Nintendo 3DS</option>
                      <option value="2ds">Nintendo 2DS</option>
                      <option value="n3ds">New Nintendo 3DS</option>
                      <option value="n2ds">New Nintendo 2DS XL</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                    <select className="w-full px-3 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                      <option value="downloads">Most Downloaded</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                    <select className="w-full px-3 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                      <option value="">Any Rating</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-300">
              Showing {((currentPage - 1) * themesPerPage) + 1} - {Math.min(currentPage * themesPerPage, themes.length)} of {themes.length} themes
            </p>
          </div>

          {/* Themes Grid/List */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
              : 'grid-cols-1'
          }`}>
            {displayedThemesPerPage.map((_, i) => (
              <ThemeCard key={i} />
            ))}
          </div>
        </div>
      </main>
      
      {/* Pagination */}
      <section className="py-16">
        <div className="flex justify-center gap-6 sm:gap-14">
          <button
            className="flex items-center text-sm hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </button>
          
          <div className="flex space-x-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-lg hover:text-gray-400 disabled:cursor-not-allowed text-sm ${
                  page === currentPage ? 'bg-emerald-600 text-white' : 'text-gray-300'
                }`}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === currentPage || page === '...'}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            className="flex items-center text-sm hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}
