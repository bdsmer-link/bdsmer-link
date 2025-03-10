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
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-protect text-purple-600 bg-purple-100">
          <div>iWIN 網路內容防護機構</div>
          <div>https://i.win.org.tw/</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-purple-600"
        href="https://tw-ncii.win.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-protect text-purple-600 bg-purple-100">
          <div>衛生福利部 - 性影像處理中心</div>
          <div>https://tw-ncii.win.org.tw/</div>
        </div>
      </a>
      <div class="mt-8 pl-2 border-l border-primary">法律諮詢</div>
      <div class="mt-2 text-xs">
        <p>
          性侵包含<b>「情勒性交」</b>
          ，依「刑法」第221條第1項規定，強制性交指行為人利用強暴、脅迫、恐嚇、
          <b>催眠術</b>或其他違反其意願之方法下遭性侵得逞。
        </p>
        <p class="mt-1">
          性侵包含<b>「乘機性交」</b>，依「性侵害犯罪防治法」第 225
          條「不能或不知抗拒」，是指被害人因精神障礙或是狀況不佳，導致辨別能力降低，在無可抗拒的狀態下遭性侵得逞。
        </p>
      </div>
      <a
        class="block p-1 my-4 border rounded-md border-gray-700"
        href="https://lin.ee/EFmo56g"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-lawyer text-gray-700 bg-gray-200">
          <div>旭陽法律事務所</div>
          <div>https://lin.ee/EFmo56g</div>
        </div>
      </a>
      <div class="mt-2 text-xs flex">
        <div>歡迎律師、諮商師、社工，刊登諮詢資訊</div>
        <a class="ml-2 underline" href="https://x.com/yutin_18">
          https://x.com/yutin_18
        </a>
      </div>
      <div class="mt-8 pl-2 border-l border-primary">其他資源</div>
      <a
        class="block p-1 my-4 border rounded-md border-green-600"
        href="https://www.goh.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-green-600 bg-green-100">
          <div>勵馨基金會</div>
          <div>https://www.goh.org.tw/</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-green-600"
        href="https://www.ecpat.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-green-600 bg-green-100">
          <div>展翅協會</div>
          <div>https://www.ecpat.org.tw/</div>
        </div>
      </a>
      <a
        class="block p-1 my-4 border rounded-md border-green-600"
        href="https://www.twrf.org.tw/"
      >
        <div class="block relative px-2 py-2 bg-no-repeat bg-right-bottom bg-contain bg-help-support text-green-600 bg-green-100">
          <div>婦女救援基金會</div>
          <div>https://www.twrf.org.tw/</div>
        </div>
      </a>
    </div>
  );
});

export const head: DocumentHead = documentHead;
