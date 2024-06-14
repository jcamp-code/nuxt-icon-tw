import {
  defineNuxtModule,
  createResolver,
  addComponent,
  addPlugin,
  addTemplate,
} from '@nuxt/kit'
import type { Config as TailwindConfig } from 'tailwindcss'
import {
  iconsPlugin,
  getIconCollections,
  type IconsPluginOptions,
} from './runtime/tailwindcss-icons'
import { defu } from 'defu'
import type { NuxtOptions } from 'nuxt/schema'

export type TailwindIconsModuleOptions = {
  /**
   * Only allow tailwind generated icons; do not use icones API to retrieve them
   *
   * @default false
   */
  tailwindOnly?: boolean
  resolvedPrefixes?: string[]
} & IconsPluginOptions

export interface ModuleOptions {}

// Learn how to create a Nuxt module on https://nuxt.com/docs/guide/going-further/modules/
export default defineNuxtModule<TailwindIconsModuleOptions>({
  meta: {
    name: 'nuxt-icon-tw',
    configKey: 'icon',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    tailwindOnly: false,
    resolvedPrefixes: [],
    prefix: 'i',
    scale: 1,
  } as TailwindIconsModuleOptions,
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const twConfigTemplate = addTemplate({
      filename: 'nuxt-icon-tw-plugin-config.ts',
      write: true,
      getContents: () => `
        import { iconsPlugin } from ${JSON.stringify(resolve('./runtime/tailwindcss-icons'))}
        export default { plugins: [iconsPlugin(${JSON.stringify(options)})] }
      `
    })

    nuxt.options.tailwindcss = nuxt.options.tailwindcss ?? {} as NuxtOptions['tailwindcss'];
    if (!Array.isArray(nuxt.options.tailwindcss?.configPath)) {
      nuxt.options.tailwindcss!.configPath = [nuxt.options.tailwindcss?.configPath || 'tailwind.config']
    }
    (nuxt.options.tailwindcss!.configPath as string[]).unshift(twConfigTemplate.dst)

    // setup collections here from config
    nuxt.options.runtimeConfig.public.tailwindIcons = defu(
      nuxt.options.runtimeConfig.public.tailwindIcons as any,
      options
    )

    // Define types for the app.config compatible with Nuxt Studio
    nuxt.hook('schema:extend', (schemas) => {
      schemas.push({
        appConfig: {
          nuxtIcon: {
            $schema: {
              title: 'Nuxt Icon',
              description: 'Configure the defaults of Nuxt Icon',
            },
            size: {
              $default: '1em',
              $schema: {
                title: 'Icon Size',
                description:
                  'Set the default icon size. Set to false to disable the sizing of icon in style.',
                tags: ['@studioIcon material-symbols:format-size-rounded'],
                tsType: 'string | false',
              },
            },
            class: {
              $default: '',
              $schema: {
                title: 'CSS Class',
                description: 'Set the default CSS class',
                tags: ['@studioIcon material-symbols:css'],
              },
            },
            aliases: {
              $default: {},
              $schema: {
                title: 'Icon aliases',
                description:
                  'Define Icon aliases to update them easily without code changes.',
                tags: [
                  '@studioIcon material-symbols:star-rounded',
                  '@studioInputObjectValueType icon',
                ],
                tsType: '{ [alias: string]: string }',
              },
            },
            iconifyApiOptions: {
              url: {
                $default: 'https://api.iconify.design',
                $schema: {
                  title: 'Iconify API URL',
                  description:
                    'Define a custom Iconify API URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api/',
                },
              },
              publicApiFallback: {
                $default: false,
                $schema: {
                  title: 'Public Iconify API fallback',
                  description:
                    'Define, if the public Iconify API should be used as fallback if the .',
                },
              },
            },
            prefix: {
              $default: 'i',
              $schema: {
                title: 'Tailwind Class Prefix',
                description:
                  'Set the Tailwind class prefix; leave bank or null to not use a prefix',
              },
            },
            resolvedPrefixes: {
              $default: [],
              $schema: {
                title: 'Resolved Prefixes',
                description: 'All of the icon collections loaded by Tailwind.',
                tsType: 'string[]',
              },
            },
          },
        },
      })
    })

    addComponent({
      name: 'Icon',
      global: true,
      filePath: resolve('./runtime/Icon.vue'),
      priority: 10,
    })
    addComponent({
      name: 'IconSvg',
      global: true,
      filePath: resolve('./runtime/IconSvg.vue'),
    })
    addComponent({
      name: 'IconTw',
      global: true,
      filePath: resolve('./runtime/IconTw.vue'),
    })

    addPlugin(resolve('./runtime/plugin'))

    nuxt.hook('devtools:customTabs', (iframeTabs) => {
      iframeTabs.push({
        name: 'icones',
        title: 'Icônes',
        icon: 'i-arcticons-iconeration',
        view: {
          type: 'iframe',
          src: 'https://icones.js.org',
        },
      })
    })
  },
})
