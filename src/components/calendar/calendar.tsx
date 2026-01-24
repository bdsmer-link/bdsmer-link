import getDay from "date-fns/getDay";
import addDays from "date-fns/addDays";
import getWeek from "date-fns/getWeek";
import getYear from "date-fns/getYear";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import { component$, useTask$, useSignal, type Signal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import WeekEvents from "~/components/week-events";
import MiniCalendar from "~/components/mini-calendar";
import type { WeekEventsProps } from "~/components/week-events/week-events";
import type { Event } from "~/lib/database";

interface WeekData {
  weekId: number;
  week: Date;
  next: number;
  events: { [day: string]: Event[] };
}

interface CalendarProps {
  isMini?: boolean;
  uid?: string;
  events: Event[];
  keyword: Signal<string>;
}

export default component$<CalendarProps>(({ events, keyword, isMini, uid }) => {
  const location = useLocation();
  const weekEvents = useSignal<{ [week: string]: WeekEventsProps }>();
  const weeksData = useSignal<WeekData[]>([]);

  useTask$(({ track }) => {
    const newEvents = track(() => events);
    const newKeyword = track(() => keyword.value);

    const keywords = newKeyword.split(" ").map((key) => key.toLowerCase());
    const fields = ["summary", "provider"];
    const filteredEvents =
      newKeyword.length > 1
        ? events.filter((event) => {
            return keywords.every((key) =>
              fields.some((field) =>
                (event as any)[field]?.toLowerCase().includes(key),
              ),
            );
          })
        : newEvents;

    if (newKeyword.length > 1) {
      const pathname = location.url.pathname;
      const searchParams = new URLSearchParams(location.url.search);
      searchParams.set("q", newKeyword);
      const newUrl = `${pathname}?${searchParams.toString()}`;
      window.history.pushState(null, "", newUrl);
    }

    const results: { [week: string]: WeekEventsProps } = {};
    const weeksArray: WeekData[] = [];

    let currentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 13; i += 1) {
      const endOfDate = endOfWeek(currentWeek, { weekStartsOn: 1 });
      const year = (getYear(endOfDate) - 2000) * 100;
      const weekId = getWeek(endOfDate, { weekStartsOn: 1 }) + year;
      const weekData = {
        weekId,
        next: i,
        week: currentWeek,
        events: {
          "0": [],
          "1": [],
          "2": [],
          "3": [],
          "4": [],
          "5": [],
          "6": [],
        } as { [day: string]: Event[] },
      };
      results[weekId] = weekData;
      weeksArray.push(weekData);
      currentWeek = addDays(currentWeek, 7);
    }

    filteredEvents.forEach((event) => {
      const date = new Date(event.startAt);
      const endOfDate = endOfWeek(date, { weekStartsOn: 1 });
      const year = (getYear(endOfDate) - 2000) * 100;
      const weekId = getWeek(endOfDate, { weekStartsOn: 1 }) + year;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!results[weekId]) return;
      const day = getDay(date);
      results[weekId].events[day === 0 ? 6 : day - 1].push(event);
    });

    weekEvents.value = results;
    weeksData.value = weeksArray;
  });

  return (
    <div class={["relative", isMini ? "py-8" : "lg:flex lg:gap-6"]}>
      {!isMini && <MiniCalendar weeks={weeksData.value} />}
      <div class={["flex-1", { "py-8": !isMini }]}>
        {weekEvents.value &&
          Object.keys(weekEvents.value).map((key) => {
            if (!weekEvents.value) return null;
            const { weekId, next, week, events } = weekEvents.value[key];
            return (
              <WeekEvents
                key={week.getTime()}
                weekId={weekId}
                next={next}
                week={week}
                events={events}
                isMini={isMini}
                uid={uid}
              />
            );
          })}
      </div>
    </div>
  );
});
