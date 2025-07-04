import ThemeCard, { ThemeCardProps } from "@/components/themeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { apiService } from "@/lib/api";
import SearchAndFilters from "@/components/SearchAndFilters";

export const revalidate = 60; // ISR

interface ThemesPageProps {
  searchParams?: Promise<{
    page?: string;
    search?: string;
    tags?: string;
    sort?: string;
    rating?: string;
  }>;
}

export default async function ThemesPage({ searchParams }: ThemesPageProps) {
  const params = searchParams ? await searchParams : {};
  const page = Number(params.page) || 1;
  const limit = 15;
  const search = params.search || "";
  const tags = params.tags || "";
  const sort = params.sort || "newest";
  const rating = params.rating || "";

  // Pass tags as a comma-separated string to the API (update your backend to support this if needed)
  const { themes, total } = await apiService.getThemes(page, limit, { search, tags, rating });
  const totalPages = Math.ceil(total / limit);

  let themeCards: ThemeCardProps[] = themes.map(theme => ({
    href: `/themes/${theme.theme_id}`,
    title: theme.name,
    description: theme.short_description,
    rating: 4.5, // Placeholder
    isNew: false, // Placeholder
    author: theme.author_name,
    authorAvatar: theme.author_name[0],
    downloads: theme.download_count || 0,
    imageUrl: theme.preview_b64 ? `data:image/png;base64,${theme.preview_b64}` : undefined,
  }));

  // Client-side sort (sort param is not sent to API)
  if (sort === "downloads") {
    themeCards = themeCards.slice().sort((a, b) => b.downloads - a.downloads);
  } else if (sort === "rating") {
    themeCards = themeCards.slice().sort((a, b) => b.rating - a.rating);
  } else if (sort === "popular") {
    themeCards = themeCards.slice().sort((a, b) => b.downloads - a.downloads); // Placeholder: same as downloads
  } else if (sort === "newest") {
    // If you have a date field, sort by it here
    // themeCards = themeCards.slice().sort((a, b) => ...)
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const filterQuery = (params: Record<string, string | number | undefined>) => {
    const q = Object.entries(params)
      .filter(([k, v]) => v && k !== "page")
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    return q ? `&${q}` : "";
  };

  return (
    <>
      <main className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mix-blend-difference mb-8">
            <h1 className="text-4xl font-light text-white mb-4">Browse Themes</h1>
            <p className="text-gray-300 max-w-2xl">
              Discover thousands of custom themes created by our community. 
              Find the perfect theme for your Nintendo handheld.
            </p>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            search={search}
            tags={tags}
            sort={sort}
            rating={rating}
          />

          {/* Results Info */}
          <div className="mix-blend-difference flex items-center justify-between mb-6">
            <p className="text-gray-300">
              Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total} themes
            </p>
          </div>

          {/* Themes Grid/List */}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {themeCards.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">No themes found.</div>
            ) : (
              themeCards.map((theme) => (
                <ThemeCard key={theme.href} {...theme} />
              ))
            )}
          </div>
        </div>
      </main>
      {/* Pagination */}
      <section className="mix-blend-difference py-16">
        <div className="flex justify-center gap-6 sm:gap-14">
          <Link
            href={`/themes?page=${page - 1}${filterQuery({ search, tags, rating })}`}
            className={`flex items-center text-sm hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50${page === 1 ? ' pointer-events-none opacity-50' : ''}`}
            aria-disabled={page === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Link>
          <div className="flex space-x-1">
            {getPageNumbers().map((p, index) => (
              typeof p === 'number' ? (
                <Link
                  key={index}
                  href={`/themes?page=${p}${filterQuery({ search, tags, rating })}`}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg hover:text-gray-400 disabled:cursor-not-allowed text-sm ${
                    p === page ? 'bg-emerald-600 text-white' : 'text-gray-300'
                  }`}
                  aria-disabled={p === page}
                >
                  {p}
                </Link>
              ) : (
                <span key={index} className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
              )
            ))}
          </div>
          <Link
            href={`/themes?page=${page + 1}${filterQuery({ search, tags, rating })}`}
            className={`flex items-center text-sm hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50${page === totalPages ? ' pointer-events-none opacity-50' : ''}`}
            aria-disabled={page === totalPages}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
