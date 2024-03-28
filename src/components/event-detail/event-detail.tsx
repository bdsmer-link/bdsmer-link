import { component$ } from "@builder.io/qwik";
import { formatInTimeZone as format } from "date-fns-tz";
import { formatDistanceStrict } from "date-fns";
import type { Event } from "~/units/postgres/events.d";

interface EventDetailProps {
  event: Event;
}

export default component$<EventDetailProps>(({ event }) => {
  const startAt = new Date(event.startAt);
  const endAt = new Date(event.endAt);
  const distance = formatDistanceStrict(startAt, endAt);

  const imageUrls =
    /https?:\/\/(?:[-a-zA-Z0-9()@:%_+.~#?&/=]+)\.(jpeg|jpg|png)(?!")/gi;
  const description = event.description.replace(imageUrls, (url) => {
    return `<img src="${url}" class="max-w-full max-h-96" />`;
  });

  return (
    <>
      <div class="max-auto px-3 py-4 container">
        <div class="block relative w-full p-1 text-main border rounded-md border-main">
          <div class="bg-gray-100 p-2">
            <div class="text-xl font-semibold py-2 px-2">{event.summary}</div>
            <div class="text-base py-1 px-2">{`場地：${
              event.provider || event.host
            }`}</div>
            <div class="text-sm py-1 px-2">{`開始時間：${format(
              startAt,
              "Asia/Taipei",
              "yyyy-MM-dd HH:mm",
            )} - ${distance}`}</div>
            <div class="text-sm py-1 px-2">{`結束時間：${format(
              endAt,
              "Asia/Taipei",
              "yyyy-MM-dd HH:mm",
            )}`}</div>
            <div
              class="text-base py-1 px-2"
              dangerouslySetInnerHTML={description}
            />
          </div>
        </div>
      </div>
      <a
        class="block max-w-fit mb-8 mx-auto text-main underline underline-offset-8"
        href="/"
      >
        Back
      </a>
    </>
  );
});
