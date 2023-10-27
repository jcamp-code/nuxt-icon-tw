![nuxt-icon-tw](https://github.com/jcamp-code/nuxt-icon-tw/assets/1094820/de9c24f9-735f-4975-8b1b-5d1766412760)

# Nuxt Icon Tailwind

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Add [100,000+ ready to use icons](https://icones.js.org) to your [Nuxt](https://nuxt.com) application, based on [Iconify](https://iconify.design).

Uses [Tailwind CSS Icons](https://github.com/egoist/tailwindcss-icons) to load locally rather than via API calls for each icon

Can add custom collections from JSON files in addition to locally installed Iconify packages

Falls back to API calls for collections not loaded loccally

## Features ✨

- **Tailwind CSS Icons via Iconify JSON packages**
- Custom local IconCollection JSON files
- Nuxt 3 ready
- Support 100,000 open source vector icons via [Iconify](https://iconify.design)
- Emoji Support
- Custom SVG support (via Vue component)

## Setup ⛓️

Add `nuxt-icon-tw` dependency to your project (it does require Tailwind of course):

```bash
# npm
npm install --save-dev nuxt-icon-tw @nuxtjs/tailwindcss

# Using yarn
yarn add --dev nuxt-icon-tw @nuxtjs/tailwindcss
```

Add it to the `modules` array in your `nuxt.config.ts`:

```ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-icon-tw', '@nuxtjs/tailwindcss'],
})
```

Install any Iconify JSON packages you want to use via Tailwind CSS:

```bash
npm install --save-dev @iconify-json/mdi

# Using yarn
yarn add --dev @iconify-jsom/mdi
```

These will be picked up automatically by the Tailwind CSS plugin.

`<Icon />` will use Tailwind to load any icons starting with `i-prefix` ie `i-mdi-home`.
If you use `i-other-icon` and it is a set not installed locally, the icon will fallback to Iconify API SVG loading

Any icons using a `:` divider (ie `i-mdi:home` or `mdi:home`) will remain Iconify SVG since Tailwind does not allow : in classes.

This allows for NuxtIconTw to be a drop in replacement for NuxtIcon if you want to add Tailwind Icons to an existing project (incidentally, this is why I created this)

That's it, you can now use the `<Icon />` in your components!

✨ If you are using VS Code, you can use the [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) extension by [@antfu](https://github.com/antfu)

## Usage 👌

**Props:**

- `name` (required): icon name, emoji or global component name
- `size`: icon size (default: `1em`)

**Attributes**:

When using an icon from Iconify, an `<svg>` will be created, you can give [all the attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute) of the native element.

```html
<Icon name="uil:github" color="black" />
```

**Other Components:**:

- `<Icon />` - Automatically set to Tailwind or Iconify SVG based on loaded collections
- `<IconTw />` - Only creates icon by Tailwind - if the name specified is not loaded, it will be blank
- `<IconSvg />` - Only creates icon by Iconify Svg - but custom files will not work here

### Iconify dataset

You can use any name from the https://icones.js.org collection:

```html
<Icon name="uil:github" />
```

It supports the `i-` prefix (for example `i-uil-github`).

### Custom Icon Collections

You can specify locations of custom icon JSON files to have them included in the Tailwind CSS:

```js
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  icon: {
    customCollections: resolve('./custom.json'),
  },
  modules: ['nuxt-icon-tw', '@nuxtjs/tailwindcss'],
})
```

### Emoji

```html
<Icon name="🚀" />
```

### Vue component

```html
<Icon name="NuxtIcon" />
```

Note that `NuxtIcon` needs to be inside `components/global/` folder (see [example](https://github.com/nuxt-modules/icon/blob/main/playground/components/global/NuxtIcon.vue)).

## Tailwind Icons Configuration

### Prefix

You can specify what prefix you want to use on Tailwind Icons classes. This defaults to `i` for backwards compatibility with other Tailwind Icons plugins.
However, it can be set empty (`''`) to not require a prefix at all.

### Collections

Specify the Iconify sets you wish to include

- `string[]`:

  ```js
  export default defineNuxtConfig({
    icon: {
      collections: ['mdi', 'ph'],
    },
    modules: ['nuxt-icon-tw', '@nuxtjs/tailwindcss'],
  })
  ```

- `[]`: turn off automated resolution altogether
- `'all'`: specifically opt in to loading the full Iconify JSON; warning: can be slow

- `IconCollection`: entirely override the automation

  ```js
  export default defineNuxtConfig({
    icon: {
      collections: {
        foo: {
          icons: {
            'arrow-left': {
              body: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>',
              width: 20,
              height: 20,
            },
          },
        },
      },
    },
    modules: ['nuxt-icon-tw', '@nuxtjs/tailwindcss'],
  })
  ```

### Force Tailwind

If you should want to only allow Tailwind Icons and no Iconify API icons at all, set this to true.

```js
export default defineNuxtConfig({
  icon: {
    forceTailwind: true,
  },
  modules: ['nuxt-icon-tw', '@nuxtjs/tailwindcss'],
})
```

## Configuration ⚙️

To update the default size (`1em`) of the `<Icon />`, create an `app.config.ts` with the `nuxtIcon.size` property.

Update the default class (`.icon`) of the `<Icon />` with the `nuxtIcon.class` property, for a headless Icon, simply set `nuxtIcon.class: ''`.

You can also define aliases to make swapping out icons easier by leveraging the `nuxtIcon.aliases` property.

```ts
// app.config.ts
export default defineAppConfig({
  nuxtIcon: {
    size: '24px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    aliases: {
      nuxt: 'logos:nuxt-icon',
    },
  },
})
```

The icons will have the default size of `24px` and the `nuxt` icon will be available:

```html
<Icon name="nuxt" />
```

By default, this module will fetch the Icons from [the official Iconify API](https://api.iconify.design). You can change this behavior by setting the `nuxtIcon.iconifyApiOptions.url` property to [your own Iconify API](https://iconify.design/docs/api/hosting.html).

You can also set `nuxtIcon.iconifyApiOptions.publicApiFallback` to `true` to use the public API as a fallback (only for the `<Icon>` component, not for the `<IconCSS>` component`)

```ts
// app.config.ts
export default defineAppConfig({
  nuxtIcon: {
    // ...
    iconifyApiOptions: {
      url: 'https://<your-api-url>',
      publicApiFallback: true, // default: false
    },
  },
})
```

## Render Function

You can use the `Icon` component in a render function (useful if you create a functional component), for this you can import it from `#components`:

```ts
import { Icon } from '#components'
```

See an example of a `<MyIcon>` component:

```vue
<script setup>
import { Icon } from '#components'

const MyIcon = h(Icon, { name: 'uil:twitter' })
</script>

<template>
  <p><MyIcon /></p>
</template>
```

## Contributing 🙏

1. Clone this repository
2. Install dependencies using `pnpm install` (install `pnpm` with `corepack enable`, [learn more](https://pnpm.io/installation#using-corepack))
3. Run `npm run dev:prepare` to generate type stubs.
4. Use `npm run dev` to start [playground](https://github.com/nuxt-modules/icon/tree/main/playground) in development mode.

## Credits 💌

- Original [Nuxt Icon](https://github.com/nuxt-modules/icon)
- [@egoist](https://github.com/egoist) for his [Tailwind CSS icons plugin](https://github.com/egoist/tailwindcss-icons)
- My [earlier attempt](https://github.com/jcamp-code/tailwindcss-plugin-icons) at a Tailwind Icons plugin (worked but slowly)
- [@benjamincanac](https://github.com/benjamincanac) for the initial version
- [@cyberalien](https://github.com/cyberalien) for making [Iconify](https://github.com/iconify/iconify)

## License 📎

[MIT License](https://github.com/jcamp-code/nuxt-icon-tw/blob/main/LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-icon-tw/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-icon-tw
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-icon-tw.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-icon-tw
[license-src]: https://img.shields.io/github/license/jcamp-code/nuxt-icon-tw.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/jcamp-code/nuxt-icon-tw/blob/main/LICENSE
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
