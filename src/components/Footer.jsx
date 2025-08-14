export function Footer() {
  return (
    <footer>
      <div className="fixed bottom-0 -z-20 flex h-[75svh] w-full justify-center overflow-hidden bg-purple-900 px-4 md:px-12 xl:px-24">
        <div className="flex w-full flex-col items-center justify-between">
          <div className="grid w-full gap-8 text-lg text-balance text-zinc-300 md:grid-cols-2 md:text-xl lg:text-2xl 2xl:text-3xl">
            <div className="flex flex-col gap-2 lg:w-fit lg:gap-4">
              <h2 className="text-xl font-bold md:text-2xl lg:text-3xl 2xl:text-4xl">
                Quick Links
              </h2>
              <div className="mr-6 flex justify-between text-base md:flex-col md:text-xl lg:gap-4 lg:text-2xl 2xl:text-3xl">
                <a href="#how-it-works" className="hover:text-purple-300">
                  How it Works
                </a>
                <a href="#ui-preview" className="hover:text-purple-300">
                  UI Preview
                </a>
                <a href="#get-started" className="hover:text-purple-300">
                  Get Started
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:text-right">
              <p>
                StreamSync is a concept. <br /> An exploration in design
                fiction.
              </p>
              <p>
                This concept website was designed <br /> and developed by{" "}
                <br className="md:hidden lg:block" />
                <a
                  href="https://suhrud.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:underline"
                >
                  Suhrud Shringarputale
                </a>
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center pb-4 lg:pb-0">
            <div className="w-full">
              <div className="relative w-full">
                <img src="StreamSync-Logo.svg" alt="" className="w-full" />
                <div className="absolute bottom-0 h-full w-full bg-gradient-to-b from-transparent to-purple-900 to-65%"></div>
              </div>
              <div className="z-10 h-0.25 w-full -translate-y-4 bg-zinc-400 md:-translate-y-10 lg:-translate-y-14 xl:-translate-y-16 2xl:h-0.5 2xl:-translate-y-24"></div>
            </div>
            <p className="z-10 self-end text-right text-sm text-zinc-400 md:-translate-y-8 lg:-translate-y-12 lg:text-base xl:-translate-y-14 2xl:-translate-y-20">
              © 2024 StreamSync
            </p>
          </div>
        </div>
      </div>
      <div className="h-[75svh]"></div>
    </footer>
  );
}
