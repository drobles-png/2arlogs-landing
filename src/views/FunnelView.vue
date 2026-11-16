<script setup lang="ts">
// Landing (/) — estructura corta: hero · tres números · Ruta ARLOGS · quién habla.
// Recurso visual: los 3 paneles inclinados del logo (azul, índigo, naranja) y la hoja de costos.
// Cada botón que abre el registro lleva data-cta="registro" (lo usa el e2e).
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import RegistrationModal from '@/components/RegistrationModal.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import {
  IS_LOCAL,
  PERSON_NAME,
  STORAGE_PREFIX,
  VSL_POSTER,
  VSL_POSTER_FALLBACK,
} from '@/config/funnel'
import { LANDING } from '@/content/copy'
import { captureFbParams } from '@/utils/fbclid'

const route = useRoute()
const router = useRouter()
const modalOpen = ref(false)
const showSticky = ref(false)
const { example, route: ruta, about } = LANDING

// Portada del video: Cloudinary → archivo local → recuadro oscuro
const poster = ref(VSL_POSTER || VSL_POSTER_FALLBACK)
function onPosterError() {
  poster.value = poster.value !== VSL_POSTER_FALLBACK ? VSL_POSTER_FALLBACK : ''
}

function openModal() {
  // Quien no calificó hace menos de 24 h vuelve a /sin-espacio
  if (!IS_LOCAL) {
    const disqAt = Number(localStorage.getItem(`${STORAGE_PREFIX}_disq_at`))
    if (disqAt && Date.now() - disqAt < 24 * 60 * 60 * 1000) {
      router.push('/sin-espacio')
      return
    }
  }
  modalOpen.value = true
}

const onScroll = () => (showSticky.value = window.scrollY > 700)

