# React App for Shopify Store

## 🚀 Project Purpose
- To spin up a dev environment where a custom app can be integrated alongside Hydrogen and the Shopify Vite plugin.
- The React app serves as a template for exploring and manipulating Shopify data retrieved from GraphQL APIs
- This empowers devs to quickly prototype functionalities and gain insights into data structures and manipulation capabilities before diving into full-fledged application development

## 🏝️ App Features
![app featuers](/assets_readme/react_shopify_app_screen_1.jpg)

### Links:
 - [Video Demo](https://youtu.be/-xxTLYyh8go) 
 - [Preview Theme](https://vzine.myshopify.com/?_ab=0&_fd=0&_sc=1&key=abb25ec7632898eec68dd2f4a0205b280976da9fa4648578672a32c0f70e913b&preview_theme_id=134018531428)  `Store Password: 1234` 
 - [Code](https://github.com/victorw999/vite-shopify-react-hydrogen-theme-ToM2U-)

### ![React Shopify app](assets_readme/react_shopify_app_demo.gif)

## 🔨 Dev Environment:
- node version
    - `nvm use 18.12.1`
- open 3 dev terminals: 
    - vite, tailwindcss, shopify theme CLI
- vite server
    - `pnpm vite:dev `
        - spin up the vite preview environment. 
        - You don't actually need the Shopify CLI `shopify theme dev` to just preview your React app.
        - However, you will need the Shopify theme's preview link to access the preview.
- shopify theme CLI 
    - `shopify theme dev -s [shopname] -t [theme_id] --live-reload=full-page`
- tailwind
    - `pnpm watch-tailwind`
- [Build] Rebuild the assets/ folder, and the minified files (eg:xx.min.js) in it. (vite)
    - `pnpm build`
- [Deploy] push built assets files to shopify
    - `shopify theme push -s [shopname] -t [theme_id]`
- [Deploy issue] Deploy to shopify
    - Deploying `(pnpm build && shopify theme push...)` sometimes requires multiple attempts. During the initial builds, the preview link might still attempt to fetch assets from localhost:5173.
    [example issue](https://github.com/barrel/shopify-vite/issues/103)
- Clear Local Cache 
    - Refresh the "contacts" data in local cache
    - chrome inspector > Application > IndexedDB > localforage > keyvaluepairs

# Hydrogen Theme

[![Build status](https://github.com/montalvomiguelo/hydrogen-theme/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/montalvomiguelo/hydrogen-theme/actions/workflows/ci.yml?query=branch%3Amain)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/montalvomiguelo/hydrogen-theme/blob/main/LICENSE.md)

A port of Hydrogen's default template to Shopify OS 2.0.

![pika-1697163139924-1x](https://github.com/montalvomiguelo/hydrogen-theme/assets/5134470/d92f6135-62d8-4a7d-a612-c812c6652da1)

## 🔨 Requirements

- [Node.js (latest LTS version)](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Shopify CLI](https://shopify.dev/themes/tools/cli)

## 🚀 Project Structure

This theme leverages the [default Shopify theme folder structure](https://shopify.dev/themes/tools/github#repository-structure) and introduces the following directories, some of which have special behaviors.

```bash
└── hydrogen-theme
    └── frontend
        ├── entrypoints
        ├── islands
        ├── lib
        └── styles
```

| Subdirectory  | Description                           |
| :------------ | :------------------------------------ |
| `entrypoints` | The entry points for your theme       |
| `islands`     | The interactive islands in your theme |
| `lib`         | Theme specific libraries              |
| `styles`      | The styles of your theme              |

## 🧞 Commands

| Command                            | Action                                                                  |
| :--------------------------------- | :---------------------------------------------------------------------- |
| `pnpm install`                     | Installs dependencies                                                   |
| `pnpm dev --live-reload full-page` | Launch the Shopify and Vite servers in parallel                         |
| `pnpm run deploy`                  | Bundle your theme's assets and upload your local theme files to Shopify |

## 🏝️ Hydration Directives

The following hydration strategies are available (borrowed from [Astro](https://docs.astro.build/en/concepts/islands/)).

| Directive        | Description                                                                                                                                       |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `client:idle`    | Hydrate the component as soon as the main thread is [free](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)           |
| `client:visible` | Hydrates the component as soon as the element [enters the viewport](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)   |
| `client:media`   | Hydrates the component as soon as the browser [matches the given media query](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) |

Usage:

```html
<my-component client:visible>This is an island.</my-component>
```

## 🙇‍♂️ Thanks

We would like to specifically thank the following projects for the inspiration and help regarding the creation of hydrogen-theme:

- [vite-plugin-shopify](https://github.com/barrel/shopify-vite)
- [hydrogen](https://github.com/Shopify/hydrogen)
- [dawn](https://github.com/Shopify/dawn)
- [astro](https://github.com/withastro/astro)
