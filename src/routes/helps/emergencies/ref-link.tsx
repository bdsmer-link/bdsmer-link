import { component$, type PropsOf } from "@builder.io/qwik";

export default component$((props: PropsOf<"a">) => {
  return (
    <a {...props} class={[props.class, "underline pl-2"]} target="emergencies">
      [參考資料]
    </a>
  );
});
