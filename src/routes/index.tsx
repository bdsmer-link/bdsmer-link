import {
  component$,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import Calendar from "~/components/calendar";
import { documentHead } from "~/manifest";
import SearchBar from "~/components/search-bar";
import { getDatabase, Events, type Event } from "~/lib/database";
import { VisibleWeekContext } from "~/contexts/visible-week-context";

export const useEvents = routeLoader$(async (req) => {
  const db = getDatabase(req.env);
  const events = new Events(db);
  const result = await events.list();

  // Set cache control and Vercel cache tag for cache invalidation
  req.cacheControl({ public: true, maxAge: 0, sMaxAge: 3600 });
  req.headers.set("Vercel-CDN-Cache-Control", "public, s-maxage=3600");
  req.headers.set("Vercel-Cache-Tag", "home");

  return result as Event[];
});

export default component$(() => {
  const location = useLocation();
  const events = useEvents();
  const search = useSignal("");
  const visibleWeek = useSignal(0);

  useContextProvider(VisibleWeekContext, visibleWeek);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    search.value = location.url.searchParams.get("q") || "";
  });

  return (
    <>
      <SearchBar value={search} />
      <div class="max-w-6xl w-full mx-auto px-4">
        <Calendar events={events.value} keyword={search} />
      </div>
    </>
  );
});

export const head: DocumentHead = documentHead;
