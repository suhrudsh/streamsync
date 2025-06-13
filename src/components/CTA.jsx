export function CTA({ header }) {
  return (
    <a
      href=""
      className={`relative inline-block self-center rounded-2xl bg-zinc-800 px-8 py-2 font-bold tracking-wide text-white transition duration-300 before:transition before:duration-300 hover:bg-white hover:text-black hover:before:from-zinc-300 hover:before:to-zinc-300 ${header ? "text-xs md:text-base lg:text-lg" : "text-lg md:text-xl lg:text-2xl xl:text-4xl"} before:absolute before:inset-0 before:-z-10 before:-m-0.5 before:rounded-2xl before:bg-conic-110 before:from-black before:from-35% before:via-zinc-300 before:to-black before:to-100%`}
    >
      Join Waitlist
    </a>
  );
}
