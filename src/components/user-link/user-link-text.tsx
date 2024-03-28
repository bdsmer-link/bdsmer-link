import { component$ } from "@builder.io/qwik";
import type { UserLinkText } from "~/units/postgres/users.d";

export type UserLinkTextProps = {
  uid: string | null;
  item: UserLinkText;
};

export default component$<UserLinkTextProps>(({ uid, item }) => {
  return (
    <a
      class={[
        "flex-center text-sm border-4 py-2 px-2 rounded cursor-pointer select-none font-bold text-primary bg-secondary border-secondary",
        "transition-transform hover:scale-105",
      ]}
      href={item.url}
      target={uid || "bdsmerlink"}
    >
      {item.title}
    </a>
  );
});
