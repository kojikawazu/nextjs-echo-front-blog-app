# マニュアル

## インストール

```bash
npm install jwt-decode
npm install --save-dev @types/jwt-decode
npm install axios react-markdown gray-matter
npm install node-fetch
npm install js-cookie
npm install --save-dev @types/js-cookie
npm install react-toastify
```

## ESLint

.eslintrc.json を修正すること。
その後、以下コマンドで静的解析をおこなうこと。

```bash
# 静的チェック
npm run lint
# コード修正
npm run lint -- --fix
```

## Prettier

prettier.config.js を修正すること。
その後、以下コマンドでコードを綺麗にする。

```bash
npm run format
```
