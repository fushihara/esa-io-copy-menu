# これは？

esa.io PC版のドロップダウンメニューに、タイトル・URLを個別にコピーする機能を追加します。

<img src="./readme-img/imgTemp-2020-08-30-04-00-28.png">

# 使い方？

ビルド環境は以下の通り。
- windows 10 、nodejs v14.8

実行環境は以下の通り
- google chrome win 、 Tampermonkey 

ビルドコマンドは以下の通り

- npm ci
- npx webpack

以下の場所にファイルが出来ます

- ./out/main.js

Tampermonkeyに以下のコマンドを登録。各種パラメータは環境に応じて書き換え。

```
// ==UserScript==
// @name         esa.io util
// @require      file:///C:/xxx/out/main.js
// @match        https://xxxx.esa.io/posts/*
// @noframes
// ==/UserScript==
```
