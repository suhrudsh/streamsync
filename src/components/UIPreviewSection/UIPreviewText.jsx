import React from "react";
export function UIPreviewText({ heading, children }) {
  return (
    <div className="flex snap-center snap-always flex-col justify-center text-center lg:h-svh lg:text-left">
      <h3 className="font-heading mb-4 text-2xl font-semibold whitespace-pre-line lg:text-4xl xl:text-5xl">
        {heading}
      </h3>
      <p className="text-lg text-balance text-zinc-300 xl:text-3xl">
        {children}
      </p>
    </div>
  );
}
