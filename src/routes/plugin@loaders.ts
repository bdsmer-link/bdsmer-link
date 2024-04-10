import { routeLoader$ } from "@builder.io/qwik-city";
import DBSkills from "~/units/postgres/skills";
import { type Event } from "~/units/postgres/events.d";
import { type Skill } from "~/units/postgres/skills";

export const useEvent = routeLoader$(async (req) => {
  const DBEvents = (await import("~/units/postgres/events")).default;
  const dbEvents = new DBEvents(req.env);
  const result = await dbEvents.get(req.params.id);
  return result as Event;
});

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
