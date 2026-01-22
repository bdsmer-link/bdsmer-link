import { type RequestHandler } from "@builder.io/qwik-city";
import { getDatabase, Events } from "~/lib/database";

export const onGet: RequestHandler = async ({ env, json }) => {
  const db = getDatabase(env);
  const events = new Events(db);
  const result = await events.list();
  json(200, {
    status: "success",
    data: result,
  });
};
