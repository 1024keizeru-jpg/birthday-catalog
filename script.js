const catalog = document.getElementById("catalog");
const pointTotal = document.getElementById("point-total");
const confirmButton = document.getElementById("confirm-order");
const orderStatus = document.getElementById("order-status");

const BASE_BUDGET = 30;

// 操作ログ蓄積用
const actionLogs = [];
function addLog(message) {
  const time = new Date().toLocaleTimeString('ja-JP');
  const entry = `[${time}] ${message}`;
  actionLogs.push(entry);
  console.log("LOG:", entry);
}

const pageNames = {
  1: "NEW ARRIVALS",
  3: "SCIENCE & WONDER",
  6: "MIND & PUZZLES",
  7: "SCIENCE & WONDER Ⅱ",
  8: "TECH & DAILY",
  9: "SNACKS & REFRESHMENTS",
  10: "CREATIVE SERVICES",
  11: "SPECIAL SELECTION",
  12: "THE SOUND COLLECTION"
};

const selected = {};

// ==========================================
// ① 内輪ネタクイズ処理（全問正解・シャッフル）
// ==========================================
const quizBank = [
  { q: "残りパウダーは？", options: ["歌い手", "Vtuber", "ゆっくり実況者"], a: 0 },
  { q: "貰ったことがあるのは？", options: ["カントリーマアム２箱", "男梅２箱", "きのこの山２箱"], a: 1 },
  { q: "自分が言いそうなのは？", options: ["「いいと思うわ～」", "「チョベリグですわ」", "「それよりイカ食いたいんだわ」"], a: 0 },
  { q: "お前が嫌いなのは？", options: ["カニ味噌", "唐辛子", "ネギ"], a: 2 },
  { q: "擬人化されていないアミノ酸は？", options: ["トリプトファン", "グルタミン酸", "バリン"], a: 0 },
  { q: "ぬんといえば？", options: ["松", "梅", "竹"], a: 0 },
  { q: "減塩とか関係ないので塩一袋たこにかけてみた人は？", options: ["がんになる人", "人様の母", "ガリ食えなかった人"], a: 0 },
  { q: "２０２４年７月にお前の地区で停電した家は何軒？", options: ["3350軒", "1310軒", "2550軒"], a: 2 },
  { q: "松茸ポテトで自分が噛んだのは？", options: ["一回目のｍ", "二回目のt", "三回目のｐ"], a: 1 },
  { q: "イエローハットリで無料なのは？", options: ["敷金、礼金", "手数料", "敷金、礼金、手数料"], a: 2 },
  { q: "三大疫病保障プランに災害保険もあわせたお前生命は月々何円？", options: ["810円", "1620円", "2180円"], a: 0 },
  { q: "三大疫病保障プランに災害保険もあわせたお前生命の加入特典は？", options: ["家族全員分のシチュー", "加入者への商品券", "畔神教の壺"], a: 0 },
  { q: "パスされた内輪ネタクロスワードパズルの返礼は？", options: ["スンドゥブチゲ１つ", "鯛めし１つ", "男梅キャンディ１つ"], a: 1 },
  { q: "２０２４年に自分に誕生日プレゼントをくれなかったのは？", options: ["木", "亠 ", "彡"], a: 2 },
  { q: "自分コーヒーフーズの袋を運ぶバイトは何回募集された？", options: ["２回", "３回 ", "４回"], a: 2 },
  { q: "ツインテールじゃないやつは？", options: ["ぬん", "ひがん", "ぽー"], a: 2 }
];

let selectedQuizzes = [];

