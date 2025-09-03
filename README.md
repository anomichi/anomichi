# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## Anomichi

### 走行ルート用のデータ作成手順

1. 走行ルートのgeojsonを生成
  - SVGでアニメーションさせる用
1. 地図画像を生成
  - 背景画像として使う用。軽量化のために静止画にしている。

いまはこうやっている。

#### 走行ルートのgeojsonを生成

1. [Google My Maps](https://mymaps.google.com/)で、スタートからゴールへのルートのラインを引く
1. KML / KMZ にエクスポートから、上記で作成したルートを選択して、KMLでダウンロード
1. [geojson.io](https://geojson.io/) にKMLファイルをドラッグ・アンド・ドロップ
1. GeoJSON形式でダウンロード
1. *.jsonにリネームして、srcフォルダに保存

#### 地図画像を生成

mapboxの[Static Images API](https://docs.mapbox.com/api/ja/maps/static-images/)を利用している。

1. 緯度経度とズームレベルを[geojson.io](https://geojson.io/)のURLから取得
  - KMLファイルを貼り付けたときに、このようなURLになる。 https://geojson.io/#map=9/35.4893/139.2425 調整しても問題ない
1. URLを生成する
  - 形式: `https://api.mapbox.com/styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}|{bbox}|{auto}/{width}x{height}{@2x}`
  - 例: https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/139.2425,35.4893,9/1000x800?access_token=YOUR_ACCESS_TOKEN
1. 生成したURLの画像をsrcフォルダに保存
