import map from "lodash/map";
import sortBy from "lodash/sortBy";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import DBUsers from "~/units/postgres/users";
import { type Space } from "~/units/postgres/users.d";
import { documentHead } from "~/manifest";
import RightArrow from "./right-arrow.svg?jsx";

export const useSpaces = routeLoader$(async (req) => {
  const dbUsers = new DBUsers(req.env);
  const spaces = await dbUsers.listSpaces();
  return sortBy(spaces, "nickname");
});

function formatWebsite(space: Space) {
  if (space.website) {
    return space.website;
  }
  if (space.uid) {
    return `https://bdsmer.link/${space.uid}`;
  }
  return "";
}

export default component$(() => {
  const spaces = useSpaces();

  return (
    <>
      {map(spaces.value, (space) => (
        <a
          class="block p-1 my-4 border rounded-md border-primary"
          href={formatWebsite(space)}
          target="bdskerlink-space"
        >
          <div class="flex relative px-2 py-2 bg-border">
            <img
              class="h-14 w-14 rounded-full"
              src={space.avatar}
              alt="avatar"
              width={256}
              height={256}
            />
            <div class="flex-1 items-center pl-2">
              <div class="text-base pb-2 font-semibold">{space.nickname}</div>
              <div class="text-sm text-main-600 dark:text-main-300">
                {space.location}
              </div>
            </div>
            {space.lastUpdatedAt && (
              <div class="absolute top-1 right-2 text-sm text-main-600 dark:text-main-300">
                {formatDistanceToNow(new Date(space.lastUpdatedAt))}
              </div>
            )}
            <RightArrow class="absolute right-2 bottom-1 w-8 h-8 fill-primary" />
          </div>
        </a>
      ))}
    </>
  );
});

export const head: DocumentHead = documentHead;
