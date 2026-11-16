// SPDX-License-Identifier: MIT
const fileSelect = document.getElementById("file");
const code = document.getElementById("code");
const status = document.getElementById("status");
const raw = document.getElementById("raw");
const copy = document.getElementById("copy");
const next = document.getElementById("next");
let files = [];
let request = 0;
let searchAt = 0;
let lastQuery = "";

function localUrl(path) {
  if (
    path.startsWith("/") ||
    path.split("/").some((part) => part === ".." || !part)
  ) {
    throw new Error("ファイルのパスが不正です。");
  }
  return new URL(
    path.split("/").map(encodeURIComponent).join("/"),
    location.href,
  );
}

async function loadFile(path) {
  const id = ++request;
  const file = files.find((item) => item.path === path);
  if (!file) return;
  fileSelect.value = path;
  code.value = "";
  copy.disabled = next.disabled = true;
  raw.hidden = true;
  searchAt = 0;
  status.textContent = "読み込み中…";
  try {
    const url = localUrl(path);
    const response = await fetch(url, {
      credentials: "omit",
      referrerPolicy: "no-referrer",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (id !== request) return;
    code.value = text;
    code.scrollTop = code.scrollLeft = 0;
    raw.href = url.href;
    raw.hidden = false;
    copy.disabled = next.disabled = false;
    status.textContent = `${path} · ${text.split("\n").length.toLocaleString()} 行 · ${file.size.toLocaleString()} bytes`;
    history.replaceState(null, "", `#file=${encodeURIComponent(path)}`);
  } catch (error) {
    if (id === request)
      status.textContent = `読み込めませんでした。${error.message}。GitHubからも確認できます。`;
  }
}

fileSelect.addEventListener("change", () => loadFile(fileSelect.value));
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("query").value;
  if (!query) return;
  if (query !== lastQuery) searchAt = 0;
  lastQuery = query;
  let at = code.value.indexOf(query, searchAt);
  if (at < 0) at = code.value.indexOf(query);
  if (at < 0) {
    status.textContent = "一致する文字列はありません。";
    return;
  }
  searchAt = at + query.length;
  code.focus();
  code.setSelectionRange(at, at + query.length);
  const line = code.value.slice(0, at).split("\n").length;
  code.scrollTop = Math.max(
    0,
    (line - 4) * parseFloat(getComputedStyle(code).lineHeight),
  );
  status.textContent = `${line.toLocaleString()} 行目に見つかりました。`;
});
copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(code.value);
    status.textContent = "ソースコードをコピーしました。";
  } catch {
    code.focus();
    code.select();
    status.textContent =
      "コードを選択しました。Ctrl+C / ⌘C でコピーしてください。";
  }
});

async function initialize() {
  try {
    const response = await fetch("./source-files.json", {
      credentials: "omit",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    files = (await response.json()).files;
    fileSelect.replaceChildren();
    for (const file of files) {
      localUrl(file.path);
      const option = document.createElement("option");
      option.value = file.path;
      option.textContent = file.path.replace(
        /^[^/]+_files\//,
        "保存ファイル / ",
      );
      fileSelect.append(option);
    }
    fileSelect.disabled = false;
    const chosen = new URLSearchParams(location.hash.slice(1)).get("file");
    await loadFile(
      files.some((file) => file.path === chosen) ? chosen : "index.html",
    );
  } catch (error) {
    status.textContent = `ファイル一覧を読み込めませんでした。${error.message}。GitHubから確認してください。`;
  }
}
initialize();
