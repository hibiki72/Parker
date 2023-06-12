FROM node:20.3.0

WORKDIR /trpc-project

# プロジェクトのファイルをコピー
COPY ./trpc-project/package.json ./trpc-project/package-lock.json ./

# nextのグローバルインストールを追加
RUN npm install -g next

RUN npm ci

# アプリケーションのソースコードをコピー
COPY ./trpc-project .

# ビルドコマンドの実行
RUN npm run build

# ポートのエクスポート
EXPOSE 3000

# アプリケーションの起動
CMD ["npm", "run", "start"]
