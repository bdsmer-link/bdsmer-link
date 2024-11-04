import { component$, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import styles from "./navbar.module.scss";

export default component$(() => {
  const focus = useSignal("");

  const loc = useLocation();
  const nav = useNavigate();

  const value = loc.url.pathname.split("/")[1];

  return (
    <div class="w-full bg-main">
      <ul class="container flex flex-row justify-between text-white mx-auto">
        <li class="basis-1/4">
          <button
            class="pb-8 pt-10 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "events";
              nav("/");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit border-orange-400 select-none hover:text-main-200 after:bg-orange-400",
                {
                  "border-b": ["", "northern", "midlands", "southern"].includes(
                    value,
                  ),
                  [styles.link]: loc.isNavigating && focus.value === "events",
                },
              ]}
            >
              聚會資訊
            </div>
          </button>
        </li>
        <li class="basis-1/4">
          <button
            class="pb-8 pt-10 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "spaces";
              nav("/spaces/");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit border-orange-400 select-none hover:text-main-200 after:bg-orange-400",
                {
                  "border-b": value === "spaces",
                  [styles.link]: loc.isNavigating && focus.value === "spaces",
                },
              ]}
            >
              友善場地
            </div>
          </button>
        </li>
        <li class="basis-1/4">
          <button
            class="pb-8 pt-10 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "helps";
              nav("/helps/");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit border-orange-400 select-none hover:text-main-200 after:bg-orange-400",
                {
                  "border-b": value === "helps",
                  [styles.link]: loc.isNavigating && focus.value === "helps",
                },
              ]}
            >
              尋求協助
            </div>
          </button>
        </li>
        <li class="basis-1/4">
          <button
            class="pb-8 pt-10 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "members";
              nav("https://console.bdsmer.link");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit border-orange-400 select-none hover:text-main-200 after:bg-orange-400",
                { [styles.link]: focus.value === "members" },
              ]}
            >
              禁羈人物
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
});
