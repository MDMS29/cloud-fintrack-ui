/**
 * Base de la API. Vacio => rutas relativas /api
 * (proxy de Vite en dev, rewrite del hosting en prod).
 * Debe llevar prefijo VITE_ para que Vite la inyecte en el bundle.
 */
export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');
