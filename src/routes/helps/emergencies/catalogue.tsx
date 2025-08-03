import { component$, Slot, type PropsOf } from "@builder.io/qwik";

export interface CatalogueProps extends PropsOf<"div"> {
  upper?: string;
}

export default component$((props: CatalogueProps) => {
  return (
    <div
      {...props}
      class={[
        props.class,
        "text-lg border-b-2 border-primary-300 mb-2 pb-1 mt-2",
      ]}
    >
      <span class="font-bold">
        <Slot />
      </span>
      <span class="text-main-500">
        <span> - </span>
        <span>{props.upper}</span>
      </span>
    </div>
  );
});