// Aparición suave al hacer scroll
let observer: IntersectionObserver | undefined
onMounted(() => {
  captureFbParams()
  window.addEventListener('scroll', onScroll, { passive: true })
  if (route.query.editar) modalOpen.value = true

  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          observer?.unobserve(e.target)
        }
      }),
    { rootMargin: '0px 0px -10% 0px' },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <div class="landing">
    <header class="topbar">
      <div class="wrap topbar__inner">
        <BrandLogo />
        <CountdownTimer />
      </div>
    </header>

    <!-- 1 · HERO -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="panels panels--hero" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="wrap hero__grid">
        <div class="hero__copy">
          <h1 id="hero-title" class="hero__title">
            {{ LANDING.headline }}
            <span class="hero__accent">{{ LANDING.headlineAccent }}</span>
          </h1>
          <p class="hero__sub">{{ LANDING.sub }}</p>
          <div class="hero__cta">
            <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
              <i class="fa-solid fa-play" aria-hidden="true"></i> {{ LANDING.cta }}
            </button>
            <p class="hero__note">
              <i class="fa-solid fa-lock" aria-hidden="true"></i> {{ LANDING.ctaNote }}
            </p>
          </div>
        </div>

        <button type="button" class="vsl" data-cta="registro" aria-label="Ver el video completo" @click="openModal">
          <img
            v-if="poster"
            class="vsl__poster"
            :src="poster"
            alt=""
            width="1600"
            height="900"
            fetchpriority="high"
            decoding="async"
            @error="onPosterError"
          />
          <span class="vsl__play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
          <span class="vsl__caption">
            <strong>{{ PERSON_NAME }} · ARLOGS</strong>
            <span>{{ LANDING.videoCaption }}</span>
          </span>
        </button>
      </div>
    </section>

    <!-- 2 · TRES NÚMEROS -->
    <section class="numbers" aria-labelledby="numbers-title">
      <div class="wrap numbers__grid">
        <div class="numbers__copy reveal">
          <h2 id="numbers-title" class="numbers__title">{{ example.title }}</h2>
          <p class="numbers__lead">{{ example.lead }}</p>
        </div>
        <div class="sheet reveal" role="table" aria-label="Costo de 20 paneles de escalada">
          <div
            v-for="r in example.rows"
            :key="r.label"
            class="sheet__row"
            :class="{ 'sheet__row--key': r.key }"
            role="row"
          >
            <span class="sheet__label" role="cell">
              <strong>{{ r.label }}</strong>
              <small>{{ r.note }}</small>
            </span>
            <span class="sheet__dots" aria-hidden="true"></span>
            <span class="sheet__value" role="cell">{{ r.value }}</span>
          </div>
          <p class="sheet__outro">{{ example.outro }}</p>
        </div>
      </div>
    </section>

    <!-- 3 · LA RUTA ARLOGS -->
    <section class="ruta" aria-labelledby="ruta-title">
      <div class="wrap">
        <div class="ruta__head reveal">
          <h2 id="ruta-title" class="ruta__title">{{ ruta.title }}</h2>
          <p class="ruta__lead">{{ ruta.lead }}</p>
        </div>
        <ol class="ruta__list" role="list">
          <li v-for="(s, i) in ruta.items" :key="s.title" class="stop reveal" :class="`stop--${i + 1}`">
            <span class="stop__marker" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="stop__code">{{ s.code }}</span>
            <h3 class="stop__title">{{ s.title }}</h3>
            <p class="stop__text">{{ s.text }}</p>
            <span v-if="s.tag" class="stop__tag">{{ s.tag }}</span>
          </li>
        </ol>
        <div class="ruta__cta reveal">
          <button type="button" class="btn btn--lg" data-cta="registro" @click="openModal">
            {{ ruta.cta }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- 4 · QUIÉN HABLA -->
    <section class="about" aria-labelledby="about-title">
      <div class="wrap about__grid">
        <figure class="about__photo reveal">
          <div class="panels panels--photo" aria-hidden="true"><i></i><i></i><i></i></div>
          <img src="/angel.webp" :alt="PERSON_NAME" width="800" height="958" loading="lazy" decoding="async" />
          <figcaption>{{ PERSON_NAME }} · ARLOGS</figcaption>
        </figure>

        <div class="about__copy">
          <h2 id="about-title" class="about__title reveal">{{ about.title }}</h2>
          <p class="about__lead reveal">{{ about.lead }}</p>
          <blockquote class="about__quote reveal">“{{ about.quote }}”</blockquote>

          <dl class="figures reveal">
            <div v-for="f in about.figures" :key="f.value" class="figures__item">
              <dt>{{ f.value }}</dt>
              <dd>{{ f.label }}</dd>
            </div>
          </dl>
        </div>

        <div class="about__fit reveal">
          <h3 class="about__fit-title">{{ about.fitTitle }}</h3>
          <ul role="list">
            <li v-for="f in about.fit" :key="f">
              <i class="fa-solid fa-check" aria-hidden="true"></i><span>{{ f }}</span>
            </li>
          </ul>
          <button type="button" class="btn btn--lg btn--block" data-cta="registro" @click="openModal">
            <i class="fa-solid fa-play" aria-hidden="true"></i> {{ about.cta }}
          </button>
        </div>
      </div>

      <div class="cargo" aria-label="Lo que hemos traído">
        <div class="cargo__track">
          <span v-for="(c, i) in [...about.cargo, ...about.cargo]" :key="i" :aria-hidden="i >= about.cargo.length">
            {{ c }}
          </span>
        </div>
      </div>
    </section>

    <SiteFooter :disclaimer="LANDING.disclaimer" />

    <!-- CTA fijo en celular -->
    <Transition name="sticky">
      <div v-if="showSticky && !modalOpen" class="sticky" role="region" aria-label="Ver el video">
        <div class="sticky__copy">
          <strong>{{ LANDING.sticky.title }}</strong>
          <span>{{ LANDING.sticky.sub }}</span>
        </div>
        <button type="button" class="btn" data-cta="registro" @click="openModal">
          {{ LANDING.sticky.cta }} <i class="fa-solid fa-play" aria-hidden="true"></i>
        </button>
      </div>
    </Transition>

    <RegistrationModal :open="modalOpen" @close="modalOpen = false" />
  </div>
</template>

<style scoped lang="scss">
// ── Paneles inclinados del logo (azul · índigo · naranja) ─────────────────────
.panels {
  position: absolute;
  display: flex;
  gap: 6px;
  transform: skewY(-8deg);
  pointer-events: none;

  i {
    display: block;
    flex: 1;
  }
  i:nth-child(1) {
    background: $blue;
  }
  i:nth-child(2) {
    background: $indigo;
  }
  i:nth-child(3) {
    background: $orange;
  }

  &--hero {
    top: 64px;
    right: -40px;
    width: 220px;
    height: 120px;
    opacity: 0.14;

    @media (max-width: 899px) {
      display: none;
    }
  }

  &--photo {
    right: -14px;
    bottom: -18px;
    width: 38%;
    height: 34%;
    z-index: 0;
  }
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid $line;
  background: rgba($surface, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 64px;
  }
}

// ── 1 · Hero ──────────────────────────────────────────────────────────────────
.hero {
  position: relative;
  padding: 36px 0 64px;
  overflow: hidden;

  &__grid {
    display: grid;
    gap: 28px;

    @media (min-width: 900px) {
      grid-template-columns: 1fr 1.08fr;
      align-items: center;
      gap: 48px;
      padding-top: 24px;
    }
  }

  &__title {
    font-size: clamp(2.6rem, 11vw, 4.6rem);
    color: $ink;
  }

  &__accent {
    display: block;
    color: $primary;
  }

  &__sub {
    max-width: 520px;
    margin: 18px 0 26px;
    color: $ink-muted;
    font-size: 1.05rem;
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  &__note {
    color: $ink-muted;
    font-size: 0.85rem;
  }

  // En celular el video va entre el título y el texto
  @media (max-width: 899px) {
    &__copy {
      display: contents;
    }
    &__title {
      order: 1;
    }
    .vsl {
      order: 2;
    }
    &__sub {
      order: 3;
      margin: 0;
    }
    &__cta {
      order: 4;
      align-items: stretch;
      text-align: center;

      .btn {
        width: 100%;
      }
    }
    &__note {
      align-self: center;
    }
  }
}

.vsl {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 0;
  border: 0;
  border-radius: $radius-lg;
  background: $surface-dark;
  color: $ink-on-dark;
  cursor: pointer;
  font: inherit;
  overflow: hidden;
  box-shadow:
    10px 10px 0 $orange,
    0 24px 48px rgba($surface-dark, 0.25);

  &__poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba($surface-dark, 0.85), transparent 55%);
  }

  &__play {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: $primary;
    color: $on-primary;
    font-size: 1.6rem;
    box-shadow: 0 0 0 10px rgba($orange, 0.25);
    transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
  }

  @media (hover: hover) {
    &:hover &__play {
      transform: scale(1.06);
    }
  }

  &__caption {
    position: absolute;
    z-index: 1;
    right: 16px;
    bottom: 14px;
    left: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: $ink-on-dark-muted;
    font-size: 0.8rem;
    text-align: left;

    strong {
      color: $ink-on-dark;
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      span {
        display: none;
      }
    }
  }
}

