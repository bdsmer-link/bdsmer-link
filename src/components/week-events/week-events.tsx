import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { addDays, startOfDay } from "date-fns";
import format from "~/units/date-tz";
import EventLink from "~/components/event-link/event-link";
import { VisibleWeekContext } from "~/contexts/visible-week-context";
import type { Event } from "~/lib/database";

export type DateEvents = {
  date: Date;
  events: Event[];
};

export interface WeekEventsProps {
  isMini?: boolean;
  uid?: string;
  week: Date;
  weekId: number;
  next: number;
  events: {
    [day: string]: Event[];
  };
}

export default component$<WeekEventsProps>((props) => {
  const visibleWeek = useContext(VisibleWeekContext);
  const containerRef = useSignal<HTMLDivElement>();

  const startOfToday = startOfDay(new Date());

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const el = containerRef.value;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleWeek.value = props.weekId;
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.1],
      },
    );

    observer.observe(el);
    cleanup(() => observer.disconnect());
  });

  return (
    <div
      id={`week-${props.weekId}`}
      ref={containerRef}
      class="flex flex-col justify-center mx-auto"
    >
      {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
        if (!(props.events[offset].length > 0)) return null;
        const date = addDays(new Date(props.week), Number(offset));
        const isBefore = date < startOfToday;
        return (
          <div
            key={date.getTime()}
            class={["flex flex-row border-double", { "opacity-60": isBefore }]}
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
  );
});
