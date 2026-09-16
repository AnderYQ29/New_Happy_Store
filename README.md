# Happy Store

Tienda online hecha con React 19, Vite y Sass. El catálogo se consume desde
[Fake Store API](https://fakestoreapi.com) y el carrito vive en el navegador.

## Requisitos

- Node.js 20 o superior

## Puesta en marcha

```bash
npm install     # instala dependencias
npm run dev     # entorno de desarrollo en http://localhost:5173/happy-store/
npm run build   # build de producción en dist/
npm run preview # sirve el build para revisarlo antes de publicar
npm run lint    # revisa el código con ESLint
npm run deploy  # publica dist/ en GitHub Pages
```

## Estructura

```
src/
├─ assets/        imágenes y logos
├─ components/    piezas reutilizables (tarjetas, filtros, stepper, cabecera…)
├─ hooks/         lógica de datos reutilizable (useProductList, useProduct)
├─ layouts/       estructura común de todas las páginas
├─ pages/         una vista por ruta
├─ sass/          estilos
│  ├─ partials/   tokens, base, componentes y vistas
│  └─ style.scss  punto de entrada
├─ services/      acceso a la API en un solo lugar
├─ store/         estado global del carrito (Zustand + localStorage)
└─ utils/         helpers de formato (precios, texto)
```

La regla es simple: los componentes no hacen `fetch` ni formatean precios a
mano. Piden datos a `hooks/`, que a su vez usan `services/api.js`, y muestran
valores con `utils/format.js`.

## Rutas

| Ruta              | Vista                          |
| ----------------- | ------------------------------ |
| `/`               | Inicio                         |
| `/productos`      | Catálogo con filtros           |
| `/productos/:id`  | Detalle de producto            |
| `/carrito`        | Carrito                        |
| `/checkout`       | Datos de entrega y pago        |
| `/nosotros`       | Sobre la tienda                |
| `/contacto`       | Formulario de contacto         |
| cualquier otra    | Página 404                     |

Las rutas antiguas (`/producto`, `/products/:id`, `/about`, `/contact`,
`/cart`) redirigen a las nuevas, así los enlaces ya compartidos siguen
funcionando.

## Estilos

Todos los colores, espaciados y tamaños de texto están en
`src/sass/partials/_tokens.scss` como variables CSS. Para cambiar la identidad
de la tienda basta con tocar ese archivo: no hay colores sueltos dentro de los
componentes.

## Despliegue en GitHub Pages

`npm run deploy` construye el proyecto y publica `dist/`. El script `postbuild`
copia `index.html` a `404.html` para que las rutas internas funcionen al entrar
directo (GitHub Pages no soporta SPA routing de forma nativa).
