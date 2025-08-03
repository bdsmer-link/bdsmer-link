import { component$, Slot } from "@builder.io/qwik";
import ProtectionIcon from "./protection.svg?jsx";

export default component$(() => {
  return (
    <div class="mt-1">
      <ProtectionIcon class="h-6 w-auto block" />
      <span class="text-sm text-orange-400">
        <Slot />
      </span>
    </div>
  );
});