// ── 2 · Tres números (hoja de costos) ─────────────────────────────────────────
.numbers {
  padding: 72px 0;
  background: $surface-dark;
  color: $ink-on-dark;

  &__grid {
    display: grid;
    gap: 32px;

    @media (min-width: 900px) {
      grid-template-columns: 0.8fr 1.2fr;
      align-items: center;
      gap: 64px;
    }
  }

  &__title {
    font-size: clamp(2.2rem, 8vw, 3.4rem);
  }

  &__lead {
    max-width: 420px;
    margin-top: 14px;
    color: $ink-on-dark-muted;
    font-size: 1.05rem;
  }
}

.sheet {
  padding: 8px 24px 20px;
  border-radius: $radius-lg;
  background: $surface;
  color: $ink;
  box-shadow: 10px 10px 0 $blue;

  &__row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    padding: 18px 0;
    border-bottom: 1px dashed $line;

    &--key {
      .sheet__value {
        color: $primary;
        font-size: clamp(1.7rem, 7vw, 2.3rem);
      }
    }
  }

  &__label {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 1rem;
    }
    small {
      color: $ink-muted;
      font-size: 0.8rem;
    }
  }

  &__dots {
    flex: 1;
    min-width: 12px;
    margin-bottom: 8px;
    border-bottom: 2px dotted rgba($ink, 0.25);
  }

  &__value {
    font-family: $font-mono;
    font-size: clamp(1.25rem, 5vw, 1.6rem);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  &__outro {
    margin-top: 16px;
    color: $ink-muted;
    font-size: 0.95rem;
  }
}

