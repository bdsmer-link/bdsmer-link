import { component$, Slot, type PropsOf } from "@builder.io/qwik";
import Arraw from "./arraw.svg?jsx";

export default component$((props: PropsOf<"details">) => {
  return (
    <details class={`group ${props.class}`}>
      <summary class="flex cursor-pointer select-none rounded-t-lg text-main group-open:bg-main group-open:text-white">
        <div class="flex h-9 w-full items-center justify-between rounded-lg bg-hierarchy px-4 font-medium">
          <Slot name="question" />
          <Arraw class="rotate-180 transform transition-transform group-open:rotate-0" />
        </div>
      </summary>
      <div class="rounded-b-lg p-4 pt-2 text-main border">
        <Slot name="answer" />
      </div>
    </details>
  );
});
