import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Calendar from "~/components/calendar/calendar";
import { documentHead } from "~/manifest";
import { routeLoader$ } from "@builder.io/qwik-city";
import { ProviderRegion } from "~/units/postgres/providers.d";
import RegionNavbar from "~/components/region-navbar";
import { type Event } from "~/units/postgres/events.d";

export const useEvents = routeLoader$(async (req) => {
  const DBEvents = (await import("~/units/postgres/events")).default;
  const dbEvents = new DBEvents(req.env);
  const result = await dbEvents.list(ProviderRegion.southern);
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
