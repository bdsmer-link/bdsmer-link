import { type Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";

export enum Calendar {
  monthly = "monthly",
  weekly = "weekly",
}

export const CalendarContext =
  createContextId<Signal<Calendar>>("calendar-context");
