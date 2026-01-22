import {
  $,
  component$,
  useContext,
  useSignal,
  useOnWindow,
} from "@builder.io/qwik";
import { Theme, UserThemeContext } from "~/contexts/theme-context";
import IconMoom from "./moon.svg?jsx";
import IconSun from "./sun.svg?jsx";
import IconCircleHalf from "./circle-half.svg?jsx";

export default component$(() => {
  const userTheme = useContext(UserThemeContext);
  const prevUserTheme = useSignal<Theme | null>(null);
  const mounted = useSignal(false);

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      mounted.value = true;
    }),
  );

  return (
    <div class="flex items-center justify-center py-2">
      <div class="flex items-center mx-auto rounded-full bg-background px-3">
        <button
          type="button"
          aria-label="Light theme"
          class="cursor-pointer text-sm text-primary mr-3"
          onClick$={() => {
            userTheme.value = Theme.light;
            localStorage.setItem("theme", Theme.light);
          }}
        >
          Light
        </button>
        <button
          type="button"
          aria-label="Toggle theme"
          class="cursor-pointer p-1 w-16 flex-center rounded-full bg-border"
          onClick$={() => {
            if (
              userTheme.value === Theme.dark ||
              userTheme.value === Theme.light
            ) {
              prevUserTheme.value = userTheme.value;
              userTheme.value = null;
              localStorage.removeItem("theme");
            } else {
              const value =
                prevUserTheme.value === Theme.dark ? Theme.light : Theme.dark;
              userTheme.value = value;
              localStorage.setItem("theme", value);
            }
          }}
        >
          <div
            class={[
              "rounded-full bg-background h-6 w-6 flex-center relative transition-transform text-white",
              {
                "translate-x-4":
                  mounted.value && userTheme.value === Theme.dark,
                "-translate-x-4":
                  mounted.value && userTheme.value === Theme.light,
              },
            ]}
          >
            <div
              class={[
                "w-4 h-4 absolute stroke-primary transition-opacity",
                mounted.value && userTheme.value === Theme.dark
                  ? "opacity-100"
                  : "opacity-0",
              ]}
            >
              <IconMoom class="w-4 h-4" />
            </div>
            <div
              class={[
                "w-4 h-4 absolute fill-primary transition-opacity",
                !mounted.value || userTheme.value === null
                  ? "opacity-100"
                  : "opacity-0",
              ]}
            >
              <IconCircleHalf class="w-4 h-4" />
            </div>
            <div
              class={[
                "w-4 h-4 absolute stroke-primary transition-opacity",
                mounted.value && userTheme.value === Theme.light
                  ? "opacity-100"
                  : "opacity-0",
              ]}
            >
              <IconSun class="w-4 h-4" />
            </div>
          </div>
        </button>
        <button
          type="button"
          aria-label="Dark theme"
          class="cursor-pointer text-sm text-primary ml-3"
          onClick$={() => {
            userTheme.value = Theme.dark;
            localStorage.setItem("theme", Theme.dark);
          }}
        >
          Dark
        </button>
      </div>
    </div>
  );
});
