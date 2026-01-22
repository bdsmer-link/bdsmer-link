import { component$ } from "@builder.io/qwik";
import type { UserLinkHr } from "~/lib/database";

export type UserLinkHrProps = {
  item: UserLinkHr;
};

export default component$<UserLinkHrProps>(({ item }) => {
  return (
    <div class="inline-flex items-center justify-center w-full relative">
      <hr class="w-64 h-px my-6 bg-border border-0" />
      {item.title && (
        <span class="absolute font-medium text-primary bg-background -translate-x-1/2 left-1/2 px-2">
          {item.title}
        </span>
      )}
    </div>
  );
});
