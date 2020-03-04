# nestjs-session-sandbox
## 手順 (正常)
- http://localhost:3000/url にアクセス
- 表示される URL にアクセス
- / にリダイレクトされれば OK

## 手順 (異常)
- http://localhost:3000/url にアクセス
- 表示される URL に **他のブラウから** アクセス
- /error にリダイレクトされれば OK
