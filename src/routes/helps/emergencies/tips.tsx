import { component$, Slot } from "@builder.io/qwik";
import TipIcon from "./tips.svg?jsx";

export default component$(() => {
  return (
    <div class="mt-2 flex items-start gap-2">
      <TipIcon class="h-6 w-auto flex-shrink-0" />
      <span class="text-sm text-blue-400 leading-relaxed">
        <Slot />
      </span>
    </div>
  );
});