// ── 3 · Ruta ARLOGS ───────────────────────────────────────────────────────────
.ruta {
  padding: 80px 0;
  background: $raised;
  border-top: 1px solid $line;

  &__head {
    max-width: 640px;
  }

  &__title {
    font-size: clamp(2.4rem, 9vw, 4rem);
  }

  &__lead {
    margin-top: 14px;
    color: $ink-muted;
    font-size: 1.05rem;
  }

  &__list {
    position: relative;
    display: grid;
    gap: 36px;
    margin: 48px 0 0;
    padding: 0 0 0 64px;
    list-style: none;

    // La ruta: línea punteada que une las paradas
    &::before {
      content: '';
      position: absolute;
      top: 8px;
      bottom: 8px;
      left: 21px;
      border-left: 2px dashed rgba($ink, 0.3);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 28px;
      padding: 72px 0 0;

      &::before {
        top: 21px;
        right: 0;
        bottom: auto;
        left: 0;
        border-left: 0;
        border-top: 2px dashed rgba($ink, 0.3);
      }
    }
  }

  &__cta {
    margin-top: 48px;

    @media (max-width: 559px) {
      .btn {
        width: 100%;
      }
    }
  }
}

.stop {
  position: relative;

  &__marker {
    position: absolute;
    top: 0;
    left: -64px;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    color: #fff;
    font-family: $font-mono;
    font-size: 0.95rem;
    font-weight: 600;
    clip-path: polygon(14% 0, 100% 0, 86% 100%, 0 100%);

    @media (min-width: 900px) {
      top: -72px;
      left: 0;
    }
  }

  &--1 &__marker {
    background: $blue;
  }
  &--2 &__marker {
    background: $indigo;
  }
  &--3 &__marker {
    background: $orange;
  }
  &--4 &__marker {
    background: $surface-dark;
  }

  &__code {
    display: block;
    color: $ink-muted;
    font-family: $font-mono;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
  }

  &__title {
    margin: 4px 0 8px;
    font-size: 1.15rem;
  }

  &__text {
    color: $ink-muted;
    font-size: 0.95rem;
  }

  &__tag {
    display: inline-block;
    margin-top: 12px;
    padding: 4px 10px;
    border: 1px solid $primary;
    border-radius: $radius-sm;
    color: $primary;
    font-family: $font-mono;
    font-size: 0.85rem;
    font-weight: 600;
  }
}

