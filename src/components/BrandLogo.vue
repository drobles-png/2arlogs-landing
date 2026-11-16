<script setup lang="ts">
// Logo ARLOGS: los 3 paneles del logo (imagen) + wordmark en texto, legible en fondo claro u oscuro.
import mark from '@/assets/logos/arlog-mark.webp'
import { BRAND_NAME } from '@/config/funnel'

defineProps<{ light?: boolean }>()
</script>

<template>
  <span class="logo" :class="{ 'logo--light': light }" role="img" :aria-label="BRAND_NAME">
    <img class="logo__mark" :src="mark" alt="" width="46" height="28" />
    <span class="logo__text" aria-hidden="true">{{ BRAND_NAME }}</span>
  </span>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: $ink;

  &__mark {
    width: 46px;
    height: auto;
  }

  &__text {
    font-family: $font-display;
    font-size: 1.45rem;
    line-height: 1;
    letter-spacing: 0.02em;
  }

  &--light {
    color: $ink-on-dark;
  }
}
</style>
