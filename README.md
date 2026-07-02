# Carnicería La Ponderosa 22

Sitio web profesional para Carnicería La Ponderosa 22, con catálogo educativo de cortes de res, información de contacto y horarios.

Construido con **React + Vite** y **React Router**.

## Estructura

```
la-ponderosa/
├── public/                  # Assets estáticos
├── src/
│   ├── components/          # Componentes reutilizables (Navbar, Footer, Breadcrumbs, Icons)
│   ├── pages/               # Páginas/rutas (Home, Cortes, Nosotros, Contacto)
│   ├── data/                # Catálogo de cortes de res
│   ├── styles/              # CSS global
│   ├── App.jsx              # Layout principal + rutas
│   └── main.jsx             # Entry point
├── index.html               # HTML base de Vite
├── package.json
└── vite.config.js
```

## Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Compilar para producción (carpeta dist/)
npm run build

# Previsualizar el build de producción
npm run preview
```

## Rutas

| Ruta | Página | Breadcrumb |
|------|--------|------------|
| `/` | Inicio | — |
| `/cortes` | Catálogo de cortes | Inicio > Cortes |
| `/nosotros` | Nuestra historia | Inicio > Nosotros |
| `/contacto` | Contacto y ubicación | Inicio > Contacto |

## Características

- **Sin emojis** — íconos SVG inline profesionales
- **Breadcrumbs** en cada ruta (React Router)
- **Diseño editorial** — enfoque en tipografía serif y paleta sobria
- **Responsive** — mobile, tablet y escritorio
- **Catálogo educativo** con 24 cortes de res clasificados por categoría
- **SEO básico** con meta description, theme-color y structured data
