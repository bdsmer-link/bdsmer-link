import { routeLoader$ } from "@builder.io/qwik-city";
import { getDatabase, Events, type Event } from "~/lib/database";

export const useEvent = routeLoader$(async (req) => {
  const db = getDatabase(req.env);
  const events = new Events(db);
  const result = await events.get(req.params.id);
  return result as Event;
});