// ── 4 · Quién habla ───────────────────────────────────────────────────────────
.about {
  padding: 80px 0 0;
  border-top: 1px solid $line;
  overflow: hidden;

  &__grid {
    display: grid;
    gap: 40px;

    @media (min-width: 900px) {
      grid-template-columns: 0.9fr 1.1fr;
      grid-template-areas:
        'photo copy'
        'fit copy';
      align-items: start;
      column-gap: 64px;
      row-gap: 40px;

      .about__photo {
        grid-area: photo;
      }
      .about__copy {
        grid-area: copy;
      }
      .about__fit {
        grid-area: fit;
      }
    }
  }

  &__photo {
    position: relative;
    margin: 0 14px 0 0;

    img {
      position: relative;
      z-index: 1;
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 800 / 958;
      object-fit: cover;
      border-radius: $radius-lg;
    }

    figcaption {
      position: relative;
      z-index: 1;
      margin-top: 10px;
      color: $ink-muted;
      font-family: $font-mono;
      font-size: 0.8rem;
    }
  }

  &__title {
    font-size: clamp(2.2rem, 8vw, 3.4rem);
  }

  &__lead {
    margin-top: 16px;
    color: $ink-muted;
    font-size: 1.05rem;
  }

  &__quote {
    margin: 28px 0;

    // Marca de los paneles del logo en vez de borde lateral
    &::before {
      content: '';
      display: block;
      width: 36px;
      height: 14px;
      margin-bottom: 12px;
      background: linear-gradient(90deg, $blue 0 33%, $indigo 33% 66%, $orange 66%);
      clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
    }
    font-size: clamp(1.15rem, 4vw, 1.35rem);
    font-weight: 600;
    line-height: 1.4;
  }

  &__fit {
    padding: 28px 24px;
    border: 1px solid $line;
    border-radius: $radius-lg;
    background: $raised;

    ul {
      display: grid;
      gap: 12px;
      margin: 14px 0 24px;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      gap: 12px;
      font-size: 0.95rem;
    }

    i {
      flex: none;
      margin-top: 4px;
      color: $primary;
    }
  }

  &__fit-title {
    font-size: 1.15rem;
  }
}

.figures {
  display: grid;
  margin: 0;
  border-top: 1px solid $line;

  &__item {
    display: grid;
    grid-template-columns: minmax(118px, auto) 1fr;
    gap: 16px;
    align-items: baseline;
    padding: 16px 0;
    border-bottom: 1px solid $line;
  }

  dt {
    color: $ink;
    font-family: $font-mono;
    font-size: 1.35rem;
    font-weight: 600;
    white-space: nowrap;
  }

  dd {
    margin: 0;
    color: $ink-muted;
    font-size: 0.9rem;
  }
}

// Cinta de carga: lo que han traído
.cargo {
  margin-top: 72px;
  padding: 18px 0;
  background: $surface-dark;
  overflow: hidden;

  &__track {
    display: flex;
    width: max-content;
    animation: cargo 40s linear infinite;

    span {
      display: inline-flex;
      align-items: center;
      gap: 24px;
      padding-right: 24px;
      color: $ink-on-dark;
      font-family: $font-display;
      font-size: 1.15rem;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      white-space: nowrap;

      &::after {
        content: '';
        width: 12px;
        height: 12px;
        background: $orange;
        clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &__track {
      flex-wrap: wrap;
      width: auto;
      padding: 0 16px;
      animation: none;

      span[aria-hidden='true'] {
        display: none;
      }
    }
  }
}

@keyframes cargo {
  to {
    transform: translateX(-50%);
  }
}

// ── Aparición al hacer scroll ─────────────────────────────────────────────────
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.5s ease,
    transform 0.5s cubic-bezier(0.2, 0, 0, 1);

  &.is-in {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
}

// ── CTA fijo ──────────────────────────────────────────────────────────────────
.sticky {
  position: fixed;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom));
  left: 12px;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 10px 10px 16px;
  border-radius: $radius-md;
  background: $surface-dark;
  box-shadow: $shadow-modal;

  &__copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
    color: $ink-on-dark-muted;
    font-size: 0.8rem;

    strong {
      overflow: hidden;
      color: $ink-on-dark;
      font-size: 0.9rem;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .btn {
    flex: none;
  }

  @media (min-width: 900px) {
    right: auto;
    left: 50%;
    width: 560px;
    transform: translateX(-50%);
  }
}

.sticky-enter-active,
.sticky-leave-active {
  transition:
    opacity 0.2s ease,
    translate 0.2s ease;
}
.sticky-enter-from,
.sticky-leave-to {
  opacity: 0;
  translate: 0 12px;
}
</style>
