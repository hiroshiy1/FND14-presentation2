'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//グローバル変数
let changeCnt = 0;
let tachFlag = 0;
const todofuken = {};

//47都道府県の観光ガイド情報
const introObj = {
    hokkaido: "北海道（ほっかいどう）は、日本の北海道地方に位置する道。道庁所在地は札幌市。47都道府県中唯一の「道」である。ブランド総合研究所による「都道府県の魅力度ランキング」で2021年現在、13年連続で1位に選ばれ、観光意欲度、産品購入意欲度でも1位、居住意欲度でも3位となっており、各意欲の面で高い評価を得ている。",
    aomori: "青森県（あおもりけん）は、日本の東北地方に位置する県。県庁所在地は青森市。県の人口は全国31位、面積は全国8位。令制国の陸奥国（むつのくに、りくおうのくに）北部にあたる。",
    iwate: "岩手県（いわてけん）は、日本の東北地方に位置する県。県庁所在地は盛岡市。",
    akita: "秋田県（あきたけん）は、日本の東北地方に位置する県。県庁所在地は秋田市。",
    miyagi: "宮城県（みやぎけん）は、日本の東北地方に位置する県。県庁所在地は仙台市。",
    yamagata: "山形県（やまがたけん）は、日本の東北地方に位置する県。県庁所在地は山形市。県名の「山形」は、『和名類聚抄』に今の山形市の南側を「山方やまがた郷」と言ったことに由来すると言われている。県域の西側は日本海に面する。",
    fukushima: "福島県（ふくしまけん）は、日本の東北地方に位置する県。県庁所在地は福島市。",
    ibaraki: "茨城県（いばらきけん）は、日本の関東地方に位置する県。県庁所在地は水戸市。首都圏を構成し、都道府県人口は全国11位、面積は全国24位である。",
    tochigi: "栃木県（とちぎけん）は、日本の関東地方に位置する県。県庁所在地は宇都宮市。県北部に日光国立公園があり、観光地・保養地の日光や那須が知られる。",
    gunma: "群馬県（ぐんまけん）は、日本の関東地方に位置する県。県庁所在地は前橋市。米麦栽培・養蚕・繊維工業などの伝統産業に加え、畜産・野菜栽培・機械工業が盛んで、県北西部は温泉・保養地である。利根川上流ダム群の豊かな水量は県内はもとより、東京都を始めとする関東の電力・上水道の供給源となっている。県南東部は都市化が進み、首都圏整備法の都市開発区域に指定され、工業地域を形成している。",
    saitama: "埼玉県（さいたまけん）は、日本の関東地方に位置する県。県庁所在地はさいたま市。",
    chiba: "千葉県（ちばけん）は、日本の関東地方に位置する県。県庁所在地は千葉市。首都圏を構成し、都道府県人口・人口密度は第6位、県の財政力指数は全国第5位、面積は第28位の規模である。",
    tokyo: "東京都（とうきょうと）は、日本の首都。関東地方に位置する都。都庁所在地は新宿区。特別区（特別区23区）、多摩地域（26市と西多摩郡3町1村）および島嶼部（2町7村）からなる。",
    kanagawa: "神奈川県（かながわけん）は、日本の関東地方に位置する県。県庁所在地は横浜市。",
    nigata: "新潟県（にいがたけん）は、日本の県。県庁所在地は新潟市。",
    toyama: "富山県（とやまけん）は、日本の中部地方に位置する県。県庁所在地は富山市。中部地方の日本海側、新潟県を含めた場合の北陸地方のほぼ中央にある。",
    ishikawa: "石川県（いしかわけん）は、日本の中部地方に位置する県。県庁所在地は金沢市。本州の中央部、日本海側の北陸地方に位置する。県域は令制国の加賀国と能登国に当たる。",
    fukui: "福井県（ふくいけん）は、日本の中部地方に位置する県。県庁所在地は福井市。北陸地方で最も人口が少ない県である。",
    nagano: "長野県（ながのけん）は、日本の中部地方に位置する県。県庁所在地は長野市。令制国名の信濃国にちなみ、信州とも呼ばれている。海に面していない内陸県であり、日本アルプスを始め大規模な山岳地があるため可住地面積率は低い。キャッチフレーズはしあわせ信州。",
    gifu: "岐阜県（ぎふけん）は、日本の中部地方に位置する県。県庁所在地は岐阜市。",
    yamanashi: "山梨県（やまなしけん）は、日本の中部地方に位置する県。県庁所在地は甲府市。首都圏整備法における首都圏の一角を成す。令制国の甲斐国に相当する。",
    shizuoka: "静岡県（しずおかけん）は、日本の中部地方に位置する県。県庁所在地は静岡市。",
    aichi: "愛知県（あいちけん）は、日本の中部地方に位置する県。県庁所在地は名古屋市。",
    shiga: "滋賀県（しがけん）は、日本の近畿地方に位置する県。県庁所在地は大津市。",
    kyoto: "京都（きょうと、みやこ、きょうのみやこ）は、日本の地名、都市。",
    hyougo: "兵庫県（ひょうごけん）は、日本の近畿地方の西端に位置する県。県庁所在地は神戸市。",
    mie: "三重県（みえけん）は、日本の近畿地方に位置する県。県庁所在地は津市。江戸時代から、お伊勢参り（お蔭参り）の名で知られる伊勢神宮を擁する地域として発展した。令制国では、伊勢国・志摩国・伊賀国の全域と、紀伊国（当初は熊野国）の一部、計4国より構成される。包括する旧律令国の数は、7国を包括する兵庫県に次ぐ。北勢、伊賀、中勢、南勢（伊勢志摩）、東紀州の5地域に区分される。",
    nara: "奈良県（ならけん）は、日本の近畿地方に位置する県。県庁所在地は奈良市。紀伊半島内陸部にあり、令制国の大和国の領域を占め、北西部の盆地部を除けば険しい山々がそびえており、人口の偏りが大きい。都道府県面積は全国で8番目に狭く、内陸8県では最も狭い。",
    osaka: "大阪府（おおさかふ）は、日本の近畿地方に位置する府。府庁所在地は大阪市。",
    wakayama: "和歌山県（わかやまけん）は、日本の近畿地方に位置する県。県庁所在地は和歌山市。日本最大の半島である紀伊半島の南西側に位置し、県南部には大規模な山地を有する。",
    tottori: "鳥取県（とっとりけん）は、日本の中国地方にある県である。県庁所在地は鳥取市。日本海側にあり、山陰地方の東側を占める。面積は約3,507平方キロメートルと全国で7番目に小さく、人口は約55万人で最も少ない。基礎自治体は4市14町1村で、市の数も最も少ない。",
    shimane: "島根県（しまねけん）は、日本の中国地方（山陰地方）にある県。県庁所在地は松江市。本州西部に位置し、山陰地方の西側を占める。離島の隠岐諸島や竹島なども含む。旧令制国における出雲国・石見国・隠岐国の3国に相当する。現在でも県内の地域分類として出雲地方・石見地方・隠岐地方の3区分が用いられることがある。",
    yamaguchi: "山口県（やまぐちけん）は、日本の中国地方に位置する県。県庁所在地は山口市。",
    okayama: "岡山県（おかやまけん）は、日本の中国地方に位置する県。県庁所在地は岡山市。",
    hiroshima: "広島県（ひろしまけん）は、日本の中国地方に位置する県。県庁所在地は広島市。",
    kagawa: "香川県（かがわけん）は、日本の四国地方に位置する県。県庁所在地は高松市。令制国の讃岐国に当たる。県名は旧讃岐国のほぼ中央に存在し、かつて高松が属していた古代以来の郡である香川郡から採られた。面積は47都道府県で一番小さく、1945年～1972年にかけてアメリカの統治下であった沖縄県を除くと最も遅く独立した県である。都市の利便性と豊かな自然が調和した生活環境を持つ。",
    ehime: "愛媛県（えひめけん）は、日本の四国地方に位置する県。四国地方では最も人口が多い県。県庁所在地は中核市指定の松山市。都市規模は、計量特定市指定の今治市・新居浜市が続く。令制国の伊予国に当たる。",
    tokushima: "徳島県（とくしまけん）は、日本の四国地方に位置する県。県庁所在地は徳島市。",
    kouchi: "高知県（こうちけん）は、日本の四国地方に位置する県。県庁所在地は高知市。",
    fukuoka: "福岡県（ふくおかけん）は、日本の九州地方に位置する県。県庁所在地は福岡市。九州地方北部に位置し、九州地方の県では最も人口が多い。県庁所在地の福岡市は、九州地方最大の人口を擁する都市であり、西日本においても大阪市に次ぐ人口を擁する都市である。福岡市と北九州市の2つの政令指定都市を抱え、いわゆる三大都市圏以外では人口密度が1,000人/km2を超える唯一の県である。全国では人口は北海道に次ぐ9位、面積は千葉県に次ぐ29位。",
    saga: "佐賀県（さがけん）は、日本の九州地方に位置する県。県庁所在地は佐賀市。お茶や唐津・伊万里・有田などの古くからの陶磁器の産地として有名で、玄界灘と有明海の2つの海に接する。令制国の肥前国東部に相当する。明治の府県制成立の際、同国は佐賀県と長崎県の2県として分立した。九州地方の中では最も面積、経済規模が小さい県であり、人口は隣接する福岡県の2割以下であり、福岡市の半分程度に過ぎない。一方、人口密度は全国で16番目に高く、広島県の人口密度を上回っている。",
    nagasaki: "長崎県（ながさきけん）は、日本の九州地方に位置する県。県庁所在地は長崎市。五島列島、壱岐島、対馬など数多くの島嶼を含み、47都道府県中最も島が多いことで知られる。また、多島であるうえにリアス式海岸を多く擁することから海岸線の長さは47都道府県中第2位となっている。",
    oita: "大分県（おおいたけん）は、日本の九州地方に位置する県。県庁所在地は大分市。全国的に知名度が高い別府温泉や由布院温泉をはじめとする多くの温泉を有し、源泉数（4,445か所）、湧出量（279,253リットル/分）ともに日本一であり、「日本一のおんせん県おおいた」をキャッチフレーズに温泉をアピールしている。",
    kumamoto: "熊本県（くまもとけん）は、日本の九州地方に位置する県。県庁所在地は熊本市。令制国の肥後国に当たる。有明海、不知火海、東シナ海に面している。",
    miyazaki: "宮崎県（みやざきけん）は、日本の九州地方に位置する県。県庁所在地は宮崎市。",
    kagoshima: "鹿児島県（かごしまけん）は、日本の九州地方に位置する県。県庁所在地は鹿児島市。九州島の南側には離島（薩南諸島）が点在する。九州島の部分は県本土と表現され、2つの半島（薩摩半島・大隅半島）を有する。霧島山、桜島、種子島宇宙センター、世界自然遺産の屋久島、奄美大島や徳之島などがあり、自然・文化・観光・産業などの面において、豊富な資源を有している。",
    okinawa: "沖縄県（おきなわけん）は、日本の九州地方に位置する県。県庁所在地は那覇市。",
}

