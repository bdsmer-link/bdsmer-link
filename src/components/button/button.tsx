import { Slot, component$ } from "@builder.io/qwik";
import type { ButtonHTMLAttributes } from "@builder.io/qwik";
import Loading from "../loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default component$<ButtonProps>((props) => {
  return (
    <button
      class={`flex justify-center items-center bg-main-500 hover:bg-main-700 border-main-500 hover:border-main-700 text-sm border-4 text-white py-2 px-2 rounded cursor-pointer select-none ${props.class}`}
      type={props.type}
      disabled={props.loading}
      onClick$={props.onClick$}
    >
      {props.loading === true && <Loading />}
      <span class={{ hidden: props.loading }}>
        <Slot />
      </span>
    </button>
  );
});
