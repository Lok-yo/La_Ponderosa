# La Ponderosa 22

Sitio web de Carnicería La Ponderosa 22 en San Luis Río Colorado. La experiencia permite explorar el mostrador, personalizar cortes, calcular una carne asada y enviar una cotización completa por WhatsApp.

## Tecnología

- React 18
- React Router 6
- Vite 8
- Fuentes variables locales con Fontsource
- CSS responsive sin framework de componentes

## Funciones principales

- Catálogo con 16 productos, búsqueda y filtros por categoría y textura.
- Personalizador de kilos, grosor, preparación y notas.
- Calculadora de cantidades por adultos, niños y tipo de carne asada.
- Carrito persistente y pedido codificado correctamente para WhatsApp.
- Conversión MXN/USD con tasa en caché y respaldo sin conexión.
- Estado de la sucursal calculado en la zona horaria de Sonora.
- Mapa, horarios, teléfono, preguntas frecuentes y enlaces de contacto.
- Metadatos por ruta, Open Graph, portada social y datos estructurados de negocio local.
- Navegación por teclado, foco contenido en diálogos, reducción de movimiento y objetivos táctiles amplios.

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Inicio y propuesta de servicio |
| `/cortes` | Catálogo y personalización |
| `/calculadora` | Planeador de carne asada |
| `/nosotros` | Manera de trabajar |
| `/contacto` | Horarios, mapa y preguntas frecuentes |
| Cualquier otra | Página 404 |

## Desarrollo

```bash
npm install
npm run dev
```

Compilación de producción:

```bash
npm run build
npm run preview
```

Los precios son estimaciones por kilo. El peso, la disponibilidad, el total y la hora de recogida se confirman directamente con la sucursal.
