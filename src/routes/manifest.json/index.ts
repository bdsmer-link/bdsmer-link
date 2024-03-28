import type { RequestHandler } from "@builder.io/qwik-city";
import { manifest } from "~/manifest";

export const onGet: RequestHandler = async ({ json }) => {
  json(200, manifest);
};
