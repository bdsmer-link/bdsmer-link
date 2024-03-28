import {
  $,
  component$,
  Slot,
  useSignal,
  useContextProvider,
  useOnWindow,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Hero from "~/components/hero/hero";
import WarningSign from "~/components/warning-sign";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import {
  Theme,
  ThemeContext,
  UserThemeContext,
} from "~/contexts/theme-context";
import { Calendar, CalendarContext } from "~/contexts/calendar-context";

export default component$(() => {
  const theme = useSignal<Theme>(Theme.light);
  const userTheme = useSignal<Theme | null>(null);
  const calendar = useSignal<string>(Calendar.weekly);

  useContextProvider(ThemeContext, theme);
  useContextProvider(UserThemeContext, userTheme);
  useContextProvider(CalendarContext, calendar);

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

      darkMedia.addEventListener("change", (event: MediaQueryListEvent) => {
        theme.value = event.matches ? Theme.dark : Theme.light;
      });

      const localTheme = localStorage.getItem("theme");
      if (localTheme === Theme.dark) userTheme.value = Theme.dark;
      else if (localTheme === Theme.light) userTheme.value = Theme.light;
    }),
  );

  const tValue = userTheme.value || theme.value;

  const loc = useLocation();
  if (loc.params.uid)
    return (
      <div
        class={["flex flex-col min-h-screen", { dark: tValue === Theme.dark }]}
      >
        <Slot />
      </div>
    );

  return (
    <>
      <WarningSign />
      <div
        class={[
          "flex flex-col min-h-screen bg-background",
          { dark: tValue === Theme.dark },
        ]}
        style={{
          "--color-primary": tValue === Theme.dark ? "#efefef" : "#72675a",
          "--color-secondary": tValue === Theme.dark ? "#fb923c" : "#fb923c",
          "--color-background": tValue === Theme.dark ? "#282320" : "#faf9f8",
          "--color-border": tValue === Theme.dark ? "#47403c" : "#9ca3af",
        }}
      >
        <Hero />
        <Navbar />
        <main class="flex flex-auto flex-col text-primary container mx-auto px-3">
          <Slot />
        </main>
        <Footer />
      </div>
    </>
  );
});
