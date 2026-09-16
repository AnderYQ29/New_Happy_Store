
## Funcionalidad nueva

- Buscador por nombre y descripción, filtro por categoría y orden por precio o valoración.
- Skeletons de carga en lugar del spinner.
- Reintento explícito cuando falla la API.
- Estados vacíos con acción sugerida (carrito vacío, búsqueda sin resultados).
- Umbral de envío gratis con aviso de cuánto falta.
- Checkout con validación campo por campo y pantalla de pedido confirmado con código.
- Página 404 propia.

## Estructura

```
src/
├─ components/    piezas reutilizables
├─ hooks/         useProductList, useProduct (con AbortController y retry)
├─ layouts/       estructura común
├─ pages/         una vista por ruta
├─ sass/partials/ tokens, base, ui, layout, pages
├─ services/      api.js, único punto de acceso a la API
├─ store/         carrito
└─ utils/         formato de precios y texto
```

## Dependencias

Se quitaron `bootstrap`, `react-bootstrap` y `react-router` (esta última venía
duplicada; `react-router-dom` ya la incluye). El diseño se reescribió con Sass.

| Bundle | Antes | Ahora |
| --- | --- | --- |
| CSS | 233,8 kB | 19,3 kB |
| JS | 345,0 kB | 270,6 kB |

## Accesibilidad

Enlace para saltar al contenido, foco visible en todos los controles,
`aria-label` en los iconos, errores de formulario asociados con
`aria-describedby`, `type="tel"` en teléfono, `rel="noopener noreferrer"` en
enlaces externos y soporte de `prefers-reduced-motion`.
