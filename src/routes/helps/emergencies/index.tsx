import { component$, $, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import RefLink from "./ref-link";
import Tips from "./tips";
import Warn from "./warn";
import Catalogue from "./catalogue";
import Hospital from "./hospital";
import Ambulance from "./ambulance";
import Protection from "./protection";
import Item from "./item";
import { documentHead } from "~/manifest";

export default component$(() => {
  const openDetails = useSignal<string>("informed-consent"); // 預設第一個展開

  const scrollToSection = $((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const toggleDetails = $((detailsId: string) => {
    openDetails.value = openDetails.value === detailsId ? "" : detailsId;
  });

  return (
    <div class="container pb-8 grid grid-cols-1 sm:grid-cols-[160px_1fr]">
      <div class="sm:sticky top-0 h-min">
        <ul>
          <li class="mt-2 pl-2 border-l border-primary">
            <details open={openDetails.value === "informed-consent"}>
              <summary
                class="cursor-pointer select-none"
                onClick$={() => toggleDetails("informed-consent")}
              >
                知情同意
              </summary>
              <ul>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("informed-consent")}
                >
                  積極同意
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("shared-responsibility")}
                >
                  共同承擔
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("privacy-confidentiality")}
                >
                  隱私保密
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("safe-words-signals")}
                >
                  安全詞、信號
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("emotional-blackmail")}
                >
                  情緒勒索
                </li>
              </ul>
            </details>
          </li>
          <li class="mt-2 pl-2 border-l border-primary">
            <details open={openDetails.value === "prevention-preparation"}>
              <summary
                class="cursor-pointer select-none"
                onClick$={() => toggleDetails("prevention-preparation")}
              >
                預防與準備
              </summary>
              <ul>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("general-knowledge")}
                >
                  通用的基本觀念
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("rope-bondage")}
                >
                  繩縛
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("spanking")}
                >
                  Spanking
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("tickling")}
                >
                  Tickling
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("restraint-wrap")}
                >
                  拘束、膠膜
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("electro-stimulation")}
                >
                  電擊
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("anal-play")}
                >
                  後庭
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("wax-play")}
                >
                  蠟燭
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("fighting-kidnapping")}
                >
                  打架、綁架
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("breath-control")}
                >
                  掐脖子、呼吸控制
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("penis-urethral")}
                >
                  陰莖、尿道
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("vaginal-play")}
                >
                  陰道
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("piercing")}
                >
                  穿刺
                </li>
              </ul>
            </details>
          </li>
          <li class="mt-2 pl-2 border-l border-primary">
            <details open={openDetails.value === "treatment-medical"}>
              <summary
                class="cursor-pointer select-none"
                onClick$={() => toggleDetails("treatment-medical")}
              >
                處置與送醫
              </summary>
              <ul>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("medical-transport")}
                >
                  送醫方式
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("cardiac-arrest")}
                >
                  心跳停止
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("coma-seizure")}
                >
                  昏迷抽搐
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("external-bleeding")}
                >
                  外部出血
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("internal-bleeding")}
                >
                  內部出血
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("rapid-breathing")}
                >
                  呼吸急促
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("fall-injury")}
                >
                  摔跌傷
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("bruises-blood-spots")}
                >
                  瘀青、血斑
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("blisters-swelling")}
                >
                  水泡、水腫
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("numbness")}
                >
                  手腳麻
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("allergic-reaction")}
                >
                  過敏
                </li>
              </ul>
            </details>
          </li>
          <li class="mt-2 pl-2 border-l border-primary">
            <details open={openDetails.value === "aftercare-section"}>
              <summary
                class="cursor-pointer select-none"
                onClick$={() => toggleDetails("aftercare-section")}
              >
                事後照護
              </summary>
              <ul>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("aftercare")}
                >
                  Aftercare
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("keep-contact")}
                >
                  保持聯繫
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("accompany-medical")}
                >
                  陪同就醫
                </li>
                <li
                  class="cursor-pointer hover:text-primary-600"
                  onClick$={() => scrollToSection("wound-dressing")}
                >
                  協助換藥
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div>
        <Catalogue id="informed-consent" upper="知情同意">
          積極同意
        </Catalogue>
        <div>
          <Item>
            知情同意是指在進行任何形式的 BDSM
            實踐之前，所有參與者都必須充分了解實踐的性質、風險和可能的後果，並在
            <b>清醒的狀態明確表達同意的肯定句</b>。
          </Item>
          <Warn>
            代理他人同意是指在某些情況下，一個人代表另一個人給予同意，這是一個高風險的確認，通常會是伴侶或其他關係親密的夥伴，在此情況下
            <b>依舊要與被代理人確認</b>
            ，是否在清醒的狀態下明確表達同意被代理，且不具有任何脅迫的要素。
          </Warn>
          <Warn>
            情緒勒索、喝酒、吸毒、實踐中增加項目或其他可能影響判斷力的情況下，給予的同意都是有瑕疵的同意，更可能是無效的同意。
          </Warn>
          <Warn>
            在相同的時間與相同的地點，任何人都可以對不同人有不同的界線，
            <b>我可以不代表你可以</b>，且不該詢問為何會有差別考量。
          </Warn>
          <Tips>
            上一次同意實踐的項目，不代表這一次也同意，除非已明確告知不必再次確認，因此
            <b>每次事前再次確認才是低風險的做法</b>。
          </Tips>
          <Tips>
            我同意你不需要經過我同意 (Consensual Non-Consent,
            CnC)，也是採知情同意的原則，包括<b>人事時地物的預先同意</b>。
          </Tips>
        </div>
        <Catalogue id="shared-responsibility" upper="知情同意">
          共同承擔
        </Catalogue>
        <div>
          <Item>
            在 BDSM
            實踐中，所有參與者都應該共同承擔風險和責任。這意味著每個人（無論 Top
            還是
            Bottom）都應該對自己的行為負責，並確保其他參與者的安全和舒適。如果在實踐中發生意外或受傷，所有參與者都應該共同處理和解決問題，而不是將責任推給某一個人或者某個角色。
          </Item>
          <Tips>
            共同承擔的不包含無上限的情感依賴，實踐結束通常有一個
            aftercare，常見的方式是擁抱，擁抱的強度可能會因實踐強度的不同有所調整，但不是無上限的。
          </Tips>
        </div>
        <Catalogue id="privacy-confidentiality" upper="知情同意">
          隱私保密
        </Catalogue>
        <div>
          <Item>
            數位媒體的保密義務，包含對數位儲存裝置的資訊安全意識。當需要分享給第三人或張貼社群網路前，都需要取得當事人同意，包含不在照片中的繩手、工具提供者或場地。
          </Item>
          <Item>
            誰與誰實踐也是個人隱私，不可以任意將實踐對象及實踐項目任意分享給第三人。某些實踐內容會安排神秘人的參與，在實踐結束後，神秘人在未經同意下也不可以主動告知自己是其中的參與者。
          </Item>
          <Tips>
            關於資訊安全的意識，可以閱讀{" "}
            <Link
              class="underline"
              href="https://digitalsecurityhandbook.ocf.tw/"
              target="csosbook"
            >
              CSOs 數位防禦手冊
            </Link>
          </Tips>
          <Tips>
            當數位媒體被不當使用，可以透過{" "}
            <Link class="underline" href="/helps">
              尋求協助
            </Link>{" "}
            的管道求助
          </Tips>
        </div>
        <Catalogue id="safe-words-signals" upper="知情同意">
          安全詞、信號
        </Catalogue>
        <div>
          <Item>
            <b>不要就是不要</b>
            ，這是明確且清楚的表達，不會有其他意思。在部分實踐項目中，由於情境的需要，會將許多常見的拒絕用詞給忽略，此時就會設定安全詞，然而安全詞不是絕對的安全保障，有些人會因為經驗空白而無法開口，也有些人會因為當下的壓迫感或強勢的權力而說不出口，此時就應該透過觀察肢體信號判斷是否要停止，又或者透過不出戲的語境詢問是否需要休息。
          </Item>
          <Tips>
            許多聚會使用通用安全詞「紅燈」或「Red」，在未明確指定時，也可以使用此安全詞。
          </Tips>
          <Tips>
            肢體信號，包括未事先告知的哭泣、過大的情緒張力或如同喝醉般的迷茫。
          </Tips>
        </div>
        <Catalogue id="emotional-blackmail" upper="知情同意">
          情緒勒索
        </Catalogue>
        <div>
          <Item>
            <b>常見情境</b>
            <div>友人邀請同行聚會，友人表示你沒跟他互動，他不開心。</div>
            <div>聚會上遇到友人，友人表示你跟其他人互動，他不開心。</div>
            <div>
              友人知道你要去聚會，所以多位友人突然都跑來，他們表示你未告知有其他友人，所以他們不開心。
            </div>
            <div>
              太久沒有主動邀請實踐，或實踐頻率與時長無法滿足對方，他不開心。
            </div>
            <div>相約見面沒有實踐或臨時急事無法見面，他不開心。</div>
          </Item>
          <Warn>
            當對方多次突然取消見面，或時間更改再更改，甚至提出借錢需求，這是危險訊號應當遠離。
          </Warn>
          <Tips>
            上述的不開心，都是他人情緒的個人課題，不應將他人的需求轉為自身的壓力，必要時應該遠離，當遇到騷擾或嚴重的情緒勒索，可以透過{" "}
            <Link class="underline" href="/helps">
              尋求協助
            </Link>{" "}
            的管道求助。
          </Tips>
        </div>
        <Catalogue id="general-knowledge" upper="預防與準備">
          通用知識
        </Catalogue>
        <Item>
          <b>事前了解</b>
          <div>
            界線、安全詞及過去病史（如凝血異常、心臟病、糖尿病、氣喘、癲癇、骨折部位...等）。
          </div>
        </Item>
        <Item>
          <b>現場準備</b>
          <div>
            實踐前後補充水分，避免空腹或過度疲勞，並準備安全剪刀與急救箱。
          </div>
          <div>任何侵入式的器具、手指，都應該配戴保險套或 NBR 手套。</div>
        </Item>
        <Item>
          <b>事後清潔</b>
          <div>
            使用後的工具都應該用中性清潔液或抗菌(無酒精)濕紙巾擦拭，侵入式的要用蒸氣消毒鍋殺菌，穿刺或染血的器具，應該使用高壓消毒鍋或雙氧水殺菌。
          </div>
        </Item>
        <Tips>
          急救箱，可以準備安全剪刀、紗布、醫用膠帶、止血帶、沖洗用生理食鹽水、葡萄糖粉、血壓機、血氧機、血糖機、耳溫槍、OK
          蹦。（不可以準備成藥或處方藥）
        </Tips>
        <Tips>
          討論事項應避免使用專有名詞，避免經驗不同有不同的認知與定義。
        </Tips>
        <Catalogue id="rope-bondage" upper="預防與準備">
          繩縛
        </Catalogue>
        <Item>
          為了避免組織、肌肉或神經的壓迫傷，4
          條繩子的張力應相等，且承受主要重力的部位寬度應該大於 3.8cm (約 6.5mm
          的繩子 6 條)，或者透過繩的鬆緊分散受力的部位。
        </Item>
        <Item>
          <span>
            為了避免靜脈血液回流阻斷導致的肢體靜脈壓持續升高，進而造成神經與肌肉損傷，繩縛時間應該低於
            2 小時，且每隔 15 至 20 分鐘應該變換受力分佈。
          </span>
          <RefLink href="https://www.sem.org.tw/EJournal/Detail/231" />
        </Item>
        <Item>
          綁完後要下水（泳池、浴缸...等），應於綑綁前先將麻繩泡濕，避免進水後繩子收縮更緊。
        </Item>
        <Item>應準備 急救剪刀 或 Leatherman 急救剪刀，必要時用來剪斷麻繩</Item>
        <Item>
          常見的繩痕會在 24 小時後近乎看不見，吊縛的繩痕可能要約 72
          小時候才近乎看不見，循環較差的人（e.g.
          糖尿病）可能會需要更長的時間，有些繩痕會有瘀青，也可能出現 G斑
          （G-force hemorrhage）。
        </Item>
        <Item>
          緩慢拆繩可避免鉀離子、肌紅蛋白等堆積瞬間回流，進而造成再灌流損傷（reperfusion
          injury）「高血鉀（Hyperkalemia）、酸中毒（Lactic
          acidosis）、肌紅蛋白尿（myoglobinuria）等」。
        </Item>
        <Warn>
          若迅速肢體麻木、速肢肢體腫脹或出現水泡，應立即鬆綁並觀察，必要時應就醫。
        </Warn>
        <Warn>
          有凝血異常、服用阿斯匹林或服用抗凝血藥物者，應避免吊縛或長時間過緊的拘束。
        </Warn>
        <Tips>
          繩縛過程遇到緊急情況，應該大聲 Call Help
          請附近人來幫忙，必要時使用急救剪刀立即鬆綁。
        </Tips>
        <Tips>
          吊縛或長時間拘束高風險，應隨時觀察肢體顏色（黑色/紫色）、感覺或運動功能。
        </Tips>
        <Tips>
          骨折部位通常要兩年以上才會近乎完全恢復，應避免作為承受重力的部位。
        </Tips>
        <Catalogue id="spanking" upper="預防與準備">
          Spanking
        </Catalogue>
        <Item>避免打擊腹部、腰部、脊椎、關節等沒有肌肉保護的部位。</Item>
        <Item>工具應平滑無毛邊，避免皮膚割傷。</Item>
        <Warn>
          有凝血異常、服用阿斯匹林或服用抗凝血藥物者，應避免瘀青或外傷出血。
        </Warn>
        <Tips>使用嬰兒油與凡士林可以避免乾裂。</Tips>
        <Catalogue id="tickling" upper="預防與準備">
          Tickling
        </Catalogue>
        <Item>長時間、強烈大笑時，應注意避免過度換氣。</Item>
        <Item>被綁住的肢體若持續扭動，可能導致拉傷或磨擦性損傷。</Item>
        <Warn>若出現呼吸困難、臉色異常、過度刺激導致不適，應立即停止。</Warn>
        <Tips>笑到說不出話是常見情況，可約定肢體信號。</Tips>
        <Catalogue id="restraint-wrap" upper="預防與準備">
          拘束、膠膜
        </Catalogue>
        <Item>避免包覆口鼻，防止窒息，必要時可以使用通氣管。</Item>
        <Item>包覆後容易造成散熱不良，應時常確認避免熱中暑。</Item>
        <Tips>應準備急救剪刀或 Leatherman 安全剪，必要時用來剪斷膠膜。</Tips>
        <Catalogue id="electro-stimulation" upper="預防與準備">
          電擊
        </Catalogue>
        <Item>禁止電擊心臟、頭部、頸部。</Item>
        <Warn>有心臟病、糖尿病、癲癇及裝有心律調節器者嚴禁使用。</Warn>
        <Catalogue id="anal-play" upper="預防與準備">
          後庭
        </Catalogue>
        <div>使用足量潤滑劑，器具需消毒。</div>
        <div>若出現劇痛、出血、異物遺留，應立即就醫。</div>
        <div>潤滑、衛生、避免異物遺留</div>
        <Catalogue id="wax-play" upper="預防與準備">
          蠟燭
        </Catalogue>
        <Item>
          低溫蠟燭只是熔點低，靠近燭芯剛滴下來的液態蠟，仍可能接近 60°C
          或更高，溫度調節應透過高度或導流器，讓液態蠟有足夠的時間降溫。
        </Item>
        <Item>避免滴在黏膜（e.g. 嘴唇、外陰、肛門等）、傷口。</Item>
        <Catalogue id="fighting-kidnapping" upper="預防與準備">
          打架、綁架
        </Catalogue>
        <Item>事前約定安全詞，應避免真實暴力。</Item>
        <div>若有外傷、骨折、意識不清，應立即送醫。</div>
        <div>注意安全詞、避免真實傷害</div>
        <Catalogue id="breath-control" upper="預防與準備">
          掐脖子、呼吸控制
        </Catalogue>
        <div>極高風險，易致昏迷、腦傷、死亡。強烈建議避免。</div>
        <div>若出現昏迷、抽搐，立即急救。</div>
        <Warn>
          <span>
            肌抽躍 (myoclonic jerk) 是一種缺氧性腦病變 (HIE)
            的反應，此種神經傷害預後是較差的，是一個高風險的行為，禁止在有癲癇病史、糖尿病及情緒障礙(神經傳導物質異常)
            的人身上實踐。
          </span>
          <RefLink href="https://www.sem.org.tw/EJournal/Detail/303" />
        </Warn>
        <Catalogue id="penis-urethral" upper="預防與準備">
          陰莖、尿道
        </Catalogue>
        <Item>
          <span>侵入式器具，應做到標準滅菌程序，並遵守無菌作業程序。</span>
          <RefLink href="https://www.cdc.gov.tw/Category/ListContent/NO6oWHDwvVfwb2sbWzvHWQ?uaid=ZohepWXCKj_wNTVtsib4QQ" />
        </Item>
        <Item>放入器具前，應使用優碘棉片對周邊進行清潔、殺菌。</Item>
        <Item>
          足量的潤滑液可以避免疼痛與皮膚或組織的損傷，必要時應在過程中持續補充潤滑液。
        </Item>
        <Tips>實踐結束後排尿有助於減少泌尿道感染的風險。</Tips>
        <Tips>尿道感染常見症狀：頻尿、排尿灼熱、疼痛、恥骨上方脹痛</Tips>
        <Hospital>
          反覆性感染（ 1 年內發生 3
          次以上）、尿道疼痛、尿液混濁、發燒、發冷、有異味、血尿，應盡快就醫
        </Hospital>
        <Catalogue id="vaginal-play" upper="預防與準備">
          陰道
        </Catalogue>
        <Item>
          任何放入陰道之物品，皆需做好衛生安全（按摩棒、G
          點棒、陰莖、假陰莖...等皆需戴上保險套，手指需戴上醫檢手套）。
        </Item>
        <Item>
          足量的潤滑液可以避免疼痛與皮膚或組織的損傷，必要時應在過程中持續補充潤滑液。
        </Item>
        <Tips>實踐結束後排尿有助於減少泌尿道感染的風險。</Tips>
        <Catalogue id="piercing" upper="預防與準備">
          穿刺
        </Catalogue>
        <Item>
          <span>
            穿刺針頭應該使用一次性針頭，如需重複使用，應做到標準滅菌程序。
          </span>
          <RefLink href="https://www.cdc.gov.tw/Category/ListContent/NO6oWHDwvVfwb2sbWzvHWQ?uaid=ZohepWXCKj_wNTVtsib4QQ" />
        </Item>
        <Item>
          穿刺前應對穿刺部位及周邊，使用酒精棉片進行至少三次的清潔、殺菌。
        </Item>
        <Item>
          針頭拔除後，建議自行使用欣黴素 (Neomycin sulfate)
          藥膏，確保傷口癒合順利。
        </Item>
        <Catalogue id="medical-transport" upper="處置與送醫">
          送醫方式
        </Catalogue>
        <div>緊急聯絡、就醫流程、注意保留證據</div>
        <Tips>
          若需送醫，建議攜帶現場照片、實踐工具、藥物清單等，並主動說明狀況，協助醫護判斷。
        </Tips>
        <Tips>如遇警察詢問，應如實說明，並可請求社工或律師協助。</Tips>
        <Catalogue id="cardiac-arrest" upper="處置與送醫">
          心跳停止
        </Catalogue>
        <div>
          立即撥打 119、高品質 CPR (用力壓、快快壓、胸回彈、莫中斷)、使用 AED
        </div>
        <Tips>
          在足夠硬的地板（不可以在床上或沙發上）按壓 CPR，不需要口對口氧氣。
        </Tips>
        <Ambulance>
          心跳停止時，黃金救援時間僅 4 分鐘，應立即撥打 119 並進行 CPR。
        </Ambulance>
        <Catalogue id="coma-seizure" upper="處置與送醫">
          昏迷抽搐
        </Catalogue>
        <Item>
          昏迷的人應評估是否有正常呼吸（胸部是否有起伏），如無呼吸反應，請立即前往
          [心跳停止] 章節，
        </Item>
        <Item>
          紀錄抽搐的時間、次數及部位形式，勿強行壓制肢體，保持呼吸道暢通，並觀察意識恢復狀況。
        </Item>
        <Tips>
          抽搐時，移除周遭危險物品避免受傷，抽搐停止後，將其置於復原臥姿（側臥）。
        </Tips>
        <Ambulance>
          持續抽搐超過 1 分鐘，或在 5 分鐘內有2次發作且意識未能恢復，應立即撥打
          119。
        </Ambulance>
        <Catalogue id="external-bleeding" upper="處置與送醫">
          外部出血
        </Catalogue>
        <div>
          <span>持續性的出血，應立即止血</span>
          <RefLink href="https://www.sem.org.tw/EJournal/Detail/231" />
        </div>
        <div>Step1. 必要時暴露身體找到出血點</div>
        <div>Step2. 使用濕紗布（或乾淨的衣物、布包、毛巾）加壓止血</div>
        <div>Step3. 使用彈性繃帶持續加壓止血</div>
        <Item>
          非持續性出血，應使用生理食鹽水（可用乾淨的清水替代）搭配醫用棉棒（可用紗布替代）清潔，以保持傷口乾淨後，使用
          OK 繃或紗布覆蓋。
        </Item>
        <Tips>大面積外傷可以使用 8吋x12吋 大紗布覆蓋。</Tips>
        <Protection>
          協助他人處理出血，應配戴乳膠手套（危急時可使用保險套替代），避免直接接觸血液。
        </Protection>
        <Warn>依《藥事法》規定，非藥事人員不可供應成藥及處方藥。</Warn>
        <Ambulance>
          如出血量大或有休克徵象（臉色蒼白、冒冷汗、意識不清），應立即撥打 119
          送醫。
        </Ambulance>
        <Catalogue id="internal-bleeding" upper="處置與送醫">
          內部出血
        </Catalogue>
        <div>指的是尿道、陰道或後庭的出血，此時流出的血液為鮮紅色。</div>
        <div>尿道出血：多喝水，立即進行多次排尿，避免憋尿。</div>
        <div>陰道出血：</div>
        <div>後庭出血：可多次灌入少量沖洗用生理食鹽水進行清潔。</div>
        <Ambulance>
          如出血量大或有休克徵象（臉色蒼白、冒冷汗、意識不清），應立即撥打 119
          送醫。
        </Ambulance>
        <Tips>
          如腹部腫脹、劇痛、皮膚出現大片瘀青，應懷疑內出血，避免移動傷者。
        </Tips>
        <Catalogue id="rapid-breathing" upper="處置與送醫">
          呼吸急促
        </Catalogue>
        <div>協助平躺、保持呼吸道暢通、送醫</div>
        <Tips>如有呼吸困難、喘鳴、嘴唇發紫，應立即送醫。</Tips>
        <Catalogue id="fall-injury" upper="處置與送醫">
          摔跌傷
        </Catalogue>
        <Item>
          患部腫脹時，可使用毛巾（或布）來包裹冰塊進行冰敷（切勿直接使用冰塊接觸患部，可能造成凍傷）。
        </Item>
        <Item>
          懷疑骨折（變形）時，應以硬物搭配三角巾（或厚布）加以固定，避免自行搬動。
        </Item>
        <Ambulance>疑似骨折，建議撥打 119 ，請救護員協助送醫</Ambulance>
        <Catalogue id="bruises-blood-spots" upper="處置與送醫">
          瘀青、血斑
        </Catalogue>
        <Item>8 小時內「冰敷」(使用毛巾或布來包裹冰塊)</Item>
        <Hospital>若瘀青血腫 3 天後未出現消退，應「就醫」檢查</Hospital>
        <div>
          1. 用藥:使用「瘀青血腫藥」，確認沒有開放性
          傷口後，即可持續使用瘀青血腫藥 2. 熱敷:48 小時後持續使用藥品並搭配「熱
          敷」
        </div>
        <Tips>瘀青面積擴大或伴有劇痛、腫脹，應就醫檢查。</Tips>
        <Warn>依《藥事法》規定，非藥事人員不可供應成藥及處方藥。</Warn>
        <Tips>勿塗抹牙膏、醬油等偏方，避免刺破水泡。</Tips>
        <Catalogue id="blisters-swelling" upper="處置與送醫">
          水泡、水腫
        </Catalogue>
        <Item>避免刺破水泡。</Item>
        <Hospital>如水泡範圍大或有感染徵象（紅腫熱痛），應就醫。</Hospital>
        <Catalogue id="numbness" upper="處置與送醫">
          手腳麻
        </Catalogue>
        <Item>
          熱敷患部，如果是麻繩、拘束後產生的肢體酸麻，建議熱敷拘束時的近心端部位
        </Item>
        <Hospital>如麻木持續不退或長時間肢體無力、腫脹，應盡速就醫。</Hospital>
        <Catalogue id="allergic-reaction" upper="處置與送醫">
          過敏
        </Catalogue>
        <Item>
          出現過敏反應時，應優先使用生理食鹽水（或清水）盡快排除過敏物質，常現的過敏物質有：乳膠、蠟燭、潤滑劑、體液、藥物、染劑。
        </Item>
        <Tips>易過敏體質，建議依處方籤隨身自備"腎上腺素注射筆"</Tips>
        <Warn>
          <span>
            如出現呼吸困難、急性低血壓或意識不清，應懷疑過敏性休克，立即送醫。
          </span>
          <RefLink href="https://www.sem.org.tw/EJournal/Detail/471" />
        </Warn>
        <Catalogue id="aftercare" upper="事後照護">
          Aftercare
        </Catalogue>
        <Item>
          性愛後憂鬱（post-coital
          tristesse）可能會持續5分鐘至1、2個小時，擁抱是最棒的
          Aftercare，也可以依關係距離，漸進式的減少親密度。如遇到長時間憂鬱，應就醫或與諮商師討論。
        </Item>
        <Hospital>
          如持續性的情緒低落，在自傷、傷人或其他危險之前，應考慮尋求好友陪伴，或前往急診室尋求協助。
        </Hospital>
        <Catalogue id="keep-contact" upper="事後照護">
          保持聯繫
        </Catalogue>
        <Item>
          一個人面對困難是孤獨的，也會有被遺棄的感覺。實踐完，可以的話彼此留下安全的聯絡方式（e.g.
          LINE），遇到任何不適都方便聯繫討論，共同面對。
        </Item>
        <Catalogue id="accompany-medical" upper="事後照護">
          陪同就醫
        </Catalogue>
        <Item>
          實踐後受傷難免會難以啟齒，陪同就醫有個互相照應，許多急診情境有人協助拿藥或其他協助，也會方便許多。
        </Item>
        <Catalogue id="wound-dressing" upper="事後照護">
          協助換藥
        </Catalogue>
        <Item>
          有些部位難以換藥，又或者傷口換藥由於疼痛很難自行處置時，可在陪伴下換藥或在好友協助下換藥。
        </Item>
      </div>
    </div>
  );
});

export const head: DocumentHead = documentHead;
