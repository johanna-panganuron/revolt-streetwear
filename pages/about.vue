<template>
  <main class="bg-dark min-h-screen pt-24">
    <!-- Hero -->
    <section class="relative py-24 overflow-hidden border-b border-white/10">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p class="font-display text-[20vw] text-white/[0.025] tracking-widest">Revolt</p>
      </div>
      <div class="relative max-w-screen-xl mx-auto px-6">
        <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-4">Our Story</p>
        <h1 class="font-display text-6xl md:text-9xl tracking-widest text-white mb-0 leading-none">ABOUT</h1>
        <h1 class="font-display text-6xl md:text-9xl tracking-widest text-stroke leading-none">Revolt</h1>
      </div>
    </section>

    <!-- Story section -->
    <section class="max-w-screen-xl mx-auto px-6 py-24">
      <div class="grid md:grid-cols-2 gap-16 items-start">
        <!-- Text -->
        <div>
          <div class="h-px bg-primary w-12 mb-8" />
          <p class="font-body text-white/60 text-lg leading-relaxed mb-6">
            Revolt Streetwear started in 2022 from a small apartment in Catarman, Cordova, Cebu. What began as personal pieces for a tight-knit crew quickly became something bigger — a brand that reflected what the streets actually looked like.
          </p>
          <p class="font-body text-white/60 leading-relaxed mb-6">
            We're not from Manila. We're not trying to be. Cordova is a small municipality across the bridge from Mactan — working-class, sea-facing, underrepresented. We make clothes for the people who live here, work here, and move through here every day.
          </p>
          <p class="font-body text-white/60 leading-relaxed">
            Every collection is designed in-house. Heavy fabrics, honest fits, minimal branding. No fast fashion. No gatekeeping. Just gear you can actually wear, made for the climate and culture it comes from.
          </p>
        </div>

        <!-- Image block -->
        <div class="relative">
          <div class="aspect-[4/5] bg-surface-light overflow-hidden">
            <img
              src="/images/about/story.png"
              alt="Revolt — Catarman, Cordova, Cebu"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute -bottom-4 -left-4 bg-primary text-white font-display text-4xl tracking-widest p-4 w-24 text-center leading-none">
            '22
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Values -->
    <section class="bg-surface border-y border-white/10 py-24">
      <div class="max-w-screen-xl mx-auto px-6">
        <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-4">What We Stand For</p>
        <h2 class="font-display text-4xl md:text-6xl tracking-widest text-white mb-16">MISSION &<br>VALUES</h2>

        <div class="grid md:grid-cols-3 gap-px bg-white/10">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-surface p-8 hover:bg-surface-light transition-colors"
          >
            <p class="font-display text-5xl text-primary/30 tracking-widest mb-4">{{ value.number }}</p>
            <h3 class="font-display text-2xl tracking-widest text-white mb-3">{{ value.title }}</h3>
            <p class="font-body text-sm text-white/40 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="max-w-screen-xl mx-auto px-6 py-24">
      <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-4">The People</p>
      <h2 class="font-display text-4xl md:text-6xl tracking-widest text-white mb-16">BEHIND<br>Revolt</h2>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="member in team"
          :key="member.name"
          class="group"
        >
          <div class="aspect-square bg-surface-light mb-4 overflow-hidden relative">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full h-full object-cover object-top"
            />
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>
          <p class="font-condensed font-semibold text-sm tracking-widest uppercase text-white">{{ member.name }}</p>
          <p class="font-condensed text-xs tracking-widest uppercase text-primary mt-0.5">{{ member.role }}</p>
          <p class="font-body text-xs text-white/40 leading-relaxed mt-2">{{ member.bio }}</p>
        </div>
      </div>
    </section>

    <!-- Numbers -->
    <section class="border-t border-white/10 py-20">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-dark p-8 text-center"
          >
            <p class="font-display text-5xl md:text-6xl text-primary tracking-widest">{{ stat.value }}</p>
            <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mt-2">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 text-center">
      <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-4">Ready?</p>
      <h2 class="font-display text-5xl md:text-7xl tracking-widest text-white mb-8">SHOP THE<br>COLLECTION</h2>
      <NuxtLink to="/shop" class="btn-primary">Browse All</NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({ title: 'About — Revolt Streetwear' })

const values = [
  {
    number: '01',
    title: 'QUALITY FIRST',
    description: 'We use heavyweight fabrics — no shortcuts. Every garment is built to outlast trends and survive daily wear in a tropical climate.',
  },
  {
    number: '02',
    title: 'LOCAL ROOTS',
    description: 'Cordova-born, Cebu-raised. We support local artists, local photographers, and local culture. Every drop reflects where we come from.',
  },
  {
    number: '03',
    title: 'NO HYPE',
    description: 'We don\'t chase clout. We release when it\'s ready. Limited drops because we\'d rather make 100 perfect pieces than 10,000 average ones.',
  },
]

const team = [
  {
    name: 'Juwana Baguio',
    initials: 'JB',
    image: '/images/about/team-jb.png',
    role: 'Founder & Creative Director',
    bio: 'Born and raised in Cordova. Started the brand from her bedroom with a heat press and a lot of late nights.',
  },
  {
    name: 'Catherine Inoc',
    initials: 'CI',
    image: '/images/about/team-ci.png',
    role: 'Head of Design',
    bio: 'Textile design graduate from Cordova Public College. Obsessed with fabric weight and silhouette. Makes everything look intentional.',
  },
  {
    name: 'Frietz Menguito',
    initials: 'FM',
    image: '/images/about/team-fm.png',
    role: 'Photography & Creative',
    bio: 'Documents the streets and shapes the visual identity of every drop. Revolt native, perpetual outsider-insider.',
  },
]

const stats = [
  { value: '2022', label: 'Founded' },
  { value: '12+', label: 'Drops Released' },
  { value: '3K+', label: 'Pieces Sold' },
  { value: '100%', label: 'Local Made' },
]
</script>