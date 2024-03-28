import map from "lodash/map";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { UserLinkAlbum } from "~/units/postgres/users.d";
import ImagePlaceholder from "./1350x1080.svg?jsx";
import IconChevronLeft from "./chevron-left.svg?jsx";
import IconChevronRight from "./chevron-right.svg?jsx";

enum ObjectFit {
  cover = "cover",
  contain = "contain",
}

export type UserLinkAlbumProps = {
  item: UserLinkAlbum;
};

export default component$<UserLinkAlbumProps>(({ item }) => {
  const active = useSignal(0);
  const objectfit = useSignal(ObjectFit.cover);
  const albumRef = useSignal<HTMLDivElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    if (albumRef.value) {
      let lastX = 0;

      const touchStart = (e: TouchEvent) => {
        e.preventDefault();
        const [touch] = e.changedTouches;
        lastX = touch.clientX;
      };
      const touchEnd = (e: TouchEvent) => {
        e.preventDefault();
        if (lastX <= 0) return;

        const [touch] = e.changedTouches;
        const changeX = touch.clientX - lastX;
        if (changeX > 10) {
          // to right
          if (active.value <= 0) return;
          active.value = active.value - 1;
        } else if (changeX < -10) {
          // to left
          if (active.value + 1 >= item.pictures.length) return;
          active.value = active.value + 1;
        } else {
          objectfit.value =
            objectfit.value === ObjectFit.cover
              ? ObjectFit.contain
              : ObjectFit.cover;
        }
        lastX = 0;
      };

      const mouseDown = (e: MouseEvent) => {
        e.preventDefault();
        lastX = e.clientX;
      };
      const mouseUp = (e: MouseEvent) => {
        e.preventDefault();
        if (lastX <= 0) return;

        const changeX = e.clientX - lastX;
        if (changeX > 10) {
          // to right
          if (active.value <= 0) return;
          active.value = active.value - 1;
        } else if (changeX < -10) {
          // to left
          if (active.value + 1 >= item.pictures.length) return;
          active.value = active.value + 1;
        } else {
          objectfit.value =
            objectfit.value === ObjectFit.cover
              ? ObjectFit.contain
              : ObjectFit.cover;
        }
        lastX = 0;
      };

      albumRef.value.addEventListener("touchstart", touchStart);
      albumRef.value.addEventListener("touchend", touchEnd);
      albumRef.value.addEventListener("mousedown", mouseDown);
      albumRef.value.addEventListener("mouseup", mouseUp);
      albumRef.value.addEventListener("mouseleave", mouseUp);
      cleanup(() => {
        albumRef.value?.removeEventListener("touchstart", touchStart);
        albumRef.value?.removeEventListener("touchend", touchEnd);
        albumRef.value?.removeEventListener("mousedown", mouseDown);
        albumRef.value?.removeEventListener("mouseup", mouseUp);
      });
    }
  });

  return (
    <>
      <div class="w-full relative overflow-hidden select-none">
        <ImagePlaceholder class="w-full" />
        {item.pictures.map(({ picture, width, height }, idx) => {
          return (
            <div
              key={`${idx}-${picture}`}
              class={[
                "w-full h-full transition-transform absolute top-0 left-0",
                {
                  "translate-x-full": active.value < idx,
                  "-translate-x-full": active.value > idx,
                },
              ]}
            >
              {picture && (
                <img
                  src={picture}
                  alt="picture"
                  class={[
                    "w-full h-full",
                    {
                      "object-cover": objectfit.value === ObjectFit.cover,
                      "object-contain": objectfit.value === ObjectFit.contain,
                    },
                  ]}
                  width={width}
                  height={height}
                />
              )}
            </div>
          );
        })}
        <div class="w-full h-full inset-0 absolute" ref={albumRef} />
      </div>
      {item.title && (
        <p class="text-sm text-center text-secondary pt-1">{item.title}</p>
      )}
      <div class="flex justify-center">
        <button
          type="button"
          disabled={active.value <= 0}
          class={[
            "text-border p-2 ml-1 rounded-md select-none",
            {
              "opacity-50 cursor-not-allowed": active.value <= 0,
              "transition-transform hover:scale-125": active.value > 0,
            },
          ]}
          onClick$={() => {
            if (active.value <= 0) return;
            active.value = active.value - 1;
          }}
        >
          <IconChevronLeft />
        </button>
        <div class="flex items-center">
          {map(item.pictures, (_, idx) => (
            <div
              key={idx}
              class={[
                "rounded-full h-1 w-1 mx-1 bg-border transition-all",
                { "!w-4": active.value === idx },
              ]}
            />
          ))}
        </div>
        <button
          type="button"
          disabled={active.value + 1 >= item.pictures.length}
          class={[
            "text-border p-2 ml-1 rounded-md select-none",
            {
              "opacity-50 cursor-not-allowed":
                active.value + 1 >= item.pictures.length,
              "transition-transform hover:scale-125":
                active.value + 1 < item.pictures.length,
            },
          ]}
          onClick$={() => {
            if (active.value + 1 >= item.pictures.length) return;
            active.value = active.value + 1;
          }}
        >
          <IconChevronRight />
        </button>
      </div>
    </>
  );
});
