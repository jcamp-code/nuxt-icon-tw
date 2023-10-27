import nuxtIcon from '../src/module'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  typescript: { strict: true, includeWorkspace: true },
  icon: { prefix: '', customCollections: resolve('./custom.json') },
  modules: [nuxtIcon, '@nuxtjs/tailwindcss', '@nuxt/devtools'],
})
