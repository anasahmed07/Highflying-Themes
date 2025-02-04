import ThemeCard from "@/components/themeCard";

export default function HomePage() {
  return (
    <>
      <main className="h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-bold text-center text-white">
            Welcome to Highflying Themes!
          </h1>
          <p className="text-lg text-center text-gray-300">
            This is the homepage of your application.
          </p>
        </div>
      </main>
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Featured Themes
        </h2>
        <div className="px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-3 gap-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <ThemeCard key={i} />
          ))}
        </div>
      </section>
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Latest Themes
        </h2>
        <div className="px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-3 gap-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <ThemeCard key={i} />
          ))}
        </div>
      </section>
      <section className="py-16 h-96">
        <div className="text-3xl font-bold text-center text-white mb-8">About Us</div>
      </section>
      <section className="py-16 h-96">
        <div className="text-3xl font-bold text-center text-white mb-8">Contact Us</div>
      </section>
    </>
  );
}
