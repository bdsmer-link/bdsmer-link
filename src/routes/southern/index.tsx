import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Calendar from "~/components/calendar/calendar";
import { documentHead } from "~/manifest";
import { routeLoader$ } from "@builder.io/qwik-city";
import { UserRegion } from "~/units/postgres/users.d";
import RegionNavbar from "~/components/region-navbar";
import { type Event } from "~/units/postgres/events.d";

export const useEvents = routeLoader$(async (req) => {
  const DBEvents = (await import("~/units/postgres/events")).default;
  const dbEvents = new DBEvents(req.env);
  const result = await dbEvents.list(UserRegion.twSouthern);
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
