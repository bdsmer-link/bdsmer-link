import { component$, Slot, useContext } from "@builder.io/qwik";
import WarningSign from "~/components/warning-sign";
import ThemeButton from "~/components/theme-button";
import { AdultWarningContext } from "~/contexts/adult-warning-context";

export default component$(() => {
  const adultWarning = useContext(AdultWarningContext);

  return (
    <div class="flex flex-col items-center min-h-screen bg-background text-primary">
      {adultWarning.value === true ? <WarningSign /> : null}
      <main class="flex flex-auto flex-col w-full px-3">
        <Slot />
      </main>
      {adultWarning.value === true ? (
        <div class="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" />
      ) : null}
      <footer class="w-full text-center py-4">
        <div class="flex flex-row text-xs mx-auto w-fit">
          <p class="px-1">Privacy Policy</p>
          <p class="px-1">Terms of Use</p>
          <p class="px-1">Report Abuse</p>
        </div>
        <ThemeButton />
        <div class="text-xs">Made with ♡ by bdsmer.link</div>
      </footer>
    </div>
  );
});
