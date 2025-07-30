export function StepCard({ id, step, title, children, ref }) {
  return (
    <div id={id} ref={ref} className="flex items-center md:w-2/3 lg:w-full">
      <div className="relative flex flex-col gap-2 rounded-3xl bg-zinc-800 px-8 py-6 before:absolute before:inset-0 before:-z-10 before:-m-0.5 before:rounded-3xl before:bg-conic-110 before:from-black before:from-30% before:via-purple-500 before:to-black before:to-100% xl:py-12">
        <h3 className="font-heading flex justify-between text-2xl font-semibold lg:text-3xl xl:text-5xl">
          {title} <span className="text-purple-300">{step}</span>
        </h3>
        <p className="text-lg text-zinc-300 lg:w-4/5 lg:text-xl xl:text-2xl">
          {children}
        </p>
      </div>
    </div>
  );
}