//47都道府県の画像データ
const imgObj = {
    hokkaido: ["img/h1.png"],
    aomori: ["img/a1.png"],
    iwate: ["img/i1.png"],
    akita: ["img/ak1.png"],
    miyagi: ["img/m1.png"],
    yamagata: ["img/y1.png"],
    fukushima: ["img/f1.png"],
    ibaraki: ["img/ib1.png"],
    tochigi: ["img/t1.png"],
    gunma: ["img/g1.png"],
    saitama: ["img/s1.png"],
    chiba: ["img/c1.png"],
    tokyo: ["img/to1.png"],
    kanagawa: ["img/k1.png"],
    nigata: ["img/n1.png"],
    toyama: ["img/toy1.png"],
    ishikawa: ["img/is1.png"],
    fukui: ["img/fu1.png"],
    nagano: ["img/na1.png"],
    gifu: ["img/gi1.png"],
    yamanashi: ["img/ya1.png"],
    shizuoka: ["img/sh1.png"],
    aichi: ["img/ai1.png"],
    shiga: ["img/si1.png"],
    kyoto: ["img/ky1.png"],
    hyougo: ["img/hy1.png"],
    mie: ["img/mi1.png"],
    nara: ["img/nar1.png"],
    osaka: ["img/o1.png"],
    wakayama: ["img/w1.png"],
    tottori: ["img/tot1.png"],
    shimane: ["img/shi1.png"],
    yamaguchi: ["img/yam1.png"],
    okayama: ["img/ok1.png"],
    hiroshima: ["img/hi1.png"],
    kagawa: ["img/ka1.png"],
    ehime: ["img/e1.png"],
    tokushima: ["img/tok1.png"],
    kouchi: ["img/ko1.png"],
    fukuoka: ["img/fuk1.png"],
    saga: ["img/sa1.png"],
    nagasaki: ["img/nag1.png"],
    oita: ["img/oi1.png"],
    kumamoto: ["img/ku1.png"],
    miyazaki: ["img/miy1.png"],
    kagoshima: ["img/kago1.png"],
    okinawa: ["img/oki1.png"],
};

