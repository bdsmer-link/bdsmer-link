import range from "lodash/range";
import map from "lodash/map";
import {
  component$,
  useContext,
  $,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { addDays, startOfDay } from "date-fns";
import format from "~/units/date-tz";
import { VisibleWeekContext } from "~/contexts/visible-week-context";
import type { Event } from "~/lib/database";

interface WeekData {
  weekId: number;
  week: Date;
  next: number;
  events: { [day: string]: Event[] };
}

interface MiniCalendarProps {
  weeks: WeekData[];
}

interface MonthGroup {
  month: string;
  year: string;
  weeks: WeekData[];
}

export default component$<MiniCalendarProps>(({ weeks }) => {
  const visibleWeek = useContext(VisibleWeekContext);
  const startOfToday = startOfDay(new Date());
  const currentWeekIndex = useSignal(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const weekId = track(() => visibleWeek.value);
    const index = weeks.findIndex((w) => w.weekId === weekId);
    if (index >= 0) {
      currentWeekIndex.value = index;
    }
  });

  const scrollToDate = $((dateId: string) => {
    const element = document.getElementById(dateId);
    if (element) {
      // Calculate sticky header height dynamically
      const mobileCalendar = document.querySelector(".lg\\:hidden.sticky");
      const headerOffset =
        mobileCalendar?.getBoundingClientRect().height || 120;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  });

  // Group weeks by month
  const monthGroups: MonthGroup[] = [];
  weeks.forEach((weekData) => {
    // Use the end of week (Sunday) to determine the month
    const endOfWeekDate = addDays(new Date(weekData.week), 6);
    const month = format(endOfWeekDate, "MMMM");
    const year = format(endOfWeekDate, "yyyy");

    const lastGroup = monthGroups[monthGroups.length - 1] as
      | MonthGroup
      | undefined;
    if (lastGroup?.month === month && lastGroup.year === year) {
      lastGroup.weeks.push(weekData);
    } else {
      monthGroups.push({ month, year, weeks: [weekData] });
    }
  });

  // Render a single week row
  const renderWeekRow = (weekData: WeekData, isActive: boolean) => (
    <tr key={weekData.weekId} class="transition-colors">
      {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
        const day = addDays(new Date(weekData.week), offset);
        const date = format(day, "dd");
        const isHoliday = format(day, "iiiii") === "S";
        const isBefore = day < startOfToday;
        const isToday = day.getTime() === startOfToday.getTime();
        const dayEvents = weekData.events[offset];

        let afternoon = 0;
        let night = 0;
        dayEvents.forEach((event) => {
          const startAt = new Date(event.startAt);
          const hour = Number(format(startAt, "H"));
          if (hour < 17) afternoon += 1;
          else night += 1;
        });

        const hasEvents = afternoon + night > 0;

        return (
          <td
            key={day.getTime()}
            class={[
              "h-10 border border-transparent",
              {
                "cursor-pointer": hasEvents,
                "opacity-60": isBefore,
              },
            ]}
          >
            <button
              type="button"
              class={[
                "w-full h-full relative rounded border border-border text-xs",
                isActive ? "bg-box-background/80" : "bg-box-background",
              ]}
              onClick$={() => scrollToDate(format(day, "MMdd"))}
            >
              <div
                class={[
                  "absolute left-0.5 top-0.5",
                  {
                    "text-red-500": isHoliday,
                    "font-bold": isToday,
                  },
                ]}
              >
                {date}
              </div>
              <div class="flex flex-row justify-end items-center h-2 absolute right-0.5 bottom-2.5">
                {map(range(afternoon > 5 ? 5 : afternoon), (_, i) => (
                  <div
                    key={i}
                    class="w-0.5 h-0.5 mx-0.5 bg-primary rounded-full"
                  />
                ))}
              </div>
              <div class="flex flex-row justify-end items-center h-2 absolute right-0.5 bottom-0.5">
                {map(range(night > 5 ? 5 : night), (_, i) => (
                  <div
                    key={i}
                    class="w-0.5 h-0.5 mx-0.5 bg-primary rounded-full"
                  />
                ))}
              </div>
            </button>
          </td>
        );
      })}
    </tr>
  );

  // Render mobile week content
  const renderMobileWeek = (weekData: WeekData) => (
    <>
      <div class="border-primary border-l-2 pl-2 mb-2">
        <span>
          {format(addDays(new Date(weekData.week), 6), "MMMM")}
          {weekData.next === 0 ? " (this week)" : ` (in ${weekData.next}wks)`}
        </span>
      </div>
      <table class="table-fixed w-full">
        <thead>
          <tr class="text-xs">
            <th class="font-normal">Mon</th>
            <th class="font-normal">Tue</th>
            <th class="font-normal">Wed</th>
            <th class="font-normal">Thr</th>
            <th class="font-normal">Fri</th>
            <th class="font-normal text-red-500">Sat</th>
            <th class="font-normal text-red-500">Sun</th>
          </tr>
        </thead>
        <tbody>{renderWeekRow(weekData, true)}</tbody>
      </table>
    </>
  );

  return (
    <>
      {/* Mobile: Single week view - show based on currentWeekIndex signal */}
      <div class="lg:hidden bg-background sticky top-0 z-10 py-2 select-none text-sm">
        <div class="w-full max-w-sm mx-auto">
          {weeks.map((weekData, index) => (
            <div
              key={weekData.weekId}
              class={[{ hidden: currentWeekIndex.value !== index }]}
            >
              {renderMobileWeek(weekData)}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Full calendar view */}
      <div class="hidden lg:block lg:sticky lg:top-4 lg:self-start w-80 shrink-0">
        <div class="space-y-4">
          {monthGroups.map((group) => {
            const hasActiveWeek = group.weeks.some(
              (w) => visibleWeek.value === w.weekId,
            );

            return (
              <div key={`${group.year}-${group.month}`}>
                <div
                  class={[
                    "text-sm font-semibold mb-2 pl-1",
                    hasActiveWeek ? "text-primary" : "text-secondary",
                  ]}
                >
                  {group.month} {group.year}
                </div>
                <table class="table-fixed w-full">
                  <thead>
                    <tr class="text-xs">
                      <th class="font-normal">M</th>
                      <th class="font-normal">T</th>
                      <th class="font-normal">W</th>
                      <th class="font-normal">T</th>
                      <th class="font-normal">F</th>
                      <th class="font-normal text-red-500">S</th>
                      <th class="font-normal text-red-500">S</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.weeks.map((weekData) => {
                      const isActive = visibleWeek.value === weekData.weekId;
                      return renderWeekRow(weekData, isActive);
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
});
