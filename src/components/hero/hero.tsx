import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import banner from "~/images/banner.webp";

export default component$(() => {
  return (
    <>
      <div class="w-full">
        <div class="w-full">
          <div class="relative mx-auto w-full max-w-7xl">
            <Image
              class="w-full object-cover"
              src={banner}
              alt="banner"
              layout="fullWidth"
              width="1073"
              height="432"
            />
          </div>
        </div>
      </div>
    </>
  );
});
