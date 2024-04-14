import range from "lodash/range";
import map from "lodash/map";
import { $, component$, useContext } from "@builder.io/qwik";
import { addDays, startOfDay } from "date-fns";
import format from "~/units/date-tz";
import EventLink from "../event-link/event-link";
import { Calendar, CalendarContext } from "~/contexts/calendar-context";
import type { Event } from "~/units/postgres/events.d";
import IconCalendar from "./calendar.svg?jsx";
import IconCalendarDays from "./calendar-days.svg?jsx";

export type DateEvents = {
  date: Date;
  events: Event[];
};

export interface WeekEventsProps {
  isMini?: boolean;
  uid?: string;
  week: Date;
  events: {
    [day: string]: Event[];
  };
}

export default component$<WeekEventsProps>((props) => {
  const calendar = useContext(CalendarContext);

  const startOfToday = startOfDay(new Date());

  return (
    <div
      class={[
        "flex justify-center mx-auto",
        props.isMini ? "flex-col" : "flex-col lg:flex-row",
      ]}
    >
      <div
        class={[
          "bg-background top-0 z-10 py-2 sticky select-none text-sm",
          props.isMini ? "w-full" : "lg:mr-4 lg:mb-auto lg:pt-3",
        ]}
      >
        <div class="flex flex-row justify-between border-primary border-l-2 pl-2 w-full max-w-sm mx-auto">
          <div>{format(props.week, "MMMM")}</div>
          <button
            type="button"
            class="flex flex-row gap-2 items-center justify-center"
            onClick$={(_, elem) => {
              calendar.value =
                calendar.value === Calendar.monthly
                  ? Calendar.weekly
                  : Calendar.monthly;
              if (calendar.value === Calendar.weekly) {
                setTimeout(() => {
                  let target: HTMLElement | null = elem;
                  let top = 0;
                  while (target) {
                    top +=
                      target.offsetTop - target.scrollLeft + target.clientTop;
                    target = target.offsetParent as HTMLElement | null;
                  }
                  window.scrollTo({ top: top - 110, behavior: "smooth" });
                }, 500);
              }
            }}
          >
            <span>-</span>
            {calendar.value === Calendar.monthly && (
              <IconCalendar class="w-4 h-4" />
            )}
            {calendar.value === Calendar.weekly && (
              <IconCalendarDays class="w-4 h-4" />
            )}
            <span>-</span>
          </button>
        </div>
        <table class="table-fixed w-full max-w-sm mx-auto">
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thr</th>
              <th>Fri</th>
              <th class="text-red-500">Sat</th>
              <th class="text-red-500">Sun</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
                const day = addDays(new Date(props.week), offset);

                const id = format(day, "MMdd");
                const date = format(day, "dd");
                const isHoliday = format(day, "iiiii") === "S";
                const isBefore = day < startOfToday;

                let afternoon = 0;
                let night = 0;
                props.events[offset].forEach((event) => {
                  const startAt = new Date(event.startAt);
                  const hour = Number(format(startAt, "H"));
                  if (hour < 17) afternoon += 1;
                  else night += 1;
                });

                const hasEvents = afternoon + night > 0;
                const onClick = $(() => {
                  if (!hasEvents) return;
                  calendar.value = Calendar.weekly;
                  setTimeout(() => {
                    let target = document.getElementById(id);
                    let top = 0;
                    while (target) {
                      top +=
                        target.offsetTop - target.scrollLeft + target.clientTop;
                      target = target.offsetParent as HTMLElement | null;
                    }
                    window.scrollTo({ top: top - 110, behavior: "smooth" });
                  }, 500);
                });

                return (
                  <td
                    key={day.getTime()}
                    class={[
                      "h-12 border border-background",
                      { "cursor-pointer": hasEvents, "opacity-60": isBefore },
                    ]}
                  >
                    <button
                      type="button"
                      class="w-full h-full relative rounded border border-border bg-box-background"
                      preventdefault:click
                      onClick$={onClick}
                    >
                      <div
                        class={[
                          "absolute left-1 top-1",
                          {
                            "text-red-500": isHoliday,
                          },
                        ]}
                      >
                        {date}
                      </div>
                      <div class="flex flex-row justify-end items-center h-2 absolute right-1 bottom-3">
                        {map(range(afternoon > 5 ? 5 : afternoon), () => (
                          <div class="w-0.5 h-0.5 mx-0.5 bg-primary rounded-full" />
                        ))}
                      </div>
                      <div class="flex flex-row justify-end items-center h-2 absolute right-1 bottom-1">
                        {map(range(night > 5 ? 5 : night), () => (
                          <div class="w-0.5 h-0.5 mx-0.5 bg-primary rounded-full" />
                        ))}
                      </div>
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div class={["flex-1", { hidden: calendar.value === Calendar.monthly }]}>
        {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
          if (!(props.events[offset].length > 0)) return null;
          const date = addDays(new Date(props.week), Number(offset));
          const isBefore = date < startOfToday;
          return (
            <div
              key={date.getTime()}
              class={[
                "flex flex-row border-double",
                { "opacity-60": isBefore },
              ]}
            >
              <div
                id={format(date, "MMdd")}
                class={[
                  "mr-4 my-4 text-center",
                  { "text-red-500": format(date, "iiiii") === "S" },
                ]}
              >
                <div class="text-2xl">{format(date, "dd")}</div>
                <div class="text-sm pb-0.5">{format(date, "MMM")}</div>
                <div
                  class={[
                    "text-sm border-t border-primary pt-0.5",
                    { "border-red-500": format(date, "iiiii") === "S" },
                  ]}
                >
                  {format(date, "iii")}
                </div>
              </div>
              <div class="flex-auto">
                {props.events[offset].map((event) => (
                  <EventLink key={event.id} uid={props.uid} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
