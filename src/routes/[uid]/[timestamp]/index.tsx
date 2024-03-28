import type { RequestHandler } from "@builder.io/qwik-city";
export { useUser, default } from "../index";

export const onGet: RequestHandler = async ({ params, redirect }) => {
  const { uid, timestamp } = params;
  const currentTimestamp = Date.now() / 1000;
  if (
    Number(timestamp) < currentTimestamp - 30 * 60 ||
    Number(timestamp) > currentTimestamp + 30 * 60
  ) {
    throw redirect(302, `/${uid}/`);
  }
};