function initQuiz() {
  addLog("クイズ画面の読み込み（シャッフル実行）");
  selectedQuizzes = [...quizBank].sort(() => 0.5 - Math.random()).slice(0, 5);
  
  const container = document.getElementById("quiz-questions");
  container.innerHTML = "";

  selectedQuizzes.forEach((item, index) => {
    const qDiv = document.createElement("div");
    qDiv.className = "quiz-item";
    qDiv.innerHTML = `<p><strong>Q${index + 1}. ${item.q}</strong></p>` +
      item.options.map((opt, optIdx) => 
        `<label style="display:block; margin: 6px 0; cursor:pointer;"><input type="radio" name="q${index}" value="${optIdx}"> ${opt}</label>`
      ).join('');
    container.appendChild(qDiv);
  });
}

document.getElementById("submit-quiz-btn").addEventListener("click", () => {
  let score = 0;
  selectedQuizzes.forEach((item, index) => {
    const checked = document.querySelector(`input[name="q${index}"]:checked`);
    if (checked && parseInt(checked.value) === item.a) {
      score++;
    }
  });

  const errorMsg = document.getElementById("quiz-error-msg");

  if (score === 5) {
    addLog("クイズ全問正解！ - カタログへ進入");
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    renderCatalog();
  } else {
    addLog("クイズ不合格 - 再シャッフル実施");
    errorMsg.textContent = "不正解があるぜ！全問正解で合格なんだわ。問題を新しくシャッフルするぜ。";
    errorMsg.style.display = "block";
    initQuiz();
  }
});

// ==========================================
// ② カタログ・ポイント計算処理
// ==========================================
function getBudget() {
  const soup = products.find(p => p.name === "紫色のコーンスープ");
  if (soup && selected[soup.id]?.checked) {
    return BASE_BUDGET + 3;
  }
  return BASE_BUDGET;
}

function getProductPoints(product) {
  const state = selected[product.id];
  if (!state || !state.checked) return 0;
  if (product.special === "bonus_points") return 0;
  if (product.special === "custom_points") return Number(state.customPoints || 0);

  if (Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants.reduce((sum, variant, index) => {
      const option = state.options?.[index];
      if (!option?.checked) return sum;
      return sum + Number(variant.points || 0) * Number(option.quantity || 0);
    }, 0);
  }

  return Number(product.points || 0) * Number(state.quantity || 0);
}

function getTotalPoints() {
  return products.reduce((sum, product) => sum + getProductPoints(product), 0);
}