//スリープ関数
function sleep(waitMsec) {
    let startMsec = new Date();

    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}

//マウスカーソルを都道府県のBox上に移動した場合に情報をポップアップする
function infoPickup(event) {

    //ポップアップ用のBox情報の要素、マウスカーソルを当てた際のイベント情報の取得とポップアップに挿入する要素作成を定義
    const intro = document.getElementById("intro");
    const point = event.srcElement;

    //画像処理一式
    const pushPop = document.createElement("figure")
    pushPop.classList.add("image")
    const pushImg = document.createElement("img");
    pushImg.setAttribute("src", imgObj[point["id"]]);
    pushPop.appendChild(pushImg);

    //文字処理一式
    const pushInfo = document.createElement("div");
    pushInfo.classList.add("right");
    const pushInfoTitle = document.createElement("span");
    pushInfoTitle.classList.add("title");
    const pushInfoAdv = document.createElement("p");
    pushInfoAdv.classList.add("text");
    pushInfoTitle.textContent = point.innerText;
    pushInfoAdv.textContent = introObj[point["id"]];
    pushInfo.appendChild(pushInfoTitle);
    pushInfo.appendChild(pushInfoAdv);
    const pushWikiInfo = document.createElement("p");
    pushWikiInfo.classList.add("wiki");
    pushWikiInfo.textContent = "参考元：Wikipedia";
    pushInfo.appendChild(pushWikiInfo);

    //ポップアップを可視化
    intro.style.visibility = (intro.style.visibility == "visible") ? "hidden" : "visible";

    //ポップアップに画像を挿入
    intro.appendChild(pushPop);

    //ポップアップに情報を挿入
    intro.appendChild(pushInfo);

    //タッチフラグをリターンする
    return 1;
}

