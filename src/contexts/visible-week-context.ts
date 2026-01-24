import { type Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";

export const VisibleWeekContext = createContextId<Signal<number>>(
  "visible-week-context",
);
