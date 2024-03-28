import { component$, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import styles from "./region-navbar.module.scss";

export default component$(() => {
  const focus = useSignal("");

  const loc = useLocation();
  const nav = useNavigate();

  const value = loc.url.pathname.split("/")[1];

  return (
    <div class="w-full">
      <ul class="flex flex-row justify-between max-w-sm m-auto">
        <li class="basis-1/4">
          <button
            class="pb-1 pt-3 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "all";
              nav("/");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit select-none hover:text-main-200 after:bg-orange-400",
                {
                  "font-bold": value === "",
                  [styles.link]: loc.isNavigating && focus.value === "all",
                },
              ]}
            >
              全部
            </div>
          </button>
        </li>
        <li class="basis-1/4">
          <button
            class="pb-1 pt-3 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "northern";
              nav("/northern/");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit border-orange-400 select-none hover:text-main-200 after:bg-orange-400",
                {
                  "font-bold": value === "northern",
                  [styles.link]: loc.isNavigating && focus.value === "northern",
                },
              ]}
            >
              北部
            </div>
          </button>
        </li>
        <li class="basis-1/4">
          <button
            class="pb-1 pt-3 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "midlands";
              nav("/midlands/");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit border-orange-400 select-none hover:text-main-200 after:bg-orange-400",
                {
                  "font-bold": value === "midlands",
                  [styles.link]: loc.isNavigating && focus.value === "midlands",
                },
              ]}
            >
              中部
            </div>
          </button>
        </li>
        <li class="basis-1/4">
          <button
            class="pb-1 pt-3 w-full"
            preventdefault:click
            onClick$={() => {
              focus.value = "southern";
              nav("/southern/");
            }}
          >
            <div
              class={[
                "pb-1 px-1 mx-auto max-w-fit border-orange-400 select-none hover:text-main-200 after:bg-orange-400",
                {
                  "font-bold": value === "southern",
                  [styles.link]: loc.isNavigating && focus.value === "southern",
                },
              ]}
            >
              南部
            </div>
          </button>
        </li>
      </ul>
      <hr class="w-64 h-px mt-2 mb-1 m-auto bg-gray-200 border-0" />
    </div>
  );
});
