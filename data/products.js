// birthday-catalog の商品データ
const products = [
  // ===== p.3 SCIENCE & WONDER =====
  { id: "galileo-thermometer", name: "ガリレオ温度計", points: 25, page: 3, category: "SCIENCE & WONDER", notes: [] },
  { id: "storm-glass", name: "ストームグラス", points: 18, page: 3, category: "SCIENCE & WONDER", notes: [] },
  { id: "magnetic-fluid", name: "磁性流体オブジェ", points: 27, page: 3, category: "SCIENCE & WONDER", notes: [] },
  { id: "oil-timer", name: "オイルタイマー", points: 9, page: 3, category: "SCIENCE & WONDER", notes: [] },
  { id: "table-fountain", name: "卓上噴水", points: 17, page: 3, category: "SCIENCE & WONDER", notes: [] },
  { id: "rock-lamp", name: "岩石ランプ", points: 21, page: 3, category: "SCIENCE & WONDER", notes: [] },

  // ===== p.6 MIND & PUZZLES =====
  { id: "wire-puzzle", name: "知恵の輪", points: 1, page: 6, category: "MIND & PUZZLES", notes: [] },
  {
    id: "cast-puzzle",
    name: "キャストパズル",
    points: null,
    page: 6,
    category: "MIND & PUZZLES",
    notes: ["種類によって価格が異なります。名前には難易度も含みます。"],
    selectionMode: "variants",
    variants: [
      { id: "flag", name: "ぱずる キャストフラグ 難易度1/6", points: 11 },
      { id: "box", name: "ぱずる キャストボックス 難易度2/6", points: 10 },
      { id: "horse", name: "ぱずる キャストホース 難易度2/6", points: 16 },
      { id: "snow", name: "ぱずる キャストスノー 難易度2/6", points: 16 },
      { id: "galaxy", name: "ぱずる キャストギャラクシー 難易度3/6", points: 16 },
      { id: "baroque", name: "ぱずる キャストバロック 難易度4/6", points: 10 },
      { id: "ring", name: "ぱずる キャストリング 難易度4/6", points: 16 },
      { id: "elk", name: "ぱずる キャストエルク 難易度5/6", points: 9 },
      { id: "cyclone", name: "ぱずる キャストサイクロン 難易度5/6", points: 16 },
      { id: "hourglass", name: "ぱずる キャストアワーグラス 難易度6/6", points: 16 }
    ]
  },
  { id: "crystal-puzzle", name: "クリスタルパズル", points: 9, page: 6, category: "MIND & PUZZLES", notes: [] },
  { id: "secret-box", name: "寄木細工のからくり箱", points: 26, page: 6, category: "MIND & PUZZLES", notes: [] },
  { id: "tangram", name: "タングラム", points: 10, page: 6, category: "MIND & PUZZLES", notes: [] },
  { id: "kanoodle", name: "カヌードル", points: 21, page: 6, category: "MIND & PUZZLES", notes: [] },
  {
    id: "original-puzzle-piece",
    name: "オリジナルパズルピース",
    points: 10,
    page: 6,
    category: "MIND & PUZZLES",
    notes: ["ME-Oに発注して、写真やイラストをジグソーパズルにします。"],
    selectionMode: "per_unit_choices",
    choicesPerUnit: 1,
    choices: [
      { id: "request", label: "絵柄や写真を選びたい", message: "相談フォームで、使用したい写真・イラストを送ってください。" },
      { id: "illustration", label: "おまかせ（イラスト）" },
      { id: "photo", label: "おまかせ（写真）" }
    ]
  },
  { id: "random-100yen-puzzle", name: "百均のパズル（ランダム）", points: 1, page: 6, category: "MIND & PUZZLES", notes: ["自分が適当にダイソーで買ってきます。"] },

  // ===== p.7 SCIENCE & WONDER Ⅱ =====
  { id: "meteorite", name: "隕石標本", points: 11, page: 7, category: "SCIENCE & WONDER Ⅱ", notes: [] },
  {
    id: "fountain-pen",
    name: "万年筆",
    points: 11,
    page: 7,
    category: "SCIENCE & WONDER Ⅱ",
    notes: ["柄の色が選べます。"],
    selectionMode: "variants",
    variants: [
      { id: "black", name: "黒", points: 11 },
      { id: "red", name: "赤", points: 11 }
    ]
  },
  { id: "infrared-beads", name: "赤外線ビーズ", points: 1, page: 7, category: "SCIENCE & WONDER Ⅱ", notes: [] },
  { id: "levitation-top", name: "磁気浮上コマ", points: 24, page: 7, category: "SCIENCE & WONDER Ⅱ", notes: [] },
  { id: "bismuth-crystal", name: "ビスマス結晶", points: 14, page: 7, category: "SCIENCE & WONDER Ⅱ", notes: [] },
  {
    id: "fossil-dig-kit",
    name: "本物の化石発掘キット",
    points: 19,
    page: 7,
    category: "SCIENCE & WONDER Ⅱ",
    notes: ["年代が選べます。"],
    selectionMode: "variants",
    variants: [
      { id: "paleozoic", name: "古生代（三葉虫やウミユリ類など）", points: 19 },
      { id: "mesozoic", name: "中生代（アンモナイトや恐竜の骨など）", points: 19 },
      { id: "cenozoic", name: "新生代（琥珀やサメの歯など）", points: 19 }
    ]
  },

  // ===== p.8 TECH & DAILY =====
  { id: "usb-hub", name: "4ポートUSBハブ", points: 9, page: 8, category: "TECH & DAILY", notes: [] },
  { id: "air-footrest", name: "エアー式ふっとレスト", points: 6, page: 8, category: "TECH & DAILY", notes: [] },
  { id: "drinking-bird", name: "平和鳥（水飲み鳥）", points: 9, page: 8, category: "TECH & DAILY", notes: [] },
  {
    id: "sushi-towel",
    name: "のり巻きタオル【納豆巻】",
    points: 7,
    page: 8,
    category: "TECH & DAILY",
    notes: ["味が選べます。"],
    selectionMode: "variants",
    variants: [
      { id: "natto", name: "納豆巻", points: 7 },
      { id: "cucumber", name: "かっぱ巻", points: 7 },
      { id: "tuna", name: "鉄火巻", points: 7 }
    ]
  },
  {
    id: "karaoke-ticket",
    name: "カラオケ一回無料券",
    points: null,
    page: 8,
    category: "TECH & DAILY",
    notes: ["カラオケの際に、一回分の費用を現金で渡します。店舗や日時によって料金が変わります。"],
    special: "consult"
  },
  {
    id: "wasabi-marker",
    name: "わさびいろマーカー",
    points: 6,
    page: 8,
    category: "TECH & DAILY",
    notes: ["味が選べます。各種類とも1個6 PTです。"],
    selectionMode: "variants",
    variants: [
      { id: "wasabi", name: "わさびチューブマーカー（緑色）", points: 6 },
      { id: "ginger", name: "生しょうがチューブマーカー（黄色）", points: 6 },
      { id: "ume", name: "ねり梅チューブマーカー（紫）", points: 6 }
    ]
  },
  { id: "chopstick-pen", name: "割り箸ボールペン", points: 3, page: 8, category: "TECH & DAILY", notes: [] },
  { id: "kamaboko", name: "板付かみぼこ 紅", points: 11, page: 8, category: "TECH & DAILY", notes: [] },
  { id: "egg-roll-towel", name: "玉子巻きタオル【チビ巻】", points: 4, page: 8, category: "TECH & DAILY", notes: [] },

  // ===== p.9 SNACKS & REFRESHMENTS =====
  {
    id: "男梅-candy",
    name: "男梅キャンデー",
    points: null,
    page: 9,
    category: "SNACKS & REFRESHMENTS",
    notes: ["単品か箱買いか選べます。"],
    selectionMode: "variants",
    variants: [
      { id: "single", name: "1袋", points: 2 },
      { id: "box", name: "1箱", points: 12 }
    ]
  },
  { id: "yocchan-ika", name: "よっちゃんいか 2袋", points: 1, page: 9, category: "SNACKS & REFRESHMENTS", notes: [] },
  { id: "small-stone-chocolate", name: "小石チョコレート 業務用", points: 10, page: 9, category: "SNACKS & REFRESHMENTS", notes: [] },
  { id: "butamen", name: "ブタメン1個", points: 1, page: 9, category: "SNACKS & REFRESHMENTS", notes: [] },
  { id: "legal-herbs", name: "合法ハーブ", points: 2, page: 9, category: "SNACKS & REFRESHMENTS", notes: ["ダージリンティーです。"] },
  { id: "legal-ramune", name: "合法ラムネ", points: 1, page: 9, category: "SNACKS & REFRESHMENTS", notes: ["ただの大粒ラムネです。"] },
  { id: "popcorn", name: "ポップコーン1袋", points: 1, page: 9, category: "SNACKS & REFRESHMENTS", notes: [] },
  {
    id: "random-strange-snacks",
    name: "ランダムー珍妙なお菓子",
    points: null,
    page: 9,
    category: "SNACKS & REFRESHMENTS",
    notes: [
      "自分がポイント分の変なお菓子をふざけて持っていきます。選ぶのは推奨しません。",
      "1 PTあたりお菓子1個という意味ではありません。このカテゴリに投入されたポイントで、珍妙なお菓子を1個〜いくつか買ってきます。",
      "数合わせ用という意味も込めて、この商品だけ1 PT〜30 PTまで0.1 PT刻みで指定できます。"
    ],
    special: "custom_points",
    pointInput: { min: 1, max: 30, step: 0.1 }
  },
  {
    id: "printed-cookies",
    name: "三枚入りプリントクッキー",
    points: 16,
    page: 9,
    category: "SNACKS & REFRESHMENTS",
    notes: [
      "写真やイラストをクッキーにプリントします。",
      "1個につき3枚入りです。1枚ずつ別の絵柄を指定できます。"
    ],
    selectionMode: "per_unit_choices",
    choicesPerUnit: 3,
    choices: [
      { id: "request", label: "絵柄や写真を選びたい", message: "相談フォームでリクエストを送ってください。" },
      { id: "illustration", label: "おまかせ（イラスト）" },
      { id: "photo", label: "おまかせ（写真）" }
    ]
  },

  // ===== p.10 CREATIVE SERVICES =====
  {
    id: "mouse-cursor",
    name: "マウスカーソル作成",
    points: 0.2,
    page: 10,
    category: "CREATIVE SERVICES",
    notes: ["納期未定。どんなデザインでも作成します。サンプル（自作カーソル）は以下から試せます！"],
    downloadUrl: "./assets/custom-cursor.zip"
  },
  { id: "desktop-icon", name: "デスクトップアイコン", points: 0.1, page: 10, category: "CREATIVE SERVICES", notes: ["納期未定。適当なドット絵で作成します。"] },
  {
    id: "vtuber-model",
    name: "Vtuberモデル",
    points: null,
    page: 10,
    category: "CREATIVE SERVICES",
    notes: ["納期未定。メッセージフォームで価格を相談します。"],
    special: "consult"
  },
  { id: "hand-drawn-video", name: "手描き動画作成", points: 0.8, page: 10, category: "CREATIVE SERVICES", notes: ["納期未定。どんなキャラでもOKです。"] },
  { id: "desktop-mascot", name: "デスクトップマスコット", points: 0.7, page: 10, category: "CREATIVE SERVICES", notes: ["納期未定。ぽぴぃ。"] },
  {
    id: "anything-i-can-make",
    name: "自分が作れるもの",
    points: null,
    page: 10,
    category: "CREATIVE SERVICES",
    notes: ["納期未定。メッセージフォームで価格と制作内容を相談します。"],
    special: "consult"
  },

  // ===== p.11 SPECIAL SELECTION =====
  {
    id: "purple-corn-soup",
    name: "紫色のコーンスープ",
    points: -3,
    page: 11,
    category: "SPECIAL SELECTION",
    notes: ["注文時には完食をお願いします。", "注文すると使えるポイントが3 PT増えます。"],
    special: "bonus_points"
  },
  {
    id: "uonuma-mayor-shield",
    name: "魚沼市長賞の盾",
    points: 30,
    page: 11,
    category: "SPECIAL SELECTION",
    notes: [],
    special: "confirm_before_order",
    confirmMessage: "正気ですか？"
  },
  {
    id: "culture-festival-certificate",
    name: "文化祭Tシャツ表彰状",
    points: 30,
    page: 11,
    category: "SPECIAL SELECTION",
    notes: [],
    special: "confirm_before_order",
    confirmMessage: "正気ですか？"
  },
  { id: "stationery-punch", name: "パンチ（文房具）", points: 1, page: 11, category: "SPECIAL SELECTION", notes: [] },
  {
    id: "green-onion-kit",
    name: "ネギ栽培キット",
    points: 8,
    page: 11,
    category: "SPECIAL SELECTION",
    notes: ["自分が育てたいので選べません。"],
    special: "unavailable",
    unavailableMessage: "自分が育てたいので選べません"
  },
  { id: "chili-kit", name: "唐辛子栽培キット", points: 8, page: 11, category: "SPECIAL SELECTION", notes: [] },

  // ===== p.12 THE SOUND COLLECTION =====
  {
    id: "otamatone-melody",
    name: "オタマトーンメロディ",
    points: 14,
    page: 12,
    category: "THE SOUND COLLECTION",
    notes: ["色と収録曲が選べます。"],
    selectionMode: "variants",
    variants: [
      { id: "white-classical", name: "ホワイト（クラシック収録）", points: 14 },
      { id: "black-classical", name: "ブラック（クラシック収録）", points: 14 },
      { id: "pink-classical", name: "ピンク（クラシック収録）", points: 14 },
      { id: "blue-classical", name: "ブルー（クラシック収録）", points: 14 },
      { id: "red-children", name: "レッド（童謡収録）", points: 14 },
      { id: "blue-children", name: "ブルー（童謡収録）", points: 14 },
      { id: "yellow-children", name: "イエロー（童謡収録）", points: 14 },
      { id: "lime-children", name: "ライム（童謡収録）", points: 14 },
      { id: "mint-children", name: "ミント（童謡収録）", points: 14 },
      { id: "purple-children", name: "パープル（童謡収録）", points: 14 }
    ]
  },
  { id: "asarato", name: "アサラト（パチカ）", points: 12, page: 12, category: "THE SOUND COLLECTION", notes: [] },
  { id: "jaw-harp", name: "口琴（ダンモイ）", points: 13, page: 12, category: "THE SOUND COLLECTION", notes: [] },
  { id: "kazoo", name: "カズー", points: 9, page: 12, category: "THE SOUND COLLECTION", notes: [] },
  { id: "slide-whistle", name: "スライドホイッスル", points: 7, page: 12, category: "THE SOUND COLLECTION", notes: [] },
  { id: "rainstick", name: "レインスティック", points: 15, page: 12, category: "THE SOUND COLLECTION", notes: [] }
];