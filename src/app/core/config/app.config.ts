export const APP_CONFIG = {
  brand: {
    name: 'NEEDLE EYE',
  },

  version: '1.0.0',

  apiBaseUrl: 'http://localhost:9416/api/v1',

  contact: {
    email: 'hello@lyrahouse.com',
    phone: '+94 77 123 4567',
    address: '24 Lotus Terrace, Kalmunai, Eastern Province, Sri Lanka',
  },

  social: {
    instagram: 'https://instagram.com/lyrahouse',
    facebook: 'https://facebook.com/lyrahouse',
    pinterest: 'https://pinterest.com/lyrahouse',
  },

  currency: {
    code: 'LKR',
    symbol: 'LKR',
  },

  nav: {
    links: [
      { label: 'New', path: '/new' },
      { label: 'Women', path: '/women' },
      { label: 'Men', path: '/men' },
      { label: 'Accessories', path: '/accessories' },
      { label: 'Sale', path: '/sale' },
    ],
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
