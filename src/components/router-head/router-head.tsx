import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

// <link href="https://fonts.googleapis.com/css?family=Noto+Serif+TC:200,400,600" rel="stylesheet" type="text/css" />
export const RouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      <title>{head.title}</title>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="theme-color" content="#72675a" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="台灣的 BDSM 聚會資訊，即時同步了府中未命名、大立未命名、動物方程式、師大性善社、束室、貓樓上、䋚境、中和未命名、SB玩具間、底家、康樂玩...等，的聚會資訊"
      />
      <meta
        name="keywords"
        content="BDSM,BD,SM,DS,禁羈,繩縛,調教,臣服,支配,情慾,行事曆,BDSM 小白板,Calendar,BDSM Munch"
      />
      <link rel="icon" type="image/png" href="/favicon.png" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
