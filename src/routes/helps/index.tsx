import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { documentHead } from "~/manifest";

export default component$(() => {
  return (
    <div class="container pb-8">
      <div class="mt-8 pl-2 border-l border-primary">緊急處置</div>
      <a
        class="block p-1 my-4 border rounded-md border-blue-400"
        href="tel:110"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-police text-blue-400 bg-blue-100">
          <div>暴力、威脅、恐嚇</div>
          <div>Call 110</div>
        </div>
      </a>
      <a class="block p-1 my-4 border rounded-md border-red-600" href="tel:119">
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-fire text-red-600 bg-red-100">
          <div>自傷、傷人</div>
          <div>Call 119</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-orange-600"
        href="tel:113"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-star text-orange-600 bg-orange-100">
          <div>騷擾、性騷擾、性侵害、情緒勒索、恐怖關係</div>
          <div>Call 113</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-orange-600"
        href="tel:1925"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-star text-orange-600 bg-orange-100">
          <div>心理壓力、情緒困擾</div>
          <div>Call 1925</div>
        </div>
      </a>
      <div class="mt-8 pl-2 border-l border-primary">私密影像外流</div>
      <a
        class="block p-1 my-4 border rounded-md border-purple-600"
        href="https://i.win.org.tw"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-purple-600 bg-purple-100">
          <div>iWIN 網路內容防護機構</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-purple-600"
        href="https://tw-ncii.win.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-purple-600 bg-purple-100">
          <div>衛生福利部 - 性影像處理中心</div>
        </div>
      </a>
      <div class="mt-8 pl-2 border-l border-primary">其他資源</div>
      <a
        class="block p-1 my-4 border rounded-md border-purple-600"
        href="https://www.ecpat.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-purple-600 bg-purple-100">
          <div>展翅協會</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-purple-600"
        href="https://www.twrf.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-purple-600 bg-purple-100">
          <div>婦女救援基金會</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-purple-600"
        href="https://www.goh.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-purple-600 bg-purple-100">
          <div>勵馨基金會</div>
        </div>
      </a>
    </div>
  );
});

export const head: DocumentHead = documentHead;
