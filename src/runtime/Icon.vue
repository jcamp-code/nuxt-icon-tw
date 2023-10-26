<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'

const props = defineProps<{
  icon?: string
  name?: string
  tw?: boolean
}>()

const appConfig = useAppConfig() as {
  nuxtIcon: {
    size?: string
    class?: string
    aliases?: Record<string, string>
    forceTailwind?: boolean
    tailwindSets: string[]
  }
}

const iconName = computed(() => {
  const name = props.icon || props.name || ''
  if (appConfig.nuxtIcon?.aliases && appConfig.nuxtIcon.aliases[name]) {
    return appConfig.nuxtIcon.aliases[name]
  }

  return name
})

// this is tricky as class names have to be scanned by tailwind, so we can't rewrite
const useTwIcon = computed(() => {
  if (props.tw || appConfig.nuxtIcon?.forceTailwind) return true

  // this just looks like a class
  if (iconName.value.startsWith('i-')) return true

  // would like to add this but needs a custom version of the plugin
  // if (iconName.value.startsWith('tw-')) return true

  // tailwind can't use : in classes
  if (iconName.value.includes(':')) return false

  // will require custom version of tw icons
  // Nuxt Icon doesn't support a slash as a collection/name split
  // if (iconName.value.includes('/')) {
  //  return true
  // }

  // tailwind requires the json locally so force specified collections
  if (
    appConfig.nuxtIcon?.tailwindSets?.find((element) => {
      return iconName.value.startsWith('i-' + element)
    })
  )
    return true

  // will require custom version of tw icons
  // a format I used in an earlier tool I built
  // https://github.com/jcamp-code/tailwindcss-plugin-icons
  // if (iconName.value.match(/^i-\[.*\]$/)) return true

  return false
})
</script>

<template>
  <IconTw v-if="useTwIcon" :name="iconName" />
  <IconSvg v-else :name="iconName!">
    <template #default>
      <slot />
    </template>
  </IconSvg>
</template>
