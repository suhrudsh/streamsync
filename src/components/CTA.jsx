import { useRef } from "react";
import gsap from "gsap";

export function CTA({ header }) {
  const dialogRef = useRef(null);

  function openModal() {
    const dialog = dialogRef.current;
    if (!dialog) return;

    document.body.style.overflow = "hidden";
    dialog.showModal();

    // Animate in
    gsap.fromTo(
      dialog,
      { autoAlpha: 0, scale: 0.8 },
      { duration: 0.4, autoAlpha: 1, scale: 1, ease: "power2.out" },
    );
  }

  function closeModal() {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Animate out, then actually close
    gsap.to(dialog, {
      duration: 0.3,
      autoAlpha: 0,
      scale: 0.8,
      ease: "power2.in",
      onComplete: () => {
        dialog.close();
        document.body.style.overflow = "";
      },
    });
  }

  return (
    <>
      <button
        onClick={openModal}
        className={`group relative inset-0 z-0 -m-0.5 flex cursor-pointer self-center bg-zinc-800 bg-conic-110 from-black from-35% via-zinc-300 to-black to-100% px-0.5 py-0.5 font-bold tracking-wide text-white transition duration-300 hover:bg-white hover:from-zinc-300 hover:to-zinc-300 hover:text-black active:scale-95 lg:rounded-2xl ${
          header
            ? "rounded-xl text-xs md:text-base lg:text-lg"
            : "rounded-2xl text-base lg:text-lg xl:text-2xl"
        }`}
      >
        <span
          className={`${
            header ? "rounded-xl" : "rounded-2xl"
          } relative z-10 bg-zinc-800 px-8 py-2 transition duration-300 group-hover:bg-white group-hover:text-black lg:rounded-2xl`}
        >
          Join Waitlist
        </span>
      </button>

      <dialog
        ref={dialogRef}
        data-lenis-prevent
        className="fixed top-1/2 left-1/2 z-50 w-4/5 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-conic-110 from-black from-35% via-purple-500 to-black to-100% p-0 px-0.5 py-0.5 backdrop:bg-black/50 md:w-1/2 xl:w-1/3"
        // start hidden so GSAP can fade it in
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center justify-center gap-16 rounded-2xl bg-zinc-800 p-8 text-center text-white">
          <div className="space-y-4">
            <h2 className="font-heading text-base font-bold tracking-wide text-balance md:text-lg lg:text-xl lg:tracking-normal xl:text-2xl">
              Thank you for your interest, but{" "}
              <br className="hidden md:block" /> StreamSync is only a concept.
            </h2>
            <p className="text-sm text-zinc-300 md:text-base lg:text-lg xl:text-xl">
              This concept website was designed and{" "}
              <br className="hidden md:block" /> developed by{" "}
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
          <button
            onClick={closeModal}
            className="group relative inset-0 -m-0.5 flex cursor-pointer rounded-2xl bg-zinc-800 bg-conic-110 from-black from-35% via-zinc-300 to-black to-100% px-0.5 py-0.5 text-sm font-bold tracking-wide text-white transition duration-300 hover:bg-white hover:from-zinc-300 hover:to-zinc-300 hover:text-black active:scale-95 lg:text-lg xl:text-2xl"
          >
            <span className="relative rounded-2xl bg-zinc-800 px-8 py-2 transition duration-300 group-hover:bg-white group-hover:text-black">
              Close
            </span>
          </button>
        </div>
      </dialog>
    </>
  );
}
