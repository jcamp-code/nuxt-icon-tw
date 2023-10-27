import type { IconifyJSONIconsData } from '@iconify/types'
import plugin from 'tailwindcss/plugin.js'
import { parseIconSet } from '@iconify/utils'
import {
  generateIconComponent,
  getIconCollections,
  getAutoIconCollections,
  getCustomCollections,
} from './core'
import { type CollectionNames } from '../types'
import { type Optional } from './utils'
import type { IconsOptions } from './types'
import { defu } from 'defu'

export { getIconCollections, type CollectionNames }

export type IconCollection = Record<
  string,
  Optional<IconifyJSONIconsData, 'prefix'>
>

export type IconsPluginOptions = {
  customCollections?: string | IconCollection | (IconCollection | string)[]
  collections?: IconCollection | CollectionNames[]
  resolvedPrefixes?: string[]
  includeAllCollections?: boolean
  /**
   * auto - installed packages, but not all, then add anything in customCollections
   * all - global json packages, then add customCollections packages (note this can be slow)
   * none - Iconify collections specified in collections and anything in customCollectinos
   *
   * declaring collections will override any auto behavior, like original behavior
   *
   * @default `auto`
   *
   */
} & IconsOptions

export const iconsPlugin = (iconsPluginOptions?: IconsPluginOptions) => {
  const {
    collections: propsCollections,
    customCollections = {},
    includeAllCollections = false,
    scale = 1,
    prefix = 'i',
    extraProperties = {},
  } = iconsPluginOptions ?? {}

  const collections = defu(
    {} as IconCollection,
    getAutoIconCollections(propsCollections, includeAllCollections),
    getCustomCollections(customCollections)
  )

  const components: Record<string, Record<string, string>> = {}
  const twPrefixes: Record<
    string,
    (arg: string | Record<string, string>) => Record<string, string>
  > = {}

  const collectionPrefixes = [] as string[]

  for (const prefix of Object.keys(collections)) {
    collectionPrefixes.push(prefix)
    const collection: IconifyJSONIconsData = {
      ...collections[prefix],
      prefix,
    }
    parseIconSet(collection, (name, data) => {
      if (!data) return
      // components[`${prefix}-${name}`] = generateIconComponent(data, {
      components[`${name}`] = generateIconComponent(data, {
        scale,
        extraProperties,
      })
    })
    twPrefixes[prefix] = (value: string | Record<string, string>) => {
      if (typeof value === 'string') return components[value]
      return value
    }
  }

  if (iconsPluginOptions)
    iconsPluginOptions.resolvedPrefixes = collectionPrefixes

  const newPlugin = plugin(({ matchComponents }) => {
    matchComponents(twPrefixes, {
      values: components,
    })
  })

  const original = plugin(({ matchComponents }) => {
    matchComponents(
      {
        [prefix]: (value) => {
          if (typeof value === 'string') return components[value]
          return value
        },
      },
      {
        values: components,
      }
    )
  })

  return newPlugin
}
