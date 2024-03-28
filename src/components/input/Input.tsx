import { component$ } from "@builder.io/qwik";

export default component$((props: any) => {
  return (
    <input
      {...props}
      // @ts-ignore
      class={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mr-4 leading-tight focus:outline-none focus:bg-white focus:border-main ${props.class}`}
    />
  );
});
