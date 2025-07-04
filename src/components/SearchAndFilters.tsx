"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

interface SearchAndFiltersProps {
  search: string;
  tags: string;
  sort: string;
  rating: string;
  onSortChange?: (sort: string) => void;
}

export default function SearchAndFilters({ search, tags, sort, rating, onSortChange }: SearchAndFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(search);
  const [tagsInput, setTagsInput] = useState(tags);
  const [sortValue, setSortValue] = useState(sort);

  // Helper to update search params in the URL
  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  // Only trigger search on Enter or button click
  const handleSearch = () => {
    updateParam("search", searchInput);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Only trigger tags filter on Enter or button click
  const handleTags = () => {
    updateParam("tags", tagsInput);
  };

  const handleTagsKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTags();
    }
  };

  // Sort is local only
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
    if (onSortChange) onSortChange(e.target.value);
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full lg:w-auto">
          <div className="relative flex gap-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search themes..."
              className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              type="button"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(f => !f)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-600 rounded-lg text-white hover:border-gray-500 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>
      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. gaming, anime, dark"
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                onKeyDown={handleTagsKeyDown}
              />
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 font-medium"
                onClick={handleTags}
              >
                Filter
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                value={sortValue}
                onChange={handleSortChange}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="downloads">Most Downloaded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <select
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                value={rating}
                onChange={e => updateParam("rating", e.target.value)}
              >
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
  );
} 