//マウスカーソルを都道府県のBox上から移動した場合にポップアップを消す
function infoDelete() {

    //ポップアップ用のBox情報、ポップアップに挿入された要素を取得して定義
    const intro = document.getElementById("intro");
    const popPop = document.querySelector(".image");
    const popInfo = document.querySelector(".right");

    //ポップアップを非可視化
    intro.style.visibility = (intro.style.visibility == "visible") ? "hidden" : "visible";

    //ポップアップに挿入された情報の削除
    intro.removeChild(popPop);
    intro.removeChild(popInfo);

    //タッチフラグをリターンする
    return 0;
}

//クリックした都道府県のGoogle検索画面を表示
function googleSerch(event) {
    const point = event.currentTarget;
    let serchInfo = "https://www.google.com/search?q="

    //Google検索テキストを生成
    serchInfo += point.innerText + "+観光名所";

    //Google検索画面に画面遷移
    window.open(serchInfo);

}

//都道府県の要素を取得して定義
for (const i in introObj) {
    todofuken[i] = document.getElementById(i);
}

//都道府県の要素範囲への侵入、脱出時のアクション、クリック時のアクション
//北海道
tachFlag = todofuken.hokkaido.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.hokkaido.addEventListener("mouseleave", infoDelete);
todofuken.hokkaido.addEventListener("click", googleSerch);

