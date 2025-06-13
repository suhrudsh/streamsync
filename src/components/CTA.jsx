export function CTA({ header }) {
  return (
    <a
      href=""
      className={`relative inline-block self-center rounded-2xl bg-zinc-800 px-8 py-2 text-white transition-colors duration-300 before:transition-colors before:duration-300 hover:bg-white hover:text-black hover:before:from-zinc-300 hover:before:to-zinc-300 ${header ? "text-sm lg:text-lg" : "text-lg lg:text-2xl xl:text-4xl"} before:absolute before:inset-0 before:-z-10 before:-m-0.5 before:rounded-2xl before:bg-conic-110 before:from-black before:from-30% before:via-zinc-300 before:to-black before:to-100%`}
    >
      Join Waitlist
    </a>
  );
}
