# Active-TK-Not-Todo-Archive

これはActive-TK氏のホームページのアーカイブでありliru55とは無関係です。

公開ページ: https://liru55.github.io/Active-TK-Not-Todo-Archive/

保存対象: ActiveTK's Note「Not todo: 技術者倫理がなければ作る予定だったもの一覧」

元ページ: https://note.activetk.jp/etc/uncensored-dev-list

保存HTMLに記録されたWayback MachineのURL:
https://web.archive.org/web/20261115000447/https://note.activetk.jp/etc/uncensored-dev-list

リポジトリ全体を単一ライセンスで配布するものではありません。
記事・画像などの再利用許諾は確認できておらず、このアーカイブはそれらの再利用権を付与しません。
第三者コードは各権利者の条件に従います。対象ごとの確認結果と未確認の範囲は
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)、原文は [LICENSES/](LICENSES/) にあります。
[LICENSE](LICENSE) のMITは、独自に追加した保守ツール・説明文書などの明示された範囲だけに適用します。

`.download` と `.min` を取り除き、拡張子のないJS/CSSにも通常の拡張子を付けています。
外部・インラインJavaScriptとCSSに改行とインデントを付けていますが、元の変数名や
圧縮前のソースを復元したものではありません。既存の著作権・ライセンスコメントは保持しています。
Google Analytics、Cloudflare Web Analytics、Internet Archiveのアクセス計測、広告、
Twitter/X埋め込み、User-Agentを外部送信するスクリプトを除去しています。
アーカイブ再生用の初期化も外し、CSPで外部への自動通信・iframeを禁止しています。
外部フォントなどは読み込まず、利用可能なフォントで表示します。通常の外部リンクは残っています。

[ソースコードViewer](https://liru55.github.io/Active-TK-Not-Todo-Archive/source-viewer.html)
ではファイル選択・文字列検索・コピーができます。表示するコードは実行しません。

整形の再実行:

```sh
npm ci --prefix tools/archive
node tools/archive/format.mjs
python tools/archive/remove-trackers.py
python tools/archive/build-source-index.py
```

整形前後のJavaScript構文木を比較してから保存します。比較時には位置・引用形式・
余分な空文・同じ演算子の論理式の括弧を正規化します。
記事本文のHTMLは整形せず、参照先とスクリプトの内容だけを更新します。
