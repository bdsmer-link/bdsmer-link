import { type DocumentHead } from "@builder.io/qwik-city";

export const manifest = {
  $schema: "https://json.schemastore.org/web-manifest-combined.json",
  name: "BDSM 小白板｜Taiwan BDSM Munch",
  short_name: "BDSM 小白板",
  start_url: "https://bdsmer.link",
  display: "standalone",
  background_color: "#fff",
  description:
    "台灣的 BDSM 聚會資訊，即時同步了府中未命名、大立未命名、動物方程式、師大性善社、束室、貓樓上、䋚境、中和未命名、SB玩具間、底家、康樂玩...等，的聚會資訊",
  theme_color: "#72675a",
  icons: [
    {
      src: "/favicon.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    },
  ],
};

export const documentHead: DocumentHead = {
  title: manifest.name,
  meta: [
    {
      name: manifest.short_name,
      content: manifest.description,
    },
  ],
};
