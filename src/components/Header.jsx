import { CTA } from "./CTA";

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-300">
      <img src="StreamSync-Logo.svg" alt="" className="w-48" />
      <CTA header />
    </header>
  );
}
