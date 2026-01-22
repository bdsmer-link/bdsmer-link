import { component$, Slot, useSignal, useContext } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import WarningSign from "~/components/warning-sign";
import ThemeButton from "~/components/theme-button";
import { AdultWarningContext } from "~/contexts/adult-warning-context";
import IconPreview from "./preview.svg?jsx";

export default component$(() => {
  const loc = useLocation();
  const preview = useSignal(true);
  const adultWarning = useContext(AdultWarningContext);

  return (
    <div class="flex flex-col items-center min-h-screen bg-background text-primary">
      {adultWarning.value === true ? <WarningSign /> : null}
      <main class="flex flex-auto flex-col max-w-lg w-full px-3">
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
