import { $, component$, useOnWindow, useStore } from "@builder.io/qwik";
import Age from "~/components/icon/age";
import styles from "./warning-sign.module.scss";

function useVisible() {
  const visible = useStore<{ value: number | undefined }>({ value: undefined });
  useOnWindow(
    "scroll",
    $(() => {
      if (visible.value !== undefined && visible.value <= 0) return;

      const height = window.innerHeight - window.scrollY * 2;
      if (window.scrollY > window.innerHeight / 3) {
        visible.value = 0;
        return;
      }
      if (visible.value === undefined || visible.value > height) {
        visible.value = height;
      }
    }),
  );
  return visible;
}

export default component$(() => {
  const visible = useVisible();

  return (
    <>
      <div class="w-full">
        <div
          class="relative inset-0 z-50 bg-main overflow-hidden flex justify-center"
          style={{
            height: visible.value === undefined ? "100vh" : visible.value,
            "min-height": visible.value === undefined ? "100vh" : "auto",
          }}
        >
          <div class="text-justify text-last-left tracking-widest text-white text-3xl p-16 pt-32 max-w-xl leading-loose">
            以下涉及敏感內容，可能含有煽情或成人藝術 ，未成年請勿瀏覽
          </div>
          <div class="absolute w-0 h-0 left-1/2 bottom-1/4">
            <div class={["absolute w-8 h-2 -left-5", styles.chevron]} />
            <div class={["absolute w-8 h-2 -left-5", styles.chevron]} />
            <div class={["absolute w-8 h-2 -left-5", styles.chevron]} />
            <div class="absolute fill-white w-16 h-16 -left-8 -top-14">
              <Age />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
