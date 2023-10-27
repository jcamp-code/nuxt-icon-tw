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
  /**
   * Provide any icon files or collections you want to add to the automatically resolved Iconify sets
   * Can be either single or array of:
   *   string: resolved paths to icon files
   *   IconCollection: icon collection object
   */
  customCollections?: string | IconCollection | (IconCollection | string)[]
  /**
   * Specify the Iconify sets you wish to include
   * Can be:
   *   IconCollection: entirely override the automation
   *   CollectionNames[]: specify the sets to include (ie ['mdi', 'ph])
   *   []: turn off automated resolution altogether
   *   'all': specifically opt in to loading the full Iconify JSON; warning: can be slow
   */
  collections?: IconCollection | CollectionNames[] | 'all'
  /**
   * Used to return all the resolved Iconify and custom prefixes
   */
  resolvedPrefixes?: string[]
} & IconsOptions

export const iconsPlugin = (iconsPluginOptions?: IconsPluginOptions) => {
  const {
    collections: propsCollections,
    customCollections = {},
    scale = 1,
    prefix = 'i',
    extraProperties = {},
  } = iconsPluginOptions ?? {}

  const collections = defu(
    {} as IconCollection,
    getAutoIconCollections(propsCollections),
    getCustomCollections(customCollections)
  )

  const components: Record<string, Record<string, string>> = {}
  const twPrefixes: Record<
    string,
    (arg: string | Record<string, string>) => Record<string, string>
  > = {}

  const collectionPrefixes = [] as string[]

  for (const colPrefix of Object.keys(collections)) {
    collectionPrefixes.push(prefix ? `${prefix}-${colPrefix}` : `${colPrefix}`)
    const collection: IconifyJSONIconsData = {
      ...collections[colPrefix],
      prefix: colPrefix,
    }
    parseIconSet(collection, (name, data) => {
      if (!data) return
      const key = prefix ? `${colPrefix}-${name}` : `${name}`
      components[key] = generateIconComponent(data, {
        scale,
        extraProperties,
      })
    })
    if (!prefix) {
      twPrefixes[colPrefix] = (value: string | Record<string, string>) => {
        if (typeof value === 'string') return components[value]
        return value
      }
    }
  }

  if (iconsPluginOptions)
    iconsPluginOptions.resolvedPrefixes = collectionPrefixes

  const noPrefixPlugin = plugin(({ matchComponents }) => {
    matchComponents(twPrefixes, {
      values: components,
    })
  })

  const prefixPlugin = plugin(({ matchComponents }) => {
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

  return prefix ? prefixPlugin : noPrefixPlugin
}
