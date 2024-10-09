# マニュアル

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
