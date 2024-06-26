import { type Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";

export const AdultWarningContext = createContextId<Signal<boolean>>(
  "adult-warning-context",
);
