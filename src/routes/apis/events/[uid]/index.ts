import map from "lodash/map";
import { type RequestHandler } from "@builder.io/qwik-city";
import { getDatabase, Communities, Events } from "~/lib/database";

export const onGet: RequestHandler = async ({ env, json, params, error }) => {
  const db = getDatabase(env);
  const communities = new Communities(db);
  const events = new Events(db);

  const community = await communities.loadByUid(params.uid);
  if (!community) throw error(404, "Community not found");

  const eventList = await events.findByCommunityUid(params.uid);
  const result = map(eventList, (event) => ({
    provider: community.name,
    summary: event.summary,
    startAt: event.startAt,
    endAt: event.endAt,
  }));
  json(200, {
    status: "success",
    data: result,
  });
};
