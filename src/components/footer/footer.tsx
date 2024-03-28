import { component$ } from "@builder.io/qwik";
import ThemeButton from "~/components/theme-button";
import styles from "./footer.module.scss";

export default component$(() => {
  return (
    <footer class="relative">
      <div class="w-full h-32 relative overflow-hidden">
        <div class={styles.footer__waves1} />
        <div class={styles.footer__waves2} />
        <div class={styles.footer__waves3} />
        <div class="absolute opacity-50 inset-0 bg-black z-20 w-full h-full" />
      </div>
      <div class="absolute inset-x-0 top-6 z-30">
        <ThemeButton />
        <a
          href="https://bdsmer.link/"
          class="text-white text-center text-sm m-auto"
        >
          <div>Made with ♡ by bdsmer.link</div>
        </a>
      </div>
    </footer>
  );
});
