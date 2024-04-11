import pick from "lodash/pick";
import { component$, Slot, useSignal, useContext } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import WarningSign from "~/components/warning-sign";
import ThemeButton from "~/components/theme-button";
import { Theme, useTheme } from "~/contexts/theme-context";
import { AdultWarningContext } from "~/contexts/adult-warning-context";
import { type User, Theme as UserTheme } from "~/units/postgres/users.d";
import IconPreview from "./preview.svg?jsx";

type ThemeLoaderPayload = Pick<User, "colors" | "theme">;

export const useUserTheme = routeLoader$<ThemeLoaderPayload>(async (req) => {
  const DBUsers = (await import("~/units/postgres/users")).default;
  const userUid = req.params.uid;
  const dbUsers = new DBUsers(req.env);
  try {
    const user = await dbUsers.loadUid(userUid);
    if (!user) throw new Response("Not Found", { status: 404 });
    const result: ThemeLoaderPayload = pick(user, ["colors", "theme"]);

    return result;
  } catch (error) {
    if (error instanceof Response) throw req.send(error);
    throw req.send(new Response("Not Found", { status: 404 }));
  }
});

export default component$(() => {
  const userTheme = useUserTheme();
  const theme = useTheme();
  const loc = useLocation();
  const preview = useSignal(true);
  const adultWarning = useContext(AdultWarningContext);

  return (
    <div
      class="flex flex-col items-center min-h-screen bg-background text-primary"
      style={{
        "--color-primary":
          theme === Theme.dark
            ? userTheme.value.colors.darkPrimary
            : userTheme.value.colors.primary,
        "--color-secondary":
          theme === Theme.dark
            ? userTheme.value.colors.darkSecondary
            : userTheme.value.colors.secondary,
        "--color-border":
          theme === Theme.dark
            ? userTheme.value.colors.darkBorder
            : userTheme.value.colors.border,
        "--color-box-background":
          userTheme.value.theme !== UserTheme.default
            ? "transparent"
            : theme === Theme.dark
              ? userTheme.value.colors.darkBorder
              : userTheme.value.colors.border,
        "--color-background":
          theme === Theme.dark
            ? userTheme.value.colors.darkBackground
            : userTheme.value.colors.background,
      }}
    >
      {adultWarning.value === true ? <WarningSign /> : null}
      <main class="relative flex flex-auto flex-col max-w-lg w-full px-3">
        <Slot />
        {adultWarning.value === true ? (
          <div class="absolute inset-0 z-40 bg-transparent bg-opacity-10 backdrop-blur-sm" />
        ) : null}
      </main>
      <footer class="w-full text-center py-4">
        <div class="flex flex-row text-xs mx-auto w-fit">
          <p class="px-1">Privacy Policy</p>
          <p class="px-1">Terms of Use</p>
          <p class="px-1">Report Abuse</p>
        </div>
        <ThemeButton />
        <div class="text-xs">Made with ♡ by bdsmer.link</div>
      </footer>
      {loc.params.timestamp && preview.value === true && (
        <button
          class="fixed z-30 inset-0 w-full h-full flex-center flex-col bg-black/60"
          onClick$={() => (preview.value = false)}
        >
          <div>
            <IconPreview class="w-20 h-20 m-auto fill-white" />
            <span class="font-bold tracking-wide text-white">PREVIEW</span>
          </div>
        </button>
      )}
    </div>
  );
});
