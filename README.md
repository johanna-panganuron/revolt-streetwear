# REVOLT Streetwear — Nuxt 3 Project

> Born in the Streets. Built in Cordova.

## Stack

- **Nuxt 3** — SSR/SSG framework
- **TypeScript** — type safety throughout
- **Tailwind CSS** — utility-first styling
- **Pinia** — cart + wishlist state management
- **VueUse** — scroll, intersection utilities
- **GSAP** — ready for page transitions & animations

## Setup

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate
```

## Project Structure

```
cordova-streetwear/
├── assets/css/main.css          # Global styles, Tailwind, animations
├── components/
│   ├── Navbar.vue               # Fixed nav with scroll detection
│   ├── Footer.vue               # Brand footer with links
│   ├── ProductCard.vue          # Card with quick view + wishlist
│   ├── CartDrawer.vue           # Slide-in cart panel
│   ├── FilterSidebar.vue        # Category/size/color/price filters
│   ├── CountdownTimer.vue       # Drop countdown
│   ├── MarqueeBanner.vue        # Scrolling ticker
│   └── SizeGuideModal.vue       # CM/IN size table modal
├── composables/
│   └── useCart.ts               # Cart composable wrapper
├── pages/
│   ├── index.vue                # Home — hero, featured, countdown
│   ├── shop/index.vue           # Shop — filter + sort grid
│   ├── shop/[slug].vue          # Product detail — gallery, sizes, add to cart
│   ├── cart.vue                 # Cart with order summary + promo
│   ├── lookbook.vue             # Editorial photo layout
│   └── about.vue                # Brand story, team, values
├── stores/
│   ├── cart.ts                  # Pinia cart store
│   └── wishlist.ts              # Pinia wishlist store
├── data/
│   └── products.ts              # Product data + lookbook data
├── public/images/               # Add product images here
├── app.vue                      # Root layout
├── nuxt.config.ts               # Nuxt config
└── tailwind.config.js           # Theme colors + fonts
```

## Brand Colors

| Name      | Hex       | Usage            |
|-----------|-----------|------------------|
| Primary   | `#CC0000` | Red — CTAs, accents |
| Accent    | `#FF2222` | Hover states     |
| Dark      | `#0A0A0A` | Page background  |
| Surface   | `#1A1A1A` | Cards, panels    |
| Surface Lt| `#242424` | Image placeholders |

## Fonts

| Font           | Use          |
|----------------|--------------|
| Bebas Neue     | Display / headings |
| Barlow Condensed | UI labels, buttons, nav |
| Barlow         | Body copy    |

## Adding Product Images

Place images in `public/images/products/`:
- `og-tee-1.jpg`, `og-tee-2.jpg`
- `streets-hoodie-1.jpg`, `streets-hoodie-2.jpg`
- `cargo-1.jpg`, `cargo-2.jpg`
- `cap-1.jpg`
- `block-tee-1.jpg`
- `jogger-1.jpg`

Lookbook images in `public/images/lookbook/`:
- `look-1.jpg` through `look-6.jpg`

## Promo Codes (demo)

| Code         | Discount |
|--------------|----------|
| `REVOLT10`  | 10% off  |
| `STREETS20`  | 20% off  |

## Extending

### Add a product
Edit `data/products.ts` and add a new entry to the `products` array.

### Add a page
Create a new `.vue` file in `pages/`. Nuxt handles routing automatically.

### Add GSAP animations
Import GSAP in your component:
```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
```

### Add a Pinia store
Create a new file in `stores/` and use `defineStore()`.
