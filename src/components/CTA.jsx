export function CTA({ header }) {
  return (
    <a
      href=""
      className={`group relative inset-0 z-0 -m-0.5 flex self-center bg-zinc-800 bg-conic-110 from-black from-35% via-zinc-300 to-black to-100% px-0.5 py-0.5 font-bold tracking-wide text-white transition duration-300 hover:bg-white hover:from-zinc-300 hover:to-zinc-300 hover:text-black lg:rounded-2xl ${
        header
          ? "rounded-xl text-xs md:text-base lg:text-lg"
          : "rounded-2xl text-base lg:text-lg xl:text-2xl"
      }`}
    >
      <span
        className={`${header ? "rounded-xl" : "rounded-2xl"} relative z-10 bg-zinc-800 px-8 py-2 transition duration-300 group-hover:bg-white group-hover:text-black lg:rounded-2xl`}
      >
        Join Waitlist
      </span>
    </a>
  );
}
