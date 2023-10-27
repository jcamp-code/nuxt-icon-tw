import { defineNuxtPlugin } from '#app'
import { defu } from 'defu'
import type { TailwindIconsModuleOptions } from '../module'

export default defineNuxtPlugin((_nuxtApp) => {
  const options = useRuntimeConfig().public
    .tailwindIcons as TailwindIconsModuleOptions
  const appConfig = useAppConfig()

  appConfig.nuxtIcon = defu(appConfig.nuxtIcon, options)
})