//青森
tachFlag = todofuken.aomori.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.aomori.addEventListener("mouseleave", infoDelete);
todofuken.aomori.addEventListener("click", googleSerch);

//岩手
tachFlag = todofuken.iwate.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.iwate.addEventListener("mouseleave", infoDelete);
todofuken.iwate.addEventListener("click", googleSerch);

//秋田
tachFlag = todofuken.akita.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.akita.addEventListener("mouseleave", infoDelete);
todofuken.akita.addEventListener("click", googleSerch);

//宮城
tachFlag = todofuken.miyagi.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.miyagi.addEventListener("mouseleave", infoDelete);
todofuken.miyagi.addEventListener("click", googleSerch);

//山形
tachFlag = todofuken.yamagata.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.yamagata.addEventListener("mouseleave", infoDelete);
todofuken.yamagata.addEventListener("click", googleSerch);

//福島
tachFlag = todofuken.fukushima.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.fukushima.addEventListener("mouseleave", infoDelete);
todofuken.fukushima.addEventListener("click", googleSerch);

//茨城
tachFlag = todofuken.ibaraki.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.ibaraki.addEventListener("mouseleave", infoDelete);
todofuken.ibaraki.addEventListener("click", googleSerch);

//栃木
tachFlag = todofuken.tochigi.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.tochigi.addEventListener("mouseleave", infoDelete);
todofuken.tochigi.addEventListener("click", googleSerch);

//群馬
tachFlag = todofuken.gunma.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.gunma.addEventListener("mouseleave", infoDelete);
todofuken.gunma.addEventListener("click", googleSerch);

//埼玉
tachFlag = todofuken.saitama.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.saitama.addEventListener("mouseleave", infoDelete);
todofuken.saitama.addEventListener("click", googleSerch);

//千葉
tachFlag = todofuken.chiba.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.chiba.addEventListener("mouseleave", infoDelete);
todofuken.chiba.addEventListener("click", googleSerch);

//東京
tachFlag = todofuken.tokyo.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.tokyo.addEventListener("mouseleave", infoDelete);
todofuken.tokyo.addEventListener("click", googleSerch);

//神奈川
tachFlag = todofuken.kanagawa.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.kanagawa.addEventListener("mouseleave", infoDelete);
todofuken.kanagawa.addEventListener("click", googleSerch);

//新潟
tachFlag = todofuken.nigata.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.nigata.addEventListener("mouseleave", infoDelete);
todofuken.nigata.addEventListener("click", googleSerch);

//富山
tachFlag = todofuken.toyama.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.toyama.addEventListener("mouseleave", infoDelete);
todofuken.toyama.addEventListener("click", googleSerch);

//石川
tachFlag = todofuken.ishikawa.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.ishikawa.addEventListener("mouseleave", infoDelete);
todofuken.ishikawa.addEventListener("click", googleSerch);

//福井
tachFlag = todofuken.fukui.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.fukui.addEventListener("mouseleave", infoDelete);
todofuken.fukui.addEventListener("click", googleSerch);

//長野
tachFlag = todofuken.nagano.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.nagano.addEventListener("mouseleave", infoDelete);
todofuken.nagano.addEventListener("click", googleSerch);

//岐阜
tachFlag = todofuken.gifu.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.gifu.addEventListener("mouseleave", infoDelete);
todofuken.gifu.addEventListener("click", googleSerch);

//山梨
tachFlag = todofuken.yamanashi.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.yamanashi.addEventListener("mouseleave", infoDelete);
todofuken.yamanashi.addEventListener("click", googleSerch);

//静岡
tachFlag = todofuken.shizuoka.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.shizuoka.addEventListener("mouseleave", infoDelete);
todofuken.shizuoka.addEventListener("click", googleSerch);

//愛知
tachFlag = todofuken.aichi.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.aichi.addEventListener("mouseleave", infoDelete);
todofuken.aichi.addEventListener("click", googleSerch);

//滋賀
tachFlag = todofuken.shiga.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.shiga.addEventListener("mouseleave", infoDelete);
todofuken.shiga.addEventListener("click", googleSerch);

