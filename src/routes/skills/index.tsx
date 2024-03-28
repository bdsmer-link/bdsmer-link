import map from "lodash/map";
import sortBy from "lodash/sortBy";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import SkillDetail from "~/components/skill-detail";
import DBSkills from "~/units/postgres/skills";
import { type Skill } from "~/units/postgres/skills";
import { documentHead } from "~/manifest";

export const useSkills = routeLoader$(async (req) => {
  const dbSkills = new DBSkills(req.env);
  const skills: { [key: string]: Skill[] } = {};
  (await dbSkills.list()).forEach((skill) => {
    if (skill.category in skills === false) {
      skills[skill.category] = [];
    }
    skills[skill.category].push(skill);
  });
  return skills;
});

export default component$(() => {
  const skills = useSkills();

  return (
    <>
      {Object.keys(skills.value).map((key) => {
        return (
          <>
            <div class="mt-8 pl-2 border-l border-primary">{key}</div>
            {map(sortBy(skills.value[key], ["name"]), (value) => (
              <SkillDetail value={value} />
            ))}
          </>
        );
      })}
    </>
  );
});

export const head: DocumentHead = documentHead;
