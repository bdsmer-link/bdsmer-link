import map from "lodash/map";
import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  getDatabase,
  Communities,
  Events,
  Calendars,
  shortIdToUuid,
  type Community,
  type Event,
} from "~/lib/database";
import Calendar from "~/components/calendar";

type CommunityLoaderPayload = Community & {
  events?: Event[];
};

export const useUser = routeLoader$<CommunityLoaderPayload>(async (req) => {
  const db = getDatabase(req.env);
  const communities = new Communities(db);
  const events = new Events(db);
  const calendars = new Calendars(db);
  const communityUid = req.params.uid;

  try {
    // Try shortId first, then fallback to uid
    const uuid = shortIdToUuid(communityUid);

    let community = uuid ? await communities.load(uuid) : null;

    // If not found by shortId, try by uid
    if (!community) {
      community = await communities.loadByUid(communityUid);
    }

    if (!community) throw new Response("Not Found", { status: 404 });

    const result: CommunityLoaderPayload = { ...community };

    const calendar = await calendars.loadByCommunityId(community.id);
    if (calendar && calendar.id) {
      const eventList = await events.findByCommunity(community.id);
      result.events = map(eventList, (event) => ({ ...event }));
    }

    return result;
  } catch (error) {
    if (error instanceof Response) throw req.send(error);
    throw req.send(new Response("Not Found", { status: 404 }));
  }
});

export default component$(() => {
  const user = useUser();
  const keyword = useSignal("");

  useStyles$(`
    .theme-avatar {
      border-color: var(--border-color);
      --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--color-primary);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    }
  `);

  return (
    <>
      <div class="flex flex-col items-center pt-6">
        {user.value.avatar && (
          <img
            class="w-36 h-36 p-1 rounded-full ring-2 theme-avatar"
            width="144"
            height="144"
            src={user.value.avatar}
            alt="Bordered avatar"
          />
        )}
        <div class="text-center pt-3 font-bold text-xl">{user.value.name}</div>
        <div class="text-center py-2 text-secondary">
          {user.value.introduction}
        </div>
      </div>
      <hr class="w-64 h-px my-4 bg-gray-200 dark:bg-gray-800 border-0 mx-auto" />
      {user.value.events && (
        <Calendar
          keyword={keyword}
          isMini={true}
          uid={user.value.uid || undefined}
          events={user.value.events}
        />
      )}
    </>
  );
});
