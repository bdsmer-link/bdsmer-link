import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ env, json }) => {
  const DBEvents = (await import("~/units/postgres/events")).default;
  const dbEvents = new DBEvents(env);
  const result = await dbEvents.list();
  json(200, {
    status: "success",
    data: result,
  });
};
