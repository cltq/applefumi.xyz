import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-gray-100 text-zinc-900 dark:text-zinc-900">
      <Navbar />
      <main className="flex-1 p-6 sm:p-8 pt-20 sm:pt-24">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">About Page</h1>
        <p className="max-w-xl text-center text-base sm:text-xl">
          This is the About route. Placeholder Right now.
        </p>
      </main>
      <Footer />
    </div>
  );
}
