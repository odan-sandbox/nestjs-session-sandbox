# nestjs-session-sandbox
## セットアップ
```bash
$ yarn
$ yarn dev
```

## 手順
### 正常
- http://localhost:3000/url にアクセス
- 表示される URL にアクセス
- / にリダイレクトされれば OK

### 異常
- http://localhost:3000/url にアクセス
- 表示される URL に **他のブラウから** アクセス
- /error にリダイレクトされれば OK
