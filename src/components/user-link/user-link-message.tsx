import { component$ } from "@builder.io/qwik";
import type { UserLinkMessage } from "~/lib/database";
import LineIcon from "./message-icons/line.svg?jsx";
import DiscordIcon from "./message-icons/discord.svg?jsx";
import SignalIcon from "./message-icons/signal.svg?jsx";
import WhatsappIcon from "./message-icons/whatsapp.svg?jsx";
import TelegramIcon from "./message-icons/telegram.svg?jsx";
import SkypeIcon from "./message-icons/skype.svg?jsx";

export type UserLinkMessageProps = {
  uid: string | null;
  item: UserLinkMessage;
};

export default component$<UserLinkMessageProps>(({ uid, item }) => {
  const target = uid || "bdsmerlink";
  return (
    <div class="flex-center py-1">
      {item.line && (
        <a href={item.line} target={target}>
          <LineIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.discord && (
        <a href={item.discord} target={target}>
          <DiscordIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.signal && (
        <a href={item.signal} target={target}>
          <SignalIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.whatsapp && (
        <a href={item.whatsapp} target={target}>
          <WhatsappIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.telegram && (
        <a href={item.telegram} target={target}>
          <TelegramIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
      {item.skype && (
        <a href={item.skype} target={target}>
          <SkypeIcon class="w-6 h-6 mx-1 transition-transform hover:scale-125" />
        </a>
      )}
    </div>
  );
});
