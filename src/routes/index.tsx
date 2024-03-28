import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Calendar from "~/components/calendar";
import DBEvents from "~/units/postgres/events";
import { documentHead } from "~/manifest";
import RegionNavbar from "~/components/region-navbar";
import { type Event } from "~/units/postgres/events.d";

export const useEvents = routeLoader$(async (req) => {
  const dbEvents = new DBEvents(req.env);
  const result = await dbEvents.list();
  return result as Event[];
});

export default component$(() => {
  const events = useEvents();

  return (
    <>
      <RegionNavbar />
      <div class="max-w-6xl w-full mx-auto">
        <Calendar events={events.value} />
      </div>
    </>
  );
});

export const head: DocumentHead = documentHead;
