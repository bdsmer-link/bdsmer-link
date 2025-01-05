import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Question from "~/components/question";
import { documentHead } from "~/manifest";

export default component$(() => {
  return (
    <>
      <div class="max-w-[768px] w-full px-5 mx-auto pb-10">
        <div class="text-center py-4 font-bold">聚會資訊</div>
        <Question class="mt-4">
          <spac q:slot="question">我要如何成為場地方？</spac>
          <ul q:slot="answer">
            <li>1. 場地方首要條件是已經有在經營社群空間</li>
            <li>
              2. 前往{" "}
              <a href="https://console.bdsmer.link/">
                https://console.bdsmer.link/
              </a>{" "}
              完成註冊
            </li>
            <li>3. 更新頭貼、場地名稱、Location 及 Website</li>
            <li>4. 聯繫 https://x.com/yanyanyuuu 完成審核</li>
          </ul>
        </Question>
        <Question class="mt-4">
          <spac q:slot="question">我不是場地方可以刊登聚會資訊嗎？</spac>
          <ul q:slot="answer">
            <li>可以的</li>
            <li>1. 前往 https://console.bdsmer.link/ 完成註冊</li>
            <li>2. 更新頭貼、主辦方名稱</li>
            <li>
              3. 前往 https://console.bdsmer.link/calendars/publisher/
              完成單次刊登
            </li>
          </ul>
        </Question>
        <Question class="mt-4">
          <spac q:slot="question">我聚會需要多久的審核時間？</spac>
          <span q:slot="answer">
            通常會在 6 個工作天完成審核，超過 6 個工作天可以主動聯繫審核人員。
          </span>
        </Question>
        <Question class="mt-4">
          <spac q:slot="question">我有不想公開的聚會該如何隱藏？</spac>
          <ul q:slot="answer">
            <li>以下三種方式皆可隱藏聚會</li>
            <li>1. 在 Google 行事曆中將「顯示設定」改為「私人」即不會顯示</li>
            <li>2. 系統也不會顯示沒有時間的全日活動</li>
            <li>
              3. 前往 https://console.bdsmer.link/calendars/events/
              強制隱藏該場聚會
            </li>
          </ul>
        </Question>
        <Question class="mt-4">
          <spac q:slot="question">
            我不是場地方，Google 行事曆同步後會發生什麼事？
          </spac>
          <span q:slot="answer">
            可以在個人「專屬頁面」顯示，在主站只會顯示場地方與聚會主辦方的聚會資訊。
          </span>
        </Question>
        <Question class="mt-4">
          <spac q:slot="question">
            我該如何確認 Google 行事曆已經成功同步？
          </spac>
          <span q:slot="answer">
            場地方可在 https://bdsmer.link/spaces/
            頁面查看最後成功同步的時間，如果出現警示符號，可以先自行嘗試排除問題
          </span>
        </Question>
      </div>
    </>
  );
});

export const head: DocumentHead = documentHead;
