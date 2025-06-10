export function CTA({ header }) {
  return (
    <a
      href=""
      className={`self-center rounded-full border border-white px-8 py-2 text-white transition hover:bg-white hover:text-black ${header ? "text-sm lg:text-lg" : "text-lg lg:text-2xl xl:text-4xl"}`}
    >
      Join Waitlist
    </a>
  );
}
