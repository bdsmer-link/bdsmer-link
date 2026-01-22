import map from "lodash/map";
import sortBy from "lodash/sortBy";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { getDatabase, Communities } from "~/lib/database";
import { documentHead } from "~/manifest";
import CalendarIcon from "~/components/week-events/calendar-days.svg?jsx";

export const useSpaces = routeLoader$(async (req) => {
  const db = getDatabase(req.env);
  const communities = new Communities(db);
  const spaces = await communities.listSpaces();
  return sortBy(spaces, "name");
});

export default component$(() => {
  const spaces = useSpaces();

  return (
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
      {map(spaces.value, (space) => {
        const website = space.website;
        const profileUrl = `/${space.uid || space.id}`;

        return (
          <div class="flex flex-col border rounded-md border-primary overflow-hidden">
            {website ? (
              <a
                class="flex-1 p-1 hover:bg-border/50 transition-colors"
                href={website}
                target="bdskerlink-space"
              >
                <div class="flex flex-col items-center p-3 bg-border rounded h-full">
                  <img
                    class="h-16 w-16 rounded-full mb-2"
                    src={space.avatar || ""}
                    alt="avatar"
                    width={256}
                    height={256}
                  />
                  <div class="text-sm font-semibold text-center line-clamp-1">
                    {space.name}
                  </div>
                  <div class="text-xs text-main-600 dark:text-main-300 text-center line-clamp-1">
                    {space.location}
                  </div>
                </div>
              </a>
            ) : (
              <div class="flex-1 p-1">
                <div class="flex flex-col items-center p-3 bg-border rounded h-full">
                  <img
                    class="h-16 w-16 rounded-full mb-2"
                    src={space.avatar || ""}
                    alt="avatar"
                    width={256}
                    height={256}
                  />
                  <div class="text-sm font-semibold text-center line-clamp-1">
                    {space.name}
                  </div>
                  <div class="text-xs text-main-600 dark:text-main-300 text-center line-clamp-1">
                    {space.location}
                  </div>
                </div>
              </div>
            )}
            <a
              class="flex items-center justify-center gap-1 py-3 text-sm bg-border hover:bg-secondary hover:text-white transition-colors"
              href={profileUrl}
            >
              <CalendarIcon class="w-4 h-4 stroke-current" />
              {space.eventCount}
            </a>
          </div>
        );
      })}
    </div>
  );
});

export const head: DocumentHead = documentHead;