function formatPoints(value) {
  return Number(value.toFixed(1)).toString();
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createQuantitySelect(value, max = 30) {
  const select = document.createElement("select");
  select.setAttribute("aria-label", "数量");

  for (let i = 0; i <= max; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `${i}個`;
    option.selected = i === Number(value);
    select.appendChild(option);
  }

  return select;
}

function getUnitPrice(product, variant) {
  if (variant && variant.points !== undefined && variant.points !== null) {
    return Number(variant.points);
  }
  return Number(product.points || 0);
}

function getMaxQuantity(price) {
  if (price <= 0) return 30;
  if (price > 15) return 1;
  return Math.max(1, Math.floor(30 / price));
}

function initializeProductState(product) {
  if (!selected[product.id]) {
    selected[product.id] = {
      checked: false,
      quantity: 0,
      options: {},
      customPoints: 1,
      choices: []
    };
  }

  const state = selected[product.id];

  if (Array.isArray(product.variants)) {
    product.variants.forEach((variant, index) => {
      if (!state.options[index]) {
        state.options[index] = { checked: false, quantity: 0 };
      }
    });
  }

  return state;
}

function activateProduct(product, state) {
  state.checked = true;

  if (Array.isArray(product.variants) && product.variants.length > 0) {
    product.variants.forEach((variant, index) => {
      if (!state.options[index]) {
        state.options[index] = { checked: false, quantity: 0 };
      }
      if (state.options[index].quantity === 0) {
        state.options[index].quantity = 1;
      }
    });
  } else if (
    product.special !== "custom_points" &&
    product.points !== null &&
    product.points !== undefined &&
    state.quantity === 0
  ) {
    state.quantity = 1;
  }
}

function renderProduct(product) {
  const state = initializeProductState(product);
  const card = createElement("article", "product-card");

  if (state.checked) {
    card.classList.add("is-selected");
  }

  const titleRow = createElement("div", "product-title-row");
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.checked = state.checked;
  checkbox.setAttribute("aria-label", `${product.name}を選択`);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      activateProduct(product, state);
      addLog(`「${product.name}」を選択しました`);

      if (product.special === "consult") {
        addLog(`「${product.name}」（価格相談）が選択されたためモーダルを自動展開`);
        openChatModal();
      }
    } else {
      state.checked = false;
      addLog(`「${product.name}」の選択を解除しました`);
    }

    renderCatalog();
  });

  const name = createElement("h3", "product-name", product.name);

  let priceText = "価格相談";

  if (product.special === "custom_points") {
    priceText = "1～30 PT";
  } else if (Array.isArray(product.variants) && product.variants.length > 0) {
    const prices = product.variants.map(v => getUnitPrice(product, v));
    const uniquePrices = [...new Set(prices)];
    priceText = uniquePrices.length === 1 ? `${formatPoints(uniquePrices[0])} PT / 個` : "種類ごとに価格設定";
  } else if (product.points !== null && product.points !== undefined) {
    priceText = `${formatPoints(product.points)} PT`;
  }

  const price = createElement("span", "product-price", priceText);

  titleRow.append(checkbox, name, price);
  card.appendChild(titleRow);

  if (product.description) {
    card.appendChild(createElement("p", "product-description", product.description));
  }

  if (Array.isArray(product.notes) && product.notes.length > 0) {
    const notes = createElement("div", "product-notes");
    notes.textContent = product.notes.join("\n");
    card.appendChild(notes);
  }

  if (product.downloadUrl) {
    const dlBox = createElement("div", "", "");
    dlBox.style.marginTop = "10px";
    const dlBtn = createElement("a", "action-button", "🔰わかばカーソルをダウンロード");
    dlBtn.href = product.downloadUrl;
    dlBtn.setAttribute("download", "");
    dlBtn.style.display = "inline-block";
    dlBtn.style.textDecoration = "none";
    dlBtn.style.fontSize = "0.85rem";
    dlBtn.addEventListener("click", () => addLog(`わかばカーソルをダウンロードしました`));
    dlBox.appendChild(dlBtn);
    card.appendChild(dlBox);
  }

  if (product.special === "consult" && state.checked) {
    const consultNotice = createElement("div", "validation-message", "⚠️ 価格未確定の商品です。上の「💬 価格相談・質問はこちら」から価格相談をしてください。");
    card.appendChild(consultNotice);
  }

  if (Array.isArray(product.variants) && product.variants.length > 0) {
    if (state.checked) {
      const optionsBox = createElement("div", "product-options");

      product.variants.forEach((variant, index) => {
        const optionState = state.options[index];
        const row = createElement("div", "option-row");
        const optionCheckbox = document.createElement("input");

        optionCheckbox.type = "checkbox";
        optionCheckbox.checked = optionState.checked;

        const optionContent = createElement("div", "option-content");
        const variantName = variant.name || variant.label || `選択肢${index + 1}`;
        const variantPrice = getUnitPrice(product, variant);

        optionCheckbox.addEventListener("change", () => {
          optionState.checked = optionCheckbox.checked;
          if (optionCheckbox.checked && optionState.quantity === 0) {
            optionState.quantity = 1;
          }
          addLog(`「${product.name}」 - 「${variantName}」のチェックを${optionCheckbox.checked ? '入れました' : '外しました'}`);
          renderCatalog();
        });

        const label = createElement("label", "option-label", `${variantName}（${formatPoints(variantPrice)} PT）`);
        const controls = createElement("div", "option-controls");
        const quantitySelect = createQuantitySelect(optionState.quantity, getMaxQuantity(variantPrice));

        quantitySelect.addEventListener("change", () => {
          optionState.quantity = Number(quantitySelect.value);
          addLog(`「${product.name}」 - 「${variantName}」の数量を${quantitySelect.value}に変更しました`);
          renderCatalog();
        });

        controls.appendChild(quantitySelect);
        optionContent.append(label, controls);
        row.append(optionCheckbox, optionContent);
        optionsBox.appendChild(row);
      });

      card.appendChild(optionsBox);
    }
  } else if (product.special === "custom_points") {
    const controls = createElement("div", "option-controls");
    const input = document.createElement("input");

    input.type = "number";
    input.min = "1";
    input.max = "30";
    input.step = "0.1";
    input.value = String(state.customPoints);
    input.disabled = !state.checked;
    input.setAttribute("aria-label", "投入するポイント");

    input.addEventListener("change", () => {
      let value = Number(input.value);
      if (!Number.isFinite(value)) value = 1;
      value = Math.min(30, Math.max(1, Math.round(value * 10) / 10));
      state.customPoints = value;
      addLog(`「${product.name}」への投入ポイントを${value} PTに変更しました`);
      renderCatalog();
    });

    controls.append(createElement("span", "", "投入ポイント："), input, createElement("span", "", "PT"));
    card.appendChild(controls);
  } else if (product.points !== null && product.points !== undefined) {
    const controls = createElement("div", "option-controls");
    const maxQuantity = product.special === "bonus_points" ? 1 : getMaxQuantity(Number(product.points));
    const quantitySelect = createQuantitySelect(state.quantity, maxQuantity);

    quantitySelect.addEventListener("change", () => {
      state.quantity = Number(quantitySelect.value);
      addLog(`「${product.name}」の数量を${quantitySelect.value}に変更しました`);
      renderCatalog();
    });

    controls.append(createElement("span", "", "数量："), quantitySelect);
    card.appendChild(controls);
  }

  return card;
}

