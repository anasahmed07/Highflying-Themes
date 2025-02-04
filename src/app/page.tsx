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
        <div className="px-2 sm:px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <ThemeCard key={i} />
          ))}
        </div>
      </section>
    </>
  );
}
