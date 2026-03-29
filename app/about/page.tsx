import Navbar from "../components/cNavbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-semibold mb-4">About Page</h1>
        <p className="max-w-xl text-center text-xl">
          This is the About route. Placeholder Right now.
        </p>
      </main>
    </div>
  );
}
