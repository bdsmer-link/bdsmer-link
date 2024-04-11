import pick from "lodash/pick";
import map from "lodash/map";
import { component$, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type User } from "~/units/postgres/users.d";
import type { Event } from "~/units/postgres/events.d";
import UserLink from "~/components/user-link";
import Calendar from "~/components/calendar";

type UserLoaderPayload = Pick<
  User,
  "uid" | "banner" | "nickname" | "introduction" | "avatar" | "links"
> & {
  uid: string;
  events?: Event[];
};

export const useUser = routeLoader$<UserLoaderPayload>(async (req) => {
  const DBUsers = (await import("~/units/postgres/users")).default;
  const DBEvents = (await import("~/units/postgres/events")).default;
  const DBCalendars = (await import("~/units/postgres/calendars")).default;
  const userUid = req.params.uid;
  const dbUsers = new DBUsers(req.env);
  const dbEvents = new DBEvents(req.env);
  const dbCalendars = new DBCalendars(req.env);
  try {
    const user = await dbUsers.loadUid(userUid);
    if (!user) throw new Response("Not Found", { status: 404 });
    const result = pick(user, [
      "uid",
      "banner",
      "nickname",
      "introduction",
      "avatar",
      "links",
    ]) as UserLoaderPayload;

    const calendar = await dbCalendars.loadByUserId(user.id);
    if (calendar && calendar.id) {
      const events = await dbEvents.findByUser(user.id);
      result.events = map(events, (event) => ({ ...event, host: "" }));
    }

    return result;
  } catch (error) {
    if (error instanceof Response) throw req.send(error);
    throw req.send(new Response("Not Found", { status: 404 }));
  }
});

export default component$(() => {
  const user = useUser();

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
      {user.value.banner && (
        <div class="w-full max-w-[851px]">
          <img
            class="w-full"
            src={user.value.banner}
            alt="Banner"
            width={851}
            height={315}
          />
        </div>
      )}
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
        <div class="text-center pt-3 font-bold text-xl">
          {user.value.nickname}
        </div>
        <div class="text-center py-2 text-secondary">
          {user.value.introduction}
        </div>
      </div>
      <hr class="w-64 h-px my-4 bg-gray-200 dark:bg-gray-800 border-0 mx-auto" />
      {user.value.links.map((item, index) => (
        <div class="w-full mt-2" key={`${index}_${item.type}`}>
          <UserLink uid={user.value.uid} type={item.type} item={item} />
        </div>
      ))}
      <hr class="w-64 h-px my-4 bg-gray-200 dark:bg-gray-800 border-0 mx-auto" />
      {user.value.events && (
        <Calendar
          isMini={true}
          uid={user.value.uid}
          events={user.value.events}
        />
      )}
    </>
  );
});
