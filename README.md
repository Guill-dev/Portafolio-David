# David Pérez Pantoja — Portafolio

Sitio web oficial de **David Pérez Pantoja**, trombonista bajo colombiano, músico de planta de la **Orquesta Sinfónica Nacional de Colombia** y artista de **S.E. Shires**.

🌐 **[davidperezpantoja.com](https://davidperezpantoja.com)**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-puro-1572B6?logo=css&logoColor=white)
![Responsive](https://img.shields.io/badge/responsive-celular%20%C2%B7%20tablet%20%C2%B7%20PC-C9A24C)

---

## ✨ Qué tiene la página

| Sección | Qué muestra |
|---|---|
| **Portada** | Video de fondo de David tocando, su nombre y la frase *"Trombón bajo"* con una palabra que va cambiando (solista, sinfónico, de cámara, colombiano). |
| **Historia** | Su biografía, con un botón para seguir leyendo. |
| **Presentaciones** | Carrusel 3D con sus videos de YouTube que se abre al llegar con el scroll. Se puede girar con flechas, puntos o arrastrando. |
| **Eventos** | Afiches de próximos eventos en un carrusel automático que se pausa cuando la persona interactúa. |
| **Premios y reconocimientos** | Su trayectoria en concursos y convocatorias. |
| **Contacto** | Enlaces a sus redes. |
| **Rutinas** | Página aparte con rutinas de práctica descargables en PDF y su video. |

**Animaciones**, todas hechas con CSS y JavaScript propios, sin librerías externas:
- Títulos que se arman letra por letra al hacer scroll.
- Botones con un relleno dorado que crece desde un punto.
- Botón *"Desplázate"* con una luz que gira por dentro.
- Bloques que aparecen suavemente al entrar en pantalla.

Si el visitante tiene activada la opción **"reducir movimiento"** en su dispositivo, las animaciones se desactivan.

---

## 🛠️ Tecnologías

- **[React 19](https://react.dev)**: componentes y estado (`useState`, `useEffect`, `useRef`).
- **[Vite 8](https://vite.dev)**: servidor de desarrollo y build. Son dos páginas: `index.html` y `rutinas.html`.
- **CSS puro**:
  - Variables y grid.
  - Animaciones con `@property`, transformaciones 3D y container queries.
- **JavaScript**: `IntersectionObserver` para las animaciones al hacer scroll.
- **ESLint**: revisa que el código no tenga errores.
- **Hostinger**: hosting del sitio.

---

## 🚀 Cómo correrlo en tu computador

Necesitas [Node.js](https://nodejs.org) instalado.

```bash
npm install     # instala las dependencias (solo la primera vez)
npm run dev     # abre la página en http://localhost:5173
```

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Modo desarrollo: los cambios se ven al instante |
| `npm run build` | Crea la versión final en la carpeta `dist/` |
| `npm run preview` | Muestra la versión final antes de subirla |
| `npm run lint` | Revisa el código en busca de errores |

> **Nota:** el video de portada (`public/video/portada.mp4`) **no está en el repositorio**, porque está en el `.gitignore` por su peso. Para verlo en local, coloca el archivo en esa ruta.

---

## ✏️ Cómo actualizar el contenido

Casi todo el contenido está en archivos de datos. No hace falta tocar los componentes.

| Quiero cambiar… | Archivo |
|---|---|
| Videos de *Presentaciones* | `src/videos.js` |
| Afiches de *Eventos* | `src/eventPosters.js`, con las imágenes en `src/assets/Imagenes/eventos/` |
| Premios | `src/reconocimientos.js` |
| Redes sociales | `src/socialLinks.js` |
| Rutinas | `src/rutinas.js`, con los PDF en `public/rutinas/` |
| Video de portada | `public/video/portada.mp4`; la configuración está en `src/videoPortada.js` |
| Texto de la historia | `src/Historia.jsx` |
| Colores y tipografías | Variables `:root` en `src/index.css` |

---

## 📁 Estructura

```
├── index.html           Página principal
├── rutinas.html         Página de rutinas
├── public/              Archivos que se copian tal cual (video, PDF, favicon)
└── src/
    ├── App.jsx          Arma la página con todas las secciones
    ├── Hero.jsx         Portada
    ├── Historia.jsx     Biografía
    ├── VideoRow.jsx     Carrusel 3D de presentaciones
    ├── Events.jsx       Eventos y su carrusel de afiches
    ├── Awards.jsx       Premios
    ├── Contact.jsx      Contacto
    ├── TextoScroll.jsx  Títulos que se arman al hacer scroll
    ├── EscenaScroll.jsx Video que se abre al aparecer
    ├── BotonHover.jsx   Botón con relleno dorado
    ├── *.js             Datos: videos, eventos, premios, redes, rutinas
    └── *.css            Estilos de cada parte (index.css = estilos generales)
```

---

## 🌍 Publicar en Hostinger

1. Ejecuta `npm run build`.
2. Sube **todo el contenido** de la carpeta `dist/` a `public_html`. Incluye `index.html`, `rutinas.html`, `assets/` y `video/`.
3. Borra los archivos viejos de `public_html/assets/`. Cada build les cambia el nombre, así que los anteriores ya no se usan.

---

## 👨‍💻 Créditos

Diseño y desarrollo: **[Guill-dev](https://github.com/Guill-dev)**.
Contenido, fotografías y videos: © David Pérez Pantoja. Todos los derechos reservados.
