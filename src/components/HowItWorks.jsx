export function HowItWorks() {
  return (
    <section className="relative py-24">
      <div className="flex flex-col items-center justify-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-center text-4xl font-extrabold lg:text-6xl xl:text-8xl">
          Watch anything. From anywhere.
        </h2>
          <p className="max-w-[45ch] text-center text-xl text-gray-300 lg:text-2xl xl:text-3xl">
          No more juggling apps, subscriptions, or remotes. We unify your
          streaming experience into one seamless platform.
        </p>
        </div>

        <div className="flex flex-col gap-8 text-left lg:w-1/2 xl:w-1/3">
          <div className="flex flex-col gap-2 rounded-xl bg-zinc-800 px-8 py-12">
            <h3 className="font-heading flex justify-between font-semibold lg:text-4xl xl:text-5xl">
              Connect Accounts <span>1</span>
            </h3>
            <p className="w-2/3 text-lg text-gray-400 xl:text-2xl">
              Securely link your existing subscriptions—Netflix, Prime, Disney+,
              and more.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-zinc-800 px-8 py-12">
            <h3 className="font-heading flex justify-between font-semibold lg:text-4xl xl:text-5xl">
              Unified Discovery <span>2</span>
            </h3>
            <p className="w-2/3 text-lg text-gray-400 xl:text-2xl">
              One search bar. One watchlist. Content from all your services in
              one interface.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-zinc-800 px-8 py-12">
            <h3 className="font-heading flex justify-between font-semibold lg:text-4xl xl:text-5xl">
              Stream Instantly <span>3</span>
            </h3>
            <p className="w-2/3 text-lg text-gray-400 xl:text-2xl">
              No switching apps or logging in again. Hit play and enjoy — right
              from here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
