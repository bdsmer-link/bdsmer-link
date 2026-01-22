import { component$ } from "@builder.io/qwik";
import type { UserLinkSocial } from "~/lib/database";
import FacebookIcon from "./social-icons/facebook.svg?jsx";
import InstagramIcon from "./social-icons/instagram.svg?jsx";
import TwitterXIcon from "./social-icons/twitter-x.svg?jsx";
import TiktokIcon from "./social-icons/tiktok.svg?jsx";
import YoutubeIcon from "./social-icons/youtube.svg?jsx";
import SnapchatIcon from "./social-icons/snapchat.svg?jsx";
import MastodonIcon from "./social-icons/mastodon.svg?jsx";

export type UserLinkSocialProps = {
  uid: string | null;
  item: UserLinkSocial;
};

export default component$<UserLinkSocialProps>(({ uid, item }) => {
  const target = uid || "bdsmerlink";
  return (
    <div class="flex-center py-1">
      {item.facebook && (
        <a href={item.facebook} target={target}>
          <FacebookIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.instagram && (
        <a href={item.instagram} target={target}>
          <InstagramIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.twitter && (
        <a href={item.twitter} target={target}>
          <TwitterXIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.tiktok && (
        <a href={item.tiktok} target={target}>
          <TiktokIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.snapchat && (
        <a href={item.snapchat} target={target}>
          <SnapchatIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.mastodon && (
        <a href={item.mastodon} target={target}>
          <MastodonIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.youtube && (
        <a href={item.youtube} target={target}>
          <YoutubeIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
    </div>
  );
});
