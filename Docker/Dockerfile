FROM node:20.3.0

WORKDIR /app

# プロジェクトのファイルをコピー
COPY ./app/package.json ./app/package-lock.json ./

# nextのグローバルインストールを追加
RUN npm install -g next

RUN npm ci

# アプリケーションのソースコードをコピー
COPY ./app .

# ビルドコマンドの実行
RUN npm run build

# ポートのエクスポート
EXPOSE 3000

# アプリケーションの起動
CMD ["npm", "run", "start"]
