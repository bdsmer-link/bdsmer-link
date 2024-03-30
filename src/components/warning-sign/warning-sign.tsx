import { component$, useContext } from "@builder.io/qwik";
import { AdultWarningContext } from "~/contexts/adult-warning-context";
import IconAdultsOnly from "./adults-only.svg?jsx";

export default component$(() => {
  const adultWarning = useContext(AdultWarningContext);

  return (
    <div class="w-full">
      <div class="relative inset-0 z-50 overflow-hidden bg-background text-primary h-screen">
        <div
          class={[
            "text-justify text-last-left tracking-widest text-3xl p-16 pt-32 max-w-xl mx-auto leading-loose",
            "max-sm:pt-16 max-sm:leading-normal",
          ]}
        >
          以下涉及敏感內容，可能含有裸露、煽情或成人藝術 ，未成年請勿瀏覽
        </div>
        <div class="fixed bottom-12 w-full left-0">
          <div
            class={
              "flex w-full left-0 items-center max-w-6xl mx-auto flex-col text-lg"
            }
          >
            <IconAdultsOnly class={"w-32 h-32 opacity-80"} />
            <button
              aria-label="I am 18+"
              class="border border-border bg-background rounded-md w-56 px-8 py-4 mt-4"
              onClick$={() => (adultWarning.value = false)}
            >
              我已成年（進入）
            </button>
            <a
              class="block text-center bg-background rounded-md mt-8 px-8 py-4 w-56"
              href="https://google.com"
            >
              離開
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