function renderCatalog() {
  catalog.replaceChildren();

  const pageNumbers = [...new Set(products.map(p => p.page))].sort((a, b) => a - b);

  pageNumbers.forEach((page) => {
    const pageProducts = products.filter(p => p.page === page);
    if (pageProducts.length === 0) return;

    const section = createElement("section", "category-section");
    const heading = createElement("h2", "category-heading", pageNames[page] || `PAGE ${page}`);
    const grid = createElement("div", "product-grid");

    pageProducts.forEach((product) => {
      grid.appendChild(renderProduct(product));
    });

    section.append(heading, grid);
    catalog.appendChild(section);
  });

  const total = getTotalPoints();
  const budget = getBudget();

  pointTotal.textContent = `${formatPoints(total)} / ${formatPoints(budget)} PT`;
  pointTotal.style.color = total > budget ? "#b33d3d" : "#75516f";

  const status = createElement("p", "status-message");

  if (total < budget) {
    status.textContent = `あと ${formatPoints(budget - total)} PT 選べます。`;
  } else if (total > budget) {
    status.textContent = `${formatPoints(total - budget)} PT 超過しています。`;
  } else {
    status.textContent = "ポイントがちょうど一致しているぜ！🎉";
  }

  catalog.appendChild(status);
}

function validateOrder() {
  const errors = [];
  const total = getTotalPoints();
  const budget = getBudget();

  if (Math.abs(total - budget) > 0.001) {
    if (total < budget) {
      errors.push(`ポイントが ${formatPoints(budget - total)} PT 残っています。`);
    } else {
      errors.push(`予算を ${formatPoints(total - budget)} PT 超過しています。`);
    }
  }

  products.forEach((product) => {
    const state = selected[product.id];
    if (!state || !state.checked) return;

    if (product.name.includes("ネギ栽培キット")) {
      errors.push(`${product.name}は注文できません。自分が育てたいので、選択を解除してください。`);
    }

    if (product.special === "consult") {
      errors.push(`${product.name}は価格相談が終わっていません。メッセージフォームから価格相談をしてください。`);
      return;
    }

    if (Array.isArray(product.variants) && product.variants.length > 0) {
      const checkedOptions = product.variants
        .map((variant, index) => ({ variant, option: state.options?.[index] }))
        .filter(({ option }) => option?.checked);

      if (checkedOptions.length === 0) {
        errors.push(`${product.name}の選択肢を1つ以上選んでください。`);
        return;
      }

      checkedOptions.forEach(({ variant, option }) => {
        if (Number(option.quantity) <= 0) {
          errors.push(`${product.name}「${variant.name || variant.label}」の数量が0個です。`);
        }
      });
      return;
    }

    if (product.special === "custom_points") {
      const points = Number(state.customPoints);
      if (!Number.isFinite(points) || points < 1 || points > 30) {
        errors.push(`${product.name}の投入ポイントは1～30 PTにしてください。`);
      }
      return;
    }

    if (product.points !== null && product.points !== undefined && Number(state.quantity) <= 0) {
      errors.push(`${product.name}の数量が0個です。選択を解除するか、数量を変更してください。`);
    }
  });

  return errors;
}

