import { UIPreviewText } from "./UIPreviewText";

export function UIPreviewMobile() {
  return (
    <section id="ui-preview" className="bg-black md:space-y-32">
      <div className="flex h-lvh flex-col items-center justify-evenly md:h-fit md:gap-16">
        <img
          src="uiPreview/ui-preview-homepage.webp"
          alt=""
          className="rounded-3xl shadow-xl shadow-purple-500/30 md:w-2/3"
        />
        <UIPreviewText heading={"All your platforms.\nOne powerful hub."}>
          Jump right into trending content — no switching apps.
        </UIPreviewText>
      </div>

      <div className="flex h-lvh flex-col items-center justify-evenly md:h-fit md:gap-16">
        <img
          src="uiPreview/ui-preview-watchlist.webp"
          alt=""
          className="rounded-3xl shadow-xl shadow-purple-500/30 md:w-2/3"
        />
        <UIPreviewText heading={"Your personalized watchlist — everywhere."}>
          See everything you’ve saved across Netflix, Prime & more.
        </UIPreviewText>
      </div>

      <div className="flex h-lvh flex-col items-center justify-evenly md:h-fit md:gap-16">
        <img
          src="uiPreview/ui-preview-search.webp"
          alt=""
          className="rounded-3xl shadow-xl shadow-purple-500/30 md:w-2/3"
        />
        <UIPreviewText heading={"Find it once.\nPlay it anywhere."}>
          Search across all your subscriptions with one click.
        </UIPreviewText>
      </div>
    </section>
  );
}
