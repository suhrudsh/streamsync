export function HowItWorks() {
  return (
    <section className="h-svh py-24">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="mb-10 text-center text-4xl font-extrabold lg:text-6xl xl:text-8xl">
          Watch anything. From anywhere.
        </h2>
        <p className="mb-16 max-w-[45ch] text-center text-xl text-gray-300 lg:text-2xl xl:text-3xl">
          No more juggling apps, subscriptions, or remotes. We unify your
          streaming experience into one seamless platform.
        </p>

        <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-3 md:gap-12 lg:px-24 xl:px-48">
          <div>
            <h3 className="mb-2 text-3xl font-semibold">1. Connect Accounts</h3>
            <p className="text-lg text-gray-400 xl:text-xl">
              Securely link your existing subscriptions—Netflix, Prime, Disney+,
              and more.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-3xl font-semibold">
              2. Unified Discovery
            </h3>
            <p className="text-lg text-gray-400 xl:text-xl">
              One search bar. One watchlist. Content from all your services in
              one interface.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-3xl font-semibold">3. Stream Instantly</h3>
            <p className="text-400 lg:text-lg xl:text-xl">
              No switching apps or logging in again. Hit play and enjoy — right
              from here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
