import map from "lodash/map";
import {
  component$,
  useContextProvider,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
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
import { VisibleWeekContext } from "~/contexts/visible-week-context";

type CommunityLoaderPayload = Community & {
  events?: Event[];
};

export const useCommunity = routeLoader$<CommunityLoaderPayload>(
  async (req) => {
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
  },
);

export default component$(() => {
  const community = useCommunity();
  const keyword = useSignal("");
  const visibleWeek = useSignal(0);

  useContextProvider(VisibleWeekContext, visibleWeek);

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
      <div class="flex flex-col max-w-lg items-center pt-6 mx-auto">
        {community.value.avatar && (
          <a
            href={community.value.website || undefined}
            target="_blank"
            class="cursor-pointer"
            rel="noopener noreferrer"
          >
            <img
              class="w-36 h-36 p-1 rounded-full ring-2 theme-avatar"
              width="144"
              height="144"
              src={community.value.avatar}
              alt="Bordered avatar"
            />
          </a>
        )}
        <div class="text-center pt-3 font-bold text-xl">
          {community.value.name}
        </div>
        <div class="text-center py-2 text-secondary">
          {community.value.introduction}
        </div>
      </div>
      <hr class="w-64 h-px my-4 bg-gray-200 dark:bg-gray-800 border-0 mx-auto" />
      <div class="max-w-6xl w-full mx-auto px-4">
        {community.value.events && (
          <Calendar
            keyword={keyword}
            uid={community.value.uid || undefined}
            events={community.value.events}
          />
        )}
      </div>
    </>
  );
});
