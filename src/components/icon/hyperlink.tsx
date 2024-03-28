import type { QwikIntrinsicElements } from "@builder.io/qwik";

export default function Age(props: QwikIntrinsicElements["svg"], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
      key={key}
    >
      <path d="M75 52H33.39c-1.1 0-2-.9-2-2s.9-2 2-2H75c1.1 0 2 .9 2 2s-.9 2-2 2z" />
      <circle
        cx="15.23"
        cy="50"
        r="2"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
      <circle
        cx="24.31"
        cy="50"
        r="2"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
      <path d="M61.72 67.62a2.008 2.008 0 0 1-1.52-3.3L72.38 50 60.2 35.67c-.72-.84-.61-2.1.23-2.82.84-.71 2.1-.61 2.82.23L76.52 48.7c.64.75.64 1.84 0 2.59L63.24 66.92c-.39.47-.96.7-1.52.7z" />
      <path d="M74.22 67.62a2.008 2.008 0 0 1-1.52-3.3L84.88 50 72.7 35.67c-.72-.84-.61-2.1.23-2.82.84-.71 2.1-.61 2.82.23L89.02 48.7c.64.75.64 1.84 0 2.59L75.74 66.92c-.39.47-.96.7-1.52.7z" />
    </svg>
  );
}
