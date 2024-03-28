import { component$, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const focus = useSignal("");

  const loc = useLocation();
  const nav = useNavigate();

  const value = loc.url.pathname.split("/")[2];

  return (
    <div class="w-full flex justify-center">
      <ul class="container flex flex-row justify-between text-main max-w-lg">
        <li
          class={[
            "pb-1 select-none hover:font-bold",
            {
              "font-bold": value === "",
              "cursor-pointer": value !== "",
            },
          ]}
        >
          <a
            preventdefault:click
            href="/members"
            onClick$={() => {
              focus.value = "profile";
              nav("/members");
            }}
          >
            帳戶資訊
          </a>
        </li>
        <li
          class={[
            "pb-1 select-none hover:font-bold",
            {
              "font-bold": value === "page",
              "cursor-pointer": value !== "page",
            },
          ]}
        >
          <a
            preventdefault:click
            href="/members/page"
            onClick$={() => {
              focus.value = "page";
              nav("/members/page");
            }}
          >
            專屬頁面
          </a>
        </li>
        <li
          class={[
            "pb-1 select-none hover:font-bold",
            {
              "font-bold": value === "favorites",
              "cursor-pointer": value !== "favorites",
            },
          ]}
        >
          <a
            preventdefault:click
            href="/members/favorites"
            onClick$={() => {
              focus.value = "favorites";
              nav("/members/favorites");
            }}
          >
            收藏名單
          </a>
        </li>
      </ul>
    </div>
  );
});
