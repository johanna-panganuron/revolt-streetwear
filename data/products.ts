export interface Product {
  id: number
  name: string
  slug: string
  price: number
  category: string
  sizes: string[]
  colors: string[]
  stock: Record<string, number>
  images: string[]
  description: string
  isNew: boolean
  isSoldOut: boolean
  tags?: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'REVOLT OG Tee',
    slug: 'revolt-og-tee',
    price: 899,
    category: 'tees',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Red'],
    stock: { XS: 5, S: 10, M: 0, L: 8, XL: 3 },
    images: [
      '/images/products/og-tee-white.png',
      '/images/products/og-tee-red.png',
    

      '/images/products/og-tee-black.png',

  
    ],
    description: 'The original REVOLT tee. Heavy cotton, oversized fit. Dropped shoulders, boxy silhouette. Screen-printed front logo. 100% heavyweight cotton 280gsm.',
    isNew: true,
    isSoldOut: false,
    tags: ['heavyweight', 'oversized', 'logo'],
  },
  {
    id: 2,
    name: 'REVOLT Streets Hoodie',
    slug: 'revolt-streets-hoodie',
    price: 1799,
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Red', 'White'],
    stock: { S: 2, M: 0, L: 4, XL: 1, XXL: 6 },
    images: [
      '/images/products/streets-hoodie-black.png',   
      '/images/products/streets-hoodie-white.png',
      '/images/products/streets-hoodie-red.png',
   
     
    ],
    description: 'Heavyweight fleece hoodie. Built for the streets. 400gsm brushed fleece interior. Kangaroo pocket. Ribbed cuffs and hem. Embroidered chest logo.',
    isNew: false,
    isSoldOut: false,
    tags: ['heavyweight', 'fleece', 'embroidered'],
  },
  {
    id: 3,
    name: 'REVOLT Red Block Cargo',
    slug: 'revolt-red-block-cargo',
    price: 2199,
    category: 'bottoms',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Black'],
    stock: { S: 0, M: 0, L: 0, XL: 0 },
    images: [
      '/images/products/cargo-pants-red.png',
      '/images/products/cargo-pants-black.png',
    ],
    description: 'Multi-pocket cargo pants with red colorblock detail. Wide-leg silhouette. 6 pockets. Adjustable ankle ties. Heavy cotton ripstop.',
    isNew: false,
    isSoldOut: true,
    tags: ['cargo', 'wide-leg', 'ripstop'],
  },
  {
    id: 4,
    name: 'REVOLT Cap',
    slug: 'revolt-cap',
    price: 599,
    category: 'accessories',
    sizes: ['ONE SIZE'],
    colors: ['Red', 'White', 'Black'],
    stock: { 'ONE SIZE': 20 },
    images: [
      '/images/products/cap-red.png',
      '/images/products/cap-white.png',
    
      '/images/products/cap-black.png',
    ],
    description: '6-panel structured cap. Embroidered front logo. Adjustable strap back. Premium wool blend.',
    isNew: true,
    isSoldOut: false,
    tags: ['cap', 'embroidered', 'adjustable'],
  },
  {
    id: 5,
    name: 'REVOLT Varsity Jacket',
    slug: 'revolt-varsity-jacket',
    price: 2999,
    category: 'jackets',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Red'],
    stock: { XS: 3, S: 5, M: 8, L: 6, XL: 4, XXL: 2 },
    images: [
      '/images/products/varsity-jacket-black.png',
      '/images/products/varsity-jacket-white.png',
      '/images/products/varsity-jacket-red.png',
    ],
    description: 'REVOLT Varsity Jacket. Premium wool body with leather sleeves. Embroidered chest and back logo. Ribbed collar, cuffs and hem. Snap button front closure.',
    isNew: false,
    isSoldOut: false,
    tags: ['varsity', 'jacket', 'embroidered', 'premium'],
  },
  {
    id: 6,
    name: 'REVOLT Denim Pants',
    slug: 'revolt-denim-pants',
    price: 1999,
    category: 'bottoms',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Distressed Gray', 'Off White', 'Black Wash', 'Indigo Blue'],
    stock: { S: 5, M: 8, L: 6, XL: 3 },
    images: [
      '/images/products/denim-distressed-gray.png',
      '/images/products/denim-off-white.png',
      '/images/products/denim-black-wash.png',
      '/images/products/denim-indigo-blue.png',
     
      
    ],
    description: 'Baggy wide-leg denim pants. Heavy rigid denim fabric. Embroidered REVOLT logo on back right pocket. Belt loops with adjustable waistband. Available in 4 washes.',
    isNew: true,
    isSoldOut: false,
    tags: ['denim', 'wide-leg', 'baggy', 'embroidered'],
  },
]

export const lookbookImages = [
  { id: 1, src: '/images/lookbook/look-1.png', products: [1] },   // OG Tee
  { id: 2, src: '/images/lookbook/look-2.png', products: [3] },       // Red Block Cargo
  { id: 3, src: '/images/lookbook/look-3.png', products: [4, 5] },   // Cap + Varsity Jacket
  { id: 5, src: '/images/lookbook/look-5.png', products: [2, 3] },   // Streets Hoodie + Red Block Cargo
  { id: 4, src: '/images/products/denim-off-white.png', products: [1, 6] },   // OG Tee + Denim Pants
  { id: 6, src: '/images/lookbook/look-6.png', products: [5] },       // Varsity Jacket
]

export const heroImage = '/images/lookbook/hero.png'        // Full-width hero 16:7
export const groupImage = '/images/lookbook/group.png'      // Full-width group 16:9