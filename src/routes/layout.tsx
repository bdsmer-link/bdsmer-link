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
import { AdultWarningContext } from "~/contexts/adult-warning-context";

export default component$(() => {
  const loc = useLocation();
  const theme = useSignal<Theme>(Theme.light);
  const userTheme = useSignal<Theme | null>(null);
  const calendar = useSignal<string>(Calendar.weekly);
  const adultWarning = useSignal<boolean>(true);

  useContextProvider(ThemeContext, theme);
  useContextProvider(UserThemeContext, userTheme);
  useContextProvider(CalendarContext, calendar);
  useContextProvider(AdultWarningContext, adultWarning);

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

      theme.value = darkMedia.matches ? Theme.dark : Theme.light;
      darkMedia.addEventListener("change", (event: MediaQueryListEvent) => {
        theme.value = event.matches ? Theme.dark : Theme.light;
      });

      const localTheme = localStorage.getItem("theme");
      if (localTheme === Theme.dark) userTheme.value = Theme.dark;
      else if (localTheme === Theme.light) userTheme.value = Theme.light;

      if (loc.url.searchParams.get("adult")) {
        adultWarning.value = false;
        loc.url.searchParams.delete("adult");
        history.replaceState(null, "", loc.url.toString());
      }
    }),
  );

  const tValue = userTheme.value || theme.value;

  if (loc.params.uid)
    return (
      <div
        class={[
          "flex flex-col min-h-screen bg-background",
          { dark: tValue === Theme.dark },
        ]}
        style={{
          "--color-primary": tValue === Theme.dark ? "#efefef" : "#72675a",
          "--color-secondary": tValue === Theme.dark ? "#fb923c" : "#fb923c",
          "--color-border": tValue === Theme.dark ? "#47403c" : "#e2e0de",
          "--color-box-background":
            tValue === Theme.dark ? "#47403c" : "#e2e0de",
          "--color-background": tValue === Theme.dark ? "#282320" : "#faf9f8",
        }}
      >
        <Slot />
      </div>
    );

  return (
    <div
      class={[
        "flex flex-col min-h-screen bg-background",
        { dark: tValue === Theme.dark },
      ]}
      style={{
        "--color-primary": tValue === Theme.dark ? "#efefef" : "#72675a",
        "--color-secondary": tValue === Theme.dark ? "#fb923c" : "#fb923c",
        "--color-border": tValue === Theme.dark ? "#47403c" : "#e2e0de",
        "--color-box-background": tValue === Theme.dark ? "#47403c" : "#e2e0de",
        "--color-background": tValue === Theme.dark ? "#282320" : "#faf9f8",
      }}
    >
      {adultWarning.value === true ? <WarningSign /> : null}
      <Hero />
      <Navbar />
      <main class="flex-1">
        <div class="flex flex-auto flex-col text-primary container mx-auto px-3">
          <Slot />
        </div>
      </main>
      {adultWarning.value === true ? (
        <div class="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" />
      ) : null}
      <Footer />
    </div>
  );
});
