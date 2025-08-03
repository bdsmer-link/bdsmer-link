import { component$, Slot } from "@builder.io/qwik";
import AmbulanceIcon from "./ambulance.svg?jsx";

export default component$(() => {
  return (
    <div class="mt-2 flex items-start gap-2">
      <AmbulanceIcon class="h-6 w-auto flex-shrink-0 self-center" />
      <span class="text-sm text-red-400 leading-relaxed">
        <Slot />
      </span>
    </div>
  );
});
