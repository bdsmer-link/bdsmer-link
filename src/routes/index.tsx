import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Calendar from "~/components/calendar";
import { documentHead } from "~/manifest";
import SearchBar from "~/components/search-bar";
import { type Event } from "~/units/postgres/events.d";

export const useEvents = routeLoader$(async (req) => {
  const DBEvents = (await import("~/units/postgres/events")).default;
  const dbEvents = new DBEvents(req.env);
  const result = await dbEvents.list();
  return result as Event[];
});

export default component$(() => {
  const location = useLocation();
  const events = useEvents();
  const search = useSignal("");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    search.value = location.url.searchParams.get("q") || "";
  });

  return (
    <>
      <SearchBar value={search} />
      <div class="max-w-6xl w-full mx-auto">
        <Calendar events={events.value} keyword={search} />
      </div>
    </>
  );
});

export const head: DocumentHead = documentHead;
