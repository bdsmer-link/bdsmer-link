import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type DocumentHead } from "@builder.io/qwik-city";
import EventDetail from "~/components/event-detail/event-detail";
import { getDatabase, Events, type Event } from "~/lib/database";
import { documentHead } from "~/manifest";

export const useEvent = routeLoader$(async (req) => {
  const db = getDatabase(req.env);
  const events = new Events(db);
  const result = await events.get(req.params.id);
  return result as Event;
});

export default component$(() => {
  const event = useEvent();

  return <EventDetail event={event.value} />;
});

export const head: DocumentHead = documentHead;
