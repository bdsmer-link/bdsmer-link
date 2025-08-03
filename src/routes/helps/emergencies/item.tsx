import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="relative pl-4 before:content-['-'] before:absolute before:left-0">
      <Slot />
    </div>
  );
});
