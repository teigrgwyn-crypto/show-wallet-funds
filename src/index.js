window.global = window;

import('./polyfills/polyfills').then(() => import('./App'));