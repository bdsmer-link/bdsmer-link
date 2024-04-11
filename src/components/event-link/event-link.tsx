import { component$ } from "@builder.io/qwik";
import { formatDistanceStrict } from "date-fns";
import format from "~/units/date-tz";
import type { Event } from "~/units/postgres/events.d";
import Sun from "./sun.svg?jsx";
import Moon from "./moon.svg?jsx";

interface EventLinkProps {
  event: Event;
}

export default component$<EventLinkProps>(({ event }) => {
  const startAt = new Date(event.startAt);
  const endAt = new Date(event.endAt);
  const distance = formatDistanceStrict(startAt, endAt);
  const hour = Number(format(startAt, "H"));

  const provider = event.provider || event.host || "";
  const location = event.location || "";
  const form = event.form || event.cForm || "";

  return (
    <a
      class="block p-1 my-4 border rounded-md border-border text-primary"
      href={form || `/events/${event.id}?adult=1`}
      target={`bdsmer-${event.id}`}
    >
      <div class="block relative px-2 py-2 overflow-hidden bg-box-background">
        <div class="text-sm pb-2 pl-8">{`${format(
          startAt,
          "HH:mm",
        )} - ${distance}`}</div>
        <div class="text-base font-semibold">{event.summary}</div>
        <div class="absolute top-1 right-2 text-base">
          {provider && location
            ? `${provider} ( ${location} )`
            : provider || location}
        </div>
        <div class="absolute top-1 left-2 p-px">
          {hour < 17 ? (
            <Sun class="w-6 h-6 fill-primary" />
          ) : (
            <Moon class="w-6 h-6 fill-primary" />
          )}
        </div>
      </div>
    </a>
  );
});
