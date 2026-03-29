import Footer from "../components/Footer";
import Image from "next/image";

export default function Browser() {
  return (
    <div className="flex flex-col min-h-screen items-stretch font-sans relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://raw.githubusercontent.com/cltq/cltq/refs/heads/main/assets/Kanade.png"
          alt="background"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      
      <main className="flex flex-1 flex-col items-end justify-end pb-8 px-4 relative z-10">
        <div className="w-full max-w-2xl mx-auto">
          <form
            action="https://search.brave.com/search"
            method="GET"
          >
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="w-full px-5 py-3 pr-12 rounded-full border-2 border-white bg-black/50 text-white text-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
