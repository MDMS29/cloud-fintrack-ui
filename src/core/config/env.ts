/** Base de la API. Vacio => rutas relativas /api (proxy de Vite en dev). */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';
