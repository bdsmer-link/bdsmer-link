import { component$ } from "@builder.io/qwik";
import { formatInTimeZone as format } from "date-fns-tz";
import { formatDistanceStrict } from "date-fns";
import type { Event } from "~/lib/database";

interface EventDetailProps {
  event: Event;
}

export default component$<EventDetailProps>(({ event }) => {
  const startAt = new Date(event.startAt);
  const endAt = new Date(event.endAt);
  const distance = formatDistanceStrict(startAt, endAt);

  // Check if event spans overnight (different dates)
  const isOvernight =
    format(startAt, "Asia/Taipei", "yyyy-MM-dd") !==
    format(endAt, "Asia/Taipei", "yyyy-MM-dd");

  const imageUrls =
    /https?:\/\/(?:[-a-zA-Z0-9()@:%_+.~#?&/=]+)\.(jpeg|jpg|png)(?!")/gi;
  const description = (event.description || event.cDescription || "").replace(
    imageUrls,
    (url) => {
      return `<img src="${url}" class="max-w-full max-h-96" />`;
    },
  );

  return (
    <div class="max-w-4xl mx-auto px-4 py-6">
      <div class="border border-border rounded-lg overflow-hidden">
        <div class="bg-box-background p-4 md:p-6">
          <h1 class="text-2xl font-bold mb-4">{event.summary}</h1>

          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-2 text-primary">
              <svg
                class="w-5 h-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span>{event.provider}</span>
            </div>

            <div class="flex items-center gap-2 text-primary">
              <span>
                {format(startAt, "Asia/Taipei", "yyyy/MM/dd (EEE) HH:mm")}
                <span class="text-xs ml-2 opacity-70">({distance})</span>
              </span>
              {isOvernight && (
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.275,19.371c.025,.056-.035-.05,0,0H.275Zm23.725-3.871c0,4.687-3.813,8.5-8.5,8.5h-1.5c-6.108,0-10.613-.159-13.725-4.629-.341-.755-.367-1.596-.074-2.37,.292-.773,.868-1.387,1.622-1.727,.751-.34,1.594-.367,2.369-.073,.773,.292,1.387,.868,1.727,1.622,2.746,4.823,5.453,5.177,9.581,5.177,3.584,0,6.5-2.916,6.5-6.5s-2.916-6.5-6.5-6.5h-.623c.061,.342,.099,.691,.099,1.05,0,.732-.139,1.431-.382,2.079,.461-.077,.929-.129,1.407-.129,.553,0,1,.448,1,1s-.447,1-1,1c-2.416,0-4.62,1.329-5.751,3.468-.179,.339-.526,.532-.885,.532-.157,0-.317-.037-.467-.116-.488-.258-.675-.863-.416-1.352,.101-.19,.223-.363,.336-.543-2.011-.07-3.769-1.139-4.793-2.729-.009-.012-2.806-4.266-2.806-4.266-.31-.497-.324-1.097-.052-1.586,.272-.49,.79-.794,1.351-.794,0,0,1.633,.01,1.653,.011,.899-1.271,2.282-2.171,3.879-2.437l.621-1.286c.246-.509,.749-.842,1.312-.871,.552-.041,1.098,.251,1.394,.731,0,0,2.734,4.211,2.75,4.237h1.375c4.687,0,8.5,3.813,8.5,8.5Zm-11-5.5c0-2.209-1.791-4-4-4s-4,1.791-4,4,1.791,4,4,4,4-1.791,4-4Zm-5.797,11.663c-1.055-.913-2.068-2.18-3.065-3.935-.163-.35-.38-.554-.653-.657-.274-.104-.572-.094-.838,.026-.268,.121-.472,.338-.575,.611-.094,.248-.095,.518-.004,.765,1.362,1.914,2.976,2.789,5.136,3.189ZM20,2h1.086l-1.677,1.676c-.391,.391-.507,.973-.295,1.483,.211,.51,.705,.84,1.258,.84h2.628c.553,0,1-.448,1-1s-.447-1-1-1h-1.086l1.677-1.676c.391-.391,.507-.973,.295-1.483-.211-.51-.705-.84-1.258-.84h-2.628c-.553,0-1,.448-1,1s.447,1,1,1Z" />
                </svg>
              )}
            </div>

            <div class="flex items-center gap-2 text-primary">
              <span>
                {format(endAt, "Asia/Taipei", "yyyy/MM/dd (EEE) HH:mm")}
              </span>
            </div>
          </div>

          {description && (
            <div class="border-t border-border pt-4">
              <div
                class="prose prose-sm max-w-none text-primary leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={description}
              />
            </div>
          )}
        </div>
      </div>

      <div class="mt-6 text-center">
        <a
          class="inline-flex items-center gap-2 text-primary hover:opacity-70 transition-opacity"
          href="/"
        >
          <svg
            class="w-4 h-4 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          返回首頁
        </a>
      </div>
    </div>
  );
});
