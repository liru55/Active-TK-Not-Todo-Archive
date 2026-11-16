# 第三者コンテンツとライセンス

確認日: 2026-11-16。記事・画像・第三者コードの権利は各権利者に帰属します。
保存・公開・整形によってliru55に権利が移るものではありません。
ルートの `LICENSE` は第三者コンテンツには適用されません。
「未確認」は自由利用やパブリックドメインの宣言ではありません。

以下のファイル名は、特記のない限り
`Not todo_ 技術者倫理がなければ作る予定だったもの一覧 _ ActiveTK's Note_files/` 配下です。
バンドル内の一部品のライセンスを、バンドル全体には適用しません。

| 対象 | 条件・根拠 | 原文・ソースの参照 |
| --- | --- | --- |
| `index.html` の記事、サイト固有のHTML・CSS、`favicon.png` などの画像 | 原著作者の権利を保持。全体の再利用ライセンスは未確認 | [元ページ](https://note.activetk.jp/etc/uncensored-dev-list)。コードのMIT表記を記事へ拡張しない |
| `ActiveTK.js` | ActiveTK.js、ATK.Cookie.js等にMIT表記。内包するPlatform.js・jQuery系も個別の元表記を保持 | ファイル内の著作権・許諾コメント、[元の説明への参照](http://ActiveTK.CF/ActiveTK.JS/readme.txt)、`LICENSES/platformjs-1.3.6-MIT.txt`、`LICENSES/jquery-cookie-1.4.1-MIT.txt`。上流資料は照合用で、全バンドルの版特定ではない |
| `archive-today.blocker.js` | MIT、Copyright 2023 ActiveTK | ファイル内にMIT全文を保持 |
| `tailwind-3.4.3.js`（旧 `3.4.3`） | Tailwind CSS部分はMIT。その他の内包部品は各条件を保持 | [上流v3.4.3](https://github.com/tailwindlabs/tailwindcss/tree/v3.4.3)、`LICENSES/tailwindcss-3.4.3-MIT.txt` |
| `marked.js` | MIT、Marked v8.0.1 | ファイル内表記、`LICENSES/marked-8.0.1-MIT.md` |
| `highlight.js`、`googlecode.css` | 本体v11.6.0はBSD-3-Clause。テーマの保存ファイル単独には許諾表記なし | 本体ヘッダー、[上流](https://github.com/highlightjs/highlight.js/tree/11.6.0)、`LICENSES/highlightjs-11.6.0-BSD-3-Clause.txt` |
| `MathJax.js` | Apache-2.0、MathJax Consortium。正確な版・追加ロード部品は未特定 | 元ヘッダー、`LICENSES/Apache-2.0.txt`、[ソース](https://github.com/mathjax/MathJax) |
| `glightbox.js`、`glightbox.css` | 上流はMIT。保存物の正確な版は未特定 | [上流](https://github.com/biati-digital/glightbox)、`LICENSES/glightbox-MIT.txt` は取得時点の上流原文 |
| `gsap.js` | GSAP 3.12.2独自条件。MITではない | 元ヘッダーのCopyright 2023 GreenSock / All rights reserved、[Standard License](https://greensock.com/standard-license)・Club GreenSock契約への参照を保持。当時の全文・利用資格は未確認。現行条件を過去版へ自動適用しない |
| `all.css` | Font Awesome Free 6.3.0。コードMIT、アイコンCC-BY-4.0、フォントOFL-1.1 | 元ヘッダー、`LICENSES/fontawesome-6.3.0.txt`。区分ごとに該当素材へ適用 |
| `ruffle.js` | 上流はMIT OR Apache-2.0。保存バンドルの版・全依存物は未特定 | [ソース](https://github.com/ruffle-rs/ruffle)、`LICENSES/ruffle-MIT-OR-Apache-2.0.md` は取得時点の上流原文。全依存物への一括許諾ではない |
| `wombat.js` | AGPL-3.0-or-later。Webrecorder Software、Rhizome、contributors | 冒頭のversion 3 or any later version、`LICENSES/AGPL-3.0.txt`、[ソース](https://github.com/webrecorder/wombat) |
| `athena.js`、`bundle-playback.js` | ヘッダーにAGPL v3表記 | `@license`、`LICENSES/AGPL-3.0.txt`、[Internet Archiveソース](https://github.com/internetarchive/wayback)。一致するコミット・完全な対応ソースの特定は未完了 |
| `banner-styles.css`、`iconochive.css`、Wayback追加コード | Internet Archive / Webrecorder由来。各ファイル全体の許諾範囲は未確認 | 保存注記を保持。隣接JSのAGPLを根拠なくCSS・フォント等へ拡張しない |
| `widgets.js`、`widget_iframe.1227a5674072e080ffb1ba14ac0c1079.html` | Twitter/Xウィジェット全体の再利用許諾は未確認。内包es6-promise部分はMIT、iframe内buffer部分にもMIT表記 | 元ヘッダー、`LICENSES/es6-promise-MIT.txt`。一部品のMITを全体へ拡張しない |
| `google-tag.js`（旧 `js`） | Googleタグ全体の再利用許諾は未確認。Closure等の一部にApache-2.0、jQuery部分に個別表記 | 元コメントを保持、`LICENSES/Apache-2.0.txt`。Apacheを全体へ適用しない |
| `cloudflare-beacon.js`（旧 `vce701823e78c4301a35b7e07294d87301792088814092`） | Cloudflare Web Analyticsビーコン。全体の許諾は未確認 | コード中の配信先・識別子。オープンソースとは宣言しない |
| `v1.js` | コードにadring.netへの参照。再利用許諾は未確認 | 保存コード内の参照。独自にライセンスを付与しない |
| `menu-effect.js` | 作者・許諾範囲を確認できず | 旧名 `menu-effect.min.js.pagespeed.ce.dyRoWHj-SJ.js`、元のWayback注記を保持 |
| `google-fonts.css`、`google-fonts-2.css`、`google-fonts-3.css`（旧 `css`、`css2`、`css2(1)`） | Google FontsのCSS。各フォントの条件は別。保存CSSだけから許諾を確定しない | 元のフォント名・配信先を保持。外部取得フォントをルートのMITで許諾しない |
| インラインコード | 元ページ・Wayback・ウィジェット由来が混在。表記のない部分は未確認 | 元のコメントを保持。整形したことを理由にMITを付与しない |

## アーカイブでの変更

トップページへの改名、告知ヘッダーの追加、`.download`・`.min`の除去、通常の拡張子への変更、
参照更新、JavaScript/CSSの整形を行っています。変数名・ソースマップは復元していません。
元の著作権・ライセンスコメントは保持しています。
Git履歴と `tools/archive/format.mjs` で変更内容を確認できます。
元の保存物は最初のコミット `6a54af1` にも残っています。

AGPL対象の整形後コードは本リポジトリに公開しています。
上記参照は、完全なCorresponding Sourceやビルド手順の収集完了を意味しません。
許諾未確認の項目とバンドルの全依存物の確認は残っており、この文書は許諾取得や
すべての配布義務の充足を保証しません。

## ライセンス原文と保守ツール

`LICENSES/` に上流の原文、`LICENSES/sources.json` に取得URLとSHA-256を保存しています。
取得時点の上流ファイルを参考にした項目は上表に明記しています。
`tools/archive/fetch-licenses.py` で再取得できますが、上流の変更により結果が変わる場合があります。

保守ツールの開発依存物はPrettier 3.6.2（MIT）とAcorn 8.15.0（MIT）です。
版は `tools/archive/package-lock.json` で固定しています。各ライセンスはパッケージ内に含まれます。
`node_modules` は公開リポジトリには含めません。
