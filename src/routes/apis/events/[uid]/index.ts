import map from "lodash/map";
import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ env, json, params, error }) => {
  const DBUsers = (await import("~/units/postgres/users")).default;
  const DBEvents = (await import("~/units/postgres/events")).default;
  const dbUsers = new DBUsers(env);

  const user = await dbUsers.loadUid(params.uid);

  if (!user) throw error(404, "User not found");

  const dbEvents = new DBEvents(env);
  const events = await dbEvents.findByUser(user.id);
  const result = map(events, (event) => ({
    provider: user.nickname,
    summary: event.summary,
    startAt: event.startAt,
    endAt: event.endAt,
  }));
  json(200, {
    status: "success",
    data: result,
  });
};