//京都
tachFlag = todofuken.kyoto.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.kyoto.addEventListener("mouseleave", infoDelete);
todofuken.kyoto.addEventListener("click", googleSerch);

//兵庫
tachFlag = todofuken.hyougo.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.hyougo.addEventListener("mouseleave", infoDelete);
todofuken.hyougo.addEventListener("click", googleSerch);

//三重
tachFlag = todofuken.mie.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.mie.addEventListener("mouseleave", infoDelete);
todofuken.mie.addEventListener("click", googleSerch);

//奈良
tachFlag = todofuken.nara.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.nara.addEventListener("mouseleave", infoDelete);
todofuken.nara.addEventListener("click", googleSerch);

//大阪
tachFlag = todofuken.osaka.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.osaka.addEventListener("mouseleave", infoDelete);
todofuken.osaka.addEventListener("click", googleSerch);

//和歌山
tachFlag = todofuken.wakayama.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.wakayama.addEventListener("mouseleave", infoDelete);
todofuken.wakayama.addEventListener("click", googleSerch);

//鳥取
tachFlag = todofuken.tottori.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.tottori.addEventListener("mouseleave", infoDelete);
todofuken.tottori.addEventListener("click", googleSerch);

//島根
tachFlag = todofuken.shimane.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.shimane.addEventListener("mouseleave", infoDelete);
todofuken.shimane.addEventListener("click", googleSerch);

//山口
tachFlag = todofuken.yamaguchi.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.yamaguchi.addEventListener("mouseleave", infoDelete);
todofuken.yamaguchi.addEventListener("click", googleSerch);

//岡山
tachFlag = todofuken.okayama.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.okayama.addEventListener("mouseleave", infoDelete);
todofuken.okayama.addEventListener("click", googleSerch);

//広島
tachFlag = todofuken.hiroshima.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.hiroshima.addEventListener("mouseleave", infoDelete);
todofuken.hiroshima.addEventListener("click", googleSerch);

//香川
tachFlag = todofuken.kagawa.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.kagawa.addEventListener("mouseleave", infoDelete);
todofuken.kagawa.addEventListener("click", googleSerch);

//愛媛
tachFlag = todofuken.ehime.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.ehime.addEventListener("mouseleave", infoDelete);
todofuken.ehime.addEventListener("click", googleSerch);

//徳島
tachFlag = todofuken.tokushima.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.tokushima.addEventListener("mouseleave", infoDelete);
todofuken.tokushima.addEventListener("click", googleSerch);

//高知
tachFlag = todofuken.kouchi.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.kouchi.addEventListener("mouseleave", infoDelete);
todofuken.kouchi.addEventListener("click", googleSerch);

//福岡
tachFlag = todofuken.fukuoka.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.fukuoka.addEventListener("mouseleave", infoDelete);
todofuken.fukuoka.addEventListener("click", googleSerch);

//佐賀
tachFlag = todofuken.saga.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.saga.addEventListener("mouseleave", infoDelete);
todofuken.saga.addEventListener("click", googleSerch);

//長崎
tachFlag = todofuken.nagasaki.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.nagasaki.addEventListener("mouseleave", infoDelete);
todofuken.nagasaki.addEventListener("click", googleSerch);

//大分
tachFlag = todofuken.oita.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.oita.addEventListener("mouseleave", infoDelete);
todofuken.oita.addEventListener("click", googleSerch);

//熊本
tachFlag = todofuken.kumamoto.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.kumamoto.addEventListener("mouseleave", infoDelete);
todofuken.kumamoto.addEventListener("click", googleSerch);

//宮崎
tachFlag = todofuken.miyazaki.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.miyazaki.addEventListener("mouseleave", infoDelete);
todofuken.miyazaki.addEventListener("click", googleSerch);

//鹿児島
tachFlag = todofuken.kagoshima.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.kagoshima.addEventListener("mouseleave", infoDelete);
todofuken.kagoshima.addEventListener("click", googleSerch);

//沖縄
tachFlag = todofuken.okinawa.addEventListener("mouseenter", infoPickup);
tachFlag = todofuken.okinawa.addEventListener("mouseleave", infoDelete);
todofuken.okinawa.addEventListener("click", googleSerch);