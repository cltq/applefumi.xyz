export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen items-center text-zinc-100 font-sans">
      {/* Navbar skeleton */}
      <div className="fixed left-0 right-0 z-50 flex justify-center pointer-events-none top-4">
        <nav className="flex items-center gap-3 pointer-events-auto px-5 py-2 rounded-full bg-zinc-900/60 backdrop-blur-md border border-zinc-800/50">
          <div className="h-4 w-16 rounded bg-zinc-700/50 animate-pulse" />
          <div className="h-4 w-14 rounded bg-zinc-700/50 animate-pulse" />
          <div className="h-4 w-12 rounded bg-zinc-700/50 animate-pulse" />
        </nav>
      </div>

      {/* Main content skeleton */}
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 text-center sm:items-start sm:text-left px-2 w-full sm:w-auto">
          {/* Title skeleton */}
          <div className="h-8 sm:h-10 w-48 sm:w-64 rounded bg-zinc-700/50 animate-pulse" />
          {/* Description skeletons */}
          <div className="h-5 w-full max-w-xs sm:max-w-sm rounded bg-zinc-700/40 animate-pulse" />
          <div className="h-5 w-3/4 max-w-xs sm:max-w-sm rounded bg-zinc-700/40 animate-pulse" />
          <div className="h-5 w-full max-w-xs sm:max-w-sm rounded bg-zinc-700/40 animate-pulse" />
          {/* Link skeleton */}
          <div className="h-4 w-32 rounded bg-zinc-700/30 animate-pulse mt-2" />
        </div>

        {/* Discord widget skeleton */}
        <div className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-sm lg:max-w-md aspect-[340/220] shrink-0 mt-4 sm:mt-0">
          <div className="w-full h-full rounded-lg bg-zinc-800/50 animate-pulse" />
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <div className="h-6 w-6 rounded-full bg-zinc-700/50 animate-pulse" />
            <div className="h-6 w-6 rounded-full bg-zinc-700/50 animate-pulse" />
            <div className="h-6 w-6 rounded-full bg-zinc-700/50 animate-pulse" />
            <div className="h-6 w-6 rounded-full bg-zinc-700/50 animate-pulse" />
          </div>
          <div className="h-4 w-40 rounded bg-zinc-700/30 animate-pulse" />
        </div>
      </footer>
    </div>
  );
}
