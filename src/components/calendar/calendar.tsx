import getDay from "date-fns/getDay";
import addDays from "date-fns/addDays";
import getWeek from "date-fns/getWeek";
import getYear from "date-fns/getYear";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import { component$, useTask$, useSignal } from "@builder.io/qwik";
import WeekEvents from "~/components/week-events";
import type { WeekEventsProps } from "~/components/week-events/week-events";
import type { Event } from "~/units/postgres/events.d";

interface CalendarProps {
  isMini?: boolean;
  uid?: string;
  events: Event[];
}

export default component$<CalendarProps>(({ events, isMini, uid }) => {
  const weekEvents = useSignal<{ [week: string]: WeekEventsProps }>();

  useTask$(({ track }) => {
    track(() => events);

    const results: { [week: string]: WeekEventsProps } = {};

    let currentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    for (let i = 0; i < 13; i += 1) {
      const year = (getYear(endOfWeek(currentWeek)) - 2000) * 100;
      const week = getWeek(currentWeek, { weekStartsOn: 1 }) + year;
      results[week] = {
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
        },
      };
      currentWeek = addDays(currentWeek, 7);
    }

    events.forEach((event) => {
      const date = new Date(event.startAt);
      const year = (getYear(endOfWeek(date)) - 2000) * 100;
      const week = getWeek(date, { weekStartsOn: 1 }) + year;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!results[week]) return;
      const day = getDay(date);
      results[week].events[day === 0 ? 6 : day - 1].push(event);
    });

    weekEvents.value = results;
  });

  return (
    <div class="py-8 relative">
      {weekEvents.value &&
        Object.keys(weekEvents.value).map((key) => {
          if (!weekEvents.value) return null;
          const { next, week, events } = weekEvents.value[key];
          return (
            <WeekEvents
              key={week.getTime()}
              next={next}
              week={week}
              events={events}
              isMini={isMini}
              uid={uid}
            />
          );
        })}
    </div>
  );
});
