import { component$ } from "@builder.io/qwik";
import type { UserLinkPicture } from "~/units/postgres/users.d";

export type UserLinkPictureProps = {
  uid: string | null;
  item: UserLinkPicture;
};

export default component$<UserLinkPictureProps>(({ uid, item }) => {
  const elem = (
    <>
      <img
        src={item.picture}
        class="w-full"
        width={item.width || 1350}
        height={item.height || 1080}
      />
      {item.title && (
        <p class="text-sm text-center text-secondary pt-1">{item.title}</p>
      )}
    </>
  );

  if (item.url) {
    return (
      <a href={item.url} target={uid || "bdsmerlink"}>
        {elem}
      </a>
    );
  }

  return elem;
});