function getSelectedItemsText() {
  const itemsText = [];
  products.forEach(p => {
    const state = selected[p.id];
    if (state && state.checked) {
      if (Array.isArray(p.variants) && p.variants.length > 0) {
        p.variants.forEach((v, idx) => {
          const opt = state.options?.[idx];
          if (opt && opt.checked) {
            itemsText.push(`・${p.name} [${v.name || v.label}]: ${opt.quantity}個 (${formatPoints(v.points * opt.quantity)} PT)`);
          }
        });
      } else if (p.special === "custom_points") {
        itemsText.push(`・${p.name}: ${state.customPoints} PT投入`);
      } else {
        itemsText.push(`・${p.name}: ${state.quantity}個 (${formatPoints(p.points * state.quantity)} PT)`);
      }
    }
  });
  return itemsText.join("\n");
}

confirmButton.addEventListener("click", () => {
  orderStatus.replaceChildren();
  const errors = validateOrder();

  if (errors.length > 0) {
    const heading = createElement("p", "order-error-heading", "注文を確定できません。次の項目を確認してください。");
    const list = createElement("ul", "order-error-list");
    errors.forEach((message) => list.appendChild(createElement("li", "", message)));
    orderStatus.append(heading, list);
    orderStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }

  const specialItems = products.filter((p) => {
    const state = selected[p.id];
    return state?.checked && Number(p.points) === 30 && (p.name === "魚沼市長賞の盾" || p.name === "文化祭Tシャツ表彰状");
  });

  for (const product of specialItems) {
    if (!window.confirm(`${product.name}を選択しています。正気ですか？`)) {
      orderStatus.textContent = "注文確認をキャンセルしました。";
      return;
    }
  }

  const confirmed = window.confirm(`合計 ${formatPoints(getTotalPoints())} PT で注文を完了します。\nよろしいですか？`);
  if (!confirmed) {
    orderStatus.textContent = "注文確認をキャンセルしました。";
    return;
  }

  addLog("注文確定ボタンを押しました");

  document.getElementById("orderedItemsInput").value = getSelectedItemsText();
  document.getElementById("totalPointsInput").value = `${formatPoints(getTotalPoints())} PT`;
  document.getElementById("orderActionLogInput").value = actionLogs.join("\n");

  document.getElementById("orderForm").submit();
});

document.getElementById("historyForm").addEventListener("submit", function() {
  addLog("迷いログ送信ボタンを押しました");
  document.getElementById("historyLogInput").value = actionLogs.join("\n");
});

const chatModal = document.getElementById("chat-modal");
function openChatModal() {
  chatModal.style.display = "flex";
}
document.getElementById("open-chat-modal-btn").addEventListener("click", () => {
  addLog("「価格相談・質問」ボタンを押しました");
  openChatModal();
});
document.getElementById("close-chat-modal-btn").addEventListener("click", () => {
  chatModal.style.display = "none";
});

initQuiz();