import { defineNuxtPlugin } from '#app'
import { defu } from 'defu'
import type { TailwindIconsModuleOptions } from '../module'

// copy the runtime config to appconfig
export default defineNuxtPlugin((_nuxtApp) => {
  const options = useRuntimeConfig().public
    .tailwindIcons as TailwindIconsModuleOptions

  const appConfig = useAppConfig()

  // appConfig overrides module settings in nuxt config, except for resolvedPrefixes
  appConfig.nuxtIcon = defu(options, appConfig.nuxtIcon) as any
  appConfig.nuxtIcon.resolvedPrefixes = options?.resolvedPrefixes
})
