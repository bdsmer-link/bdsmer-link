import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import HelpGroup from "~/components/help-group/help-group";
import { documentHead } from "~/manifest";

export default component$(() => {
  return <HelpGroup />;
});

export const head: DocumentHead = documentHead;
