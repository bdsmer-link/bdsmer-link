import { component$ } from "@builder.io/qwik";
import RightArrow from "./right-arrow.svg?jsx";

export type SkillProvider = {
  category: string;
  name: string;
  link: string;
  items?: string[];
};

interface SkillProps {
  value: SkillProvider;
}

export default component$<SkillProps>(({ value }) => {
  return (
    <a
      class="block p-1 my-4 border rounded-md border-primary"
      href={value.link}
      target="bdskerlink-skill"
    >
      <div class="block relative px-2 py-2 bg-border">
        <div class="text-base pb-2 font-semibold">{value.name}</div>
        <div class="text-sm">{(value.items || []).join(", ")}</div>
        <RightArrow class="absolute right-2 bottom-1 w-8 h-8 fill-primary" />
      </div>
    </a>
  );
});
