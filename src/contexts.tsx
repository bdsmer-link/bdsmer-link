import { type Signal, createContextId } from "@builder.io/qwik";

export interface User {}

export interface UserAuthContext {
  uid: string | boolean | null;
  nickname: string | boolean | null;
}

export const FilterWeekContext =
  createContextId<Signal<boolean[]>>("filter.week");

export const FilterSkillContext =
  createContextId<Signal<boolean[]>>("filter.skill");

export const UserAuthContextId = createContextId<UserAuthContext>("user.auth");
