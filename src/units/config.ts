import { type EdgeConfigClient, createClient } from "@vercel/edge-config";
import { type RequestEvent } from "@builder.io/qwik-city";

export default class EdgeConfig {
  edgeConfig: EdgeConfigClient;

  constructor(env: RequestEvent["env"]) {
    this.edgeConfig = createClient(env.get("EDGE_CONFIG"));
  }

  get(name: string) {
    return this.edgeConfig.get(name);
  }
}
