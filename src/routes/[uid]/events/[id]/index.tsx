import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type DocumentHead } from "@builder.io/qwik-city";
import EventDetail from "~/components/event-detail/event-detail";
import { type Event } from "~/units/postgres/events.d";
import { documentHead } from "~/manifest";

export const useEvent = routeLoader$(async (req) => {
  const DBEvents = (await import("~/units/postgres/events")).default;
  const dbEvents = new DBEvents(req.env);
  const result = await dbEvents.get(req.params.id);
  return result as Event;
});

export default component$(() => {
  const event = useEvent();

  return <EventDetail event={event.value} />;
});

export const head: DocumentHead = documentHead;
