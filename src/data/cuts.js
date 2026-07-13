/**
 * Catálogo de productos disponibles en Carnicería La Ponderosa 22.
 * Precios mostrados en MXN por kilogramo, tomados del mostrador.
 */

export const categories = [
  { id: 'parrilla', name: 'Para la parrilla', subtitle: 'Cortes ideales para asar', short: 'Parrilla' },
  { id: 'especiales', name: 'Cortes especiales', subtitle: 'Selección premium de la casa', short: 'Especiales' },
  { id: 'preparados', name: 'Marinados y preparados', subtitle: 'Listos para cocinar', short: 'Preparados' },
  { id: 'complementos', name: 'Pollo y complementos', subtitle: 'Opciones para completar tu comida', short: 'Complementos' }
]

export const cuts = [
  {
    id: 'tripa-cocida', name: 'Tripa Cocida', english: 'Cooked Beef Tripe', category: 'preparados',
    location: 'Tripa de res, limpia y cocida', methods: ['Parrilla', 'Plancha', 'Tacos'], texture: 'firme',
    marbling: 'Crujiente al dorar', pricePerKg: 400, productType: 'Res',
    description: 'Tripa de res ya cocida, lista para dorar a tu gusto y servir en tacos.'
  },
  {
    id: 'rib-fingers', name: 'Rib Fingers', english: 'Intercostal Beef', category: 'especiales',
    location: 'Carne entre las costillas', methods: ['Parrilla', 'Brasa', 'Plancha'], texture: 'intermedia',
    marbling: 'Alto', pricePerKg: 400, productType: 'Res',
    description: 'Tiras carnosas y jugosas extraídas entre las costillas, con gran sabor para las brasas.'
  },
  {
    id: 'filete-cabreria', name: 'Filete de Cabrería', english: 'Tenderloin Steak', category: 'especiales',
    location: 'Lomo central de la res', methods: ['Parrilla', 'Brasa', 'Plancha'], texture: 'tierna',
    marbling: 'Fino', pricePerKg: 700, productType: 'Res', isRegional: true,
    description: 'Filete de gran suavidad y sabor, uno de los favoritos para una carne asada sonorense.'
  },
  {
    id: 'lomo-plano', name: 'Lomo Plano', english: 'Flat Loin Steak', category: 'parrilla',
    location: 'Lomo de la res', methods: ['Parrilla', 'Plancha', 'Asado'], texture: 'tierna',
    marbling: 'Medio', pricePerKg: 380, productType: 'Res',
    description: 'Corte uniforme y suave del lomo, ideal para porciones parejas a la parrilla.'
  },
  {
    id: 'punta-lomo', name: 'Punta de Lomo', english: 'Sirloin Tip', category: 'parrilla',
    location: 'Extremo del lomo', methods: ['Parrilla', 'Plancha', 'Tacos'], texture: 'intermedia',
    marbling: 'Medio', pricePerKg: 380, productType: 'Res',
    description: 'Corte versátil de buen sabor, excelente para bistec, tacos o carne asada.'
  },
  {
    id: 'rib-eye', name: 'Rib-Eye', english: 'Ribeye Steak', category: 'especiales',
    location: 'Costillar superior', methods: ['Parrilla', 'Brasa', 'Plancha'], texture: 'tierna',
    marbling: 'Superior', pricePerKg: 700, productType: 'Res',
    description: 'Corte premium reconocido por su marmoleo, jugosidad y sabor intenso.'
  },
  {
    id: 'arrachera-marinada', name: 'Arrachera Marinada', english: 'Marinated Skirt Steak', category: 'preparados',
    location: 'Falda interna de la res', methods: ['Parrilla', 'Plancha', 'Tacos'], texture: 'tierna',
    marbling: 'Alto', pricePerKg: 440, productType: 'Res', isRegional: true,
    description: 'Arrachera suave y marinada, lista para poner en el asador y compartir.'
  },
  {
    id: 'pechuga-natural', name: 'Pechuga Natural', english: 'Natural Chicken Breast', category: 'complementos',
    location: 'Pechuga de pollo', methods: ['Parrilla', 'Plancha', 'Horno'], texture: 'tierna',
    marbling: 'Magra', pricePerKg: 160, productType: 'Pollo',
    description: 'Pechuga de pollo natural y fresca para asar, cocinar a la plancha o preparar en casa.'
  },
  {
    id: 'aguja-asar', name: 'Aguja para Asar', english: 'Chuck Steak', category: 'parrilla',
    location: 'Parte alta de la paleta', methods: ['Parrilla', 'Brasa', 'Tacos'], texture: 'intermedia',
    marbling: 'Medio', pricePerKg: 170, productType: 'Res',
    description: 'Corte rendidor y sabroso, preparado especialmente para la carne asada.'
  },
  {
    id: 'queso-panela', name: 'Queso Fresco Panela', english: 'Fresh Panela Cheese', category: 'complementos',
    location: 'Queso fresco', methods: ['Natural', 'Plancha', 'Quesadillas'], texture: 'tierna',
    marbling: 'No aplica', pricePerKg: 140, productType: 'Queso', canGrill: false, canMarinate: false, allowThickness: false,
    description: 'Queso panela fresco, ideal para acompañar la carne asada, dorar o preparar quesadillas.'
  },
  {
    id: 'palomilla-sirloin', name: 'Palomilla Sirloin', english: 'Thin Sirloin Steak', category: 'parrilla',
    location: 'Sirloin de la res', methods: ['Plancha', 'Parrilla', 'Tacos'], texture: 'tierna',
    marbling: 'Medio', pricePerKg: 320, productType: 'Res',
    description: 'Bistec delgado de sirloin, rápido de cocinar y perfecto para tacos o plato fuerte.'
  },
  {
    id: 'diezmillo', name: 'Diezmillo', english: 'Chuck Roll', category: 'parrilla',
    location: 'Entre el lomo y el cuello', methods: ['Parrilla', 'Plancha', 'Tacos'], texture: 'intermedia',
    marbling: 'Alto', pricePerKg: 330, productType: 'Res', isRegional: true,
    description: 'Clásico de las carnes asadas del norte, con grasa infiltrada que aporta mucho sabor.'
  },
  {
    id: 'pulpa-paleta', name: 'Pulpa Paleta', english: 'Shoulder Clod', category: 'parrilla',
    location: 'Paleta de la res', methods: ['Plancha', 'Guisos', 'Tacos'], texture: 'intermedia',
    marbling: 'Medio', pricePerKg: 270, productType: 'Res',
    description: 'Pulpa versátil y rendidora para bistec, tacos y guisos caseros.'
  },
  {
    id: 'pulpa-bola', name: 'Pulpa Bola', english: 'Knuckle', category: 'parrilla',
    location: 'Pierna de la res', methods: ['Plancha', 'Milanesa', 'Guisos'], texture: 'intermedia',
    marbling: 'Bajo', pricePerKg: 280, productType: 'Res',
    description: 'Pulpa magra y uniforme, ideal para bistec, milanesa o preparaciones del diario.'
  },
  {
    id: 'costilla-marinada', name: 'Costilla Marinada', english: 'Marinated Beef Ribs', category: 'preparados',
    location: 'Costillar de res', methods: ['Parrilla', 'Brasa', 'Horno'], texture: 'intermedia',
    marbling: 'Alto', pricePerKg: 400, productType: 'Res',
    description: 'Costilla sazonada y marinada, lista para cocinar lentamente hasta quedar jugosa.'
  },
  {
    id: 'costilla-rib-eye', name: 'Costilla Rib-Eye', english: 'Ribeye Ribs', category: 'parrilla',
    location: 'Costillar cercano al rib-eye', methods: ['Parrilla', 'Brasa', 'Horno'], texture: 'intermedia',
    marbling: 'Alto', pricePerKg: 240, productType: 'Res',
    description: 'Costilla carnosa con el sabor característico del rib-eye, ideal para asado a fuego medio.'
  }
]

export function getCutsByCategory(categoryId) {
  return cuts.filter((cut) => cut.category === categoryId)
}

export function getCutById(id) {
  return cuts.find((cut) => cut.id === id)
}
