/**
 * Catálogo completo de cortes de res — Carnicería La Ponderosa 22
 * 
 * Precios orientativos en MXN por Kilogramo.
 */

export const categories = [
  { id: 'nobles', name: 'Cortes Nobles', subtitle: 'Las piezas más tiernas y valoradas', short: 'Nobles' },
  { id: 'sonorenses', name: 'Especiales de Sonora', subtitle: 'Cortes regionales icónicos del norte', short: 'Sonorenses' },
  { id: 'trasero', name: 'Cuarto Trasero', subtitle: 'De la pierna y cadera de la res', short: 'Trasero' },
  { id: 'delantero', name: 'Cuarto Delantero', subtitle: 'De la paleta y el pecho', short: 'Delantero' },
  { id: 'coccion-lenta', name: 'Cocción Lenta', subtitle: 'Para brasa, guisos y estofados', short: 'Cocción Lenta' },
  { id: 'casqueria', name: 'Casquería', subtitle: 'Vísceras y cortes tradicionales', short: 'Casquería' }
]

export const cuts = [
  // ============== ESPECIALES DE SONORA / REGIONALES ==============
  {
    id: 'cabreria',
    name: 'Cabrería Sonorense',
    english: 'Bone-in Tenderloin Steak',
    category: 'sonorenses',
    location: 'Lomo central con hueso de lomo',
    methods: ['Parrilla', 'Brasa', 'Plancha'],
    texture: 'tierna',
    marbling: 'Excelente',
    pricePerKg: 360,
    isRegional: true,
    description: 'El corte rey de Sonora. Medallón de filete cargado al hueso vertebral que le aporta un sabor y jugosidad incomparable a la parrilla.'
  },
  {
    id: 'diezmillo',
    name: 'Diezmillo Norteño',
    english: 'Chuck Eye Steak',
    category: 'sonorenses',
    location: 'Entre el lomo y el cuello',
    methods: ['Parrilla', 'Plancha', 'Tacos'],
    texture: 'intermedia',
    marbling: 'Alto',
    pricePerKg: 270,
    isRegional: true,
    description: 'El clásico indiscutible de las carnes asadas en el norte. Gran marmoleo y veteado de grasa que se funde en las brasas.'
  },
  {
    id: 'ribeye-sonora',
    name: 'Ribeye Cowboy Sonorense',
    english: 'Bone-in Cowboy Cut Ribeye',
    category: 'sonorenses',
    location: 'Costillar central corte grueso',
    methods: ['Brasa', 'Parrilla', 'Reverse Sear'],
    texture: 'tierna',
    marbling: 'Superior',
    pricePerKg: 420,
    isRegional: true,
    description: 'Chuletón de pulgada y media de grosor con hueso corto, seleccionado de ganado de engorda sonorense. Sabor concentrado e intenso.'
  },
  {
    id: 'aguja-nortena',
    name: 'Aguja Norteña con Hueso',
    english: 'Bone-in Chuck Roll',
    category: 'sonorenses',
    location: 'Paleta alta cerca del costillar',
    methods: ['Parrilla', 'Brasa', 'Taquiza'],
    texture: 'intermedia',
    marbling: 'Alto',
    pricePerKg: 290,
    isRegional: true,
    description: 'Corte tradicional de la región con el toque justo de grasa intermuscular y hueso para potenciar el dorado a las brasas.'
  },

  // ============== CORTES NOBLES ==============
  {
    id: 'solomillo',
    name: 'Solomillo / Filete',
    english: 'Tenderloin',
    category: 'nobles',
    location: 'Lomo central, sin hueso',
    methods: ['Plancha', 'Horno', 'Sellado'],
    texture: 'tierna',
    marbling: 'Fino',
    pricePerKg: 390,
    description: 'Considerado el corte más tierno de la res. Se obtiene del centro del lomo, sin hueso. Ideal para filetear en medallones o preparar como roast beef.'
  },
  {
    id: 'lomo',
    name: 'Lomo / New York Strip',
    english: 'Striploin',
    category: 'nobles',
    location: 'Lomo bajo, sin hueso',
    methods: ['Plancha', 'Parrilla', 'Horno'],
    texture: 'tierna',
    marbling: 'Medio-Alto',
    pricePerKg: 340,
    description: 'Corte premium del lomo bajo, con marmoleo fino y pestaña de grasa lateral. La opción clásica para un bistec jugoso.'
  },
  {
    id: 'chuleton',
    name: 'Chuletón Ribeye',
    english: 'Ribeye / Bone-in Rib Steak',
    category: 'nobles',
    location: 'Costillar central, con hueso',
    methods: ['Parrilla', 'Brasa', 'Horno'],
    texture: 'tierna',
    marbling: 'Superior',
    pricePerKg: 380,
    description: 'El corte emblemático de la carne asada. Incluye el hueso y el ojo del ribeye rodeado de la tapa más suave de la res.'
  },
  {
    id: 't-bone',
    name: 'T-Bone',
    english: 'T-Bone / Porterhouse',
    category: 'nobles',
    location: 'Lomo con vértebra en forma de T',
    methods: ['Plancha', 'Parrilla'],
    texture: 'tierna',
    marbling: 'Alto',
    pricePerKg: 350,
    description: 'Corte distintivo con hueso en T que separa dos texturas: el solomillo de un lado y el lomo del otro. Pieza generosa para compartir.'
  },
  {
    id: 'arrachera',
    name: 'Arrachera Marinada / Natural',
    english: 'Skirt Steak',
    category: 'nobles',
    location: 'Falda interna, músculo diafragma',
    methods: ['Plancha', 'Parrilla', 'Tacos'],
    texture: 'tierna',
    marbling: 'Alto',
    pricePerKg: 310,
    description: 'Corte delgado, fibroso y muy sabroso. El favorito para tacos y carne asada familiar. Suavizada y marinada con la receta secreta de la casa.'
  },
  {
    id: 'tomahawk',
    name: 'Tomahawk Steak',
    english: 'Tomahawk Steak',
    category: 'nobles',
    location: 'Costillar con hueso largo (frencheado)',
    methods: ['Brasa', 'Horno', 'Reverse sear'],
    texture: 'tierna',
    marbling: 'Excepcional',
    pricePerKg: 460,
    description: 'Chuletón con hueso largo tipo warrior. Pieza de presentación espectacular, ideal para celebraciones y cocción lenta a la brasa.'
  },

  // ============== CUARTO TRASERO ==============
  {
    id: 'cuarto-trasero',
    name: 'Cuarto Trasero',
    english: 'Rump / Top Sirloin',
    category: 'trasero',
    location: 'Pierna, parte superior',
    methods: ['Asado', 'Horno', 'Plancha'],
    texture: 'intermedia',
    marbling: 'Medio',
    pricePerKg: 240,
    description: 'Corte magro y versátil del cuarto trasero. Excelente para asar entero al horno o cortar en bistecs gruesos.'
  },
  {
    id: 'babilla',
    name: 'Babilla',
    english: 'Top Round',
    category: 'trasero',
    location: 'Pierna, parte interna',
    methods: ['Asado', 'Estofado', 'Rostizado'],
    texture: 'firme',
    marbling: 'Bajo',
    pricePerKg: 220,
    description: 'Corte magro de la pierna, ideal para preparar rostizados enteros, milanesas empanizadas o usarse en guisos.'
  },
  {
    id: 'contra',
    name: 'Contra',
    english: 'Bottom Round',
    category: 'trasero',
    location: 'Pierna, parte externa inferior',
    methods: ['Estofado', 'Guisos', 'Ropa vieja'],
    texture: 'firme',
    marbling: 'Bajo',
    pricePerKg: 210,
    description: 'Corte firme con gran sabor. Perfecto para estofados, carne deshebrada y platillos tradicionales.'
  },
  {
    id: 'cadera',
    name: 'Cadera / Tapilla',
    english: 'Knuckle / Sirloin Cap',
    category: 'trasero',
    location: 'Articulación de la cadera',
    methods: ['Plancha', 'Asado', 'Horno'],
    texture: 'intermedia',
    marbling: 'Medio',
    pricePerKg: 230,
    description: 'Corte muy apreciado en México para bistec diario y carne asada rapida. Buen equilibrio entre magro y sabor.'
  },
  {
    id: 'peceto',
    name: 'Peceto / Cuete',
    english: 'Sirloin Tip',
    category: 'trasero',
    location: 'Punta de la cadera',
    methods: ['Asado', 'Estofado', 'Bistec'],
    texture: 'intermedia',
    marbling: 'Bajo',
    pricePerKg: 225,
    description: 'Corte magro en forma cónica, ideal para asar entero al horno mechado o cortar en medallones bien dorados.'
  },

  // ============== CUARTO DELANTERO ==============
  {
    id: 'espaldilla',
    name: 'Espaldilla',
    english: 'Chuck / Shoulder Clod',
    category: 'delantero',
    location: 'Paleta, parte superior',
    methods: ['Estofado', 'Guisos', 'Deshebrar'],
    texture: 'firme',
    marbling: 'Alto',
    pricePerKg: 215,
    description: 'Corte con grasa infiltrada rica en colágeno. Excelente para guisos largos, birria, barbacoa estilo norteño y deshebrar.'
  },
  {
    id: 'aguja',
    name: 'Aguja de Paleta',
    english: 'Chuck Tender / Blade',
    category: 'delantero',
    location: 'Paleta, cerca del lomo',
    methods: ['Parrilla', 'Plancha', 'Estofado'],
    texture: 'intermedia',
    marbling: 'Medio',
    pricePerKg: 235,
    description: 'Corte jugoso con marmoleo visible. Funciona muy bien en bisteces gruesos a la plancha o marinados a la parrilla.'
  },
  {
    id: 'paleta',
    name: 'Paleta',
    english: 'Shoulder',
    category: 'delantero',
    location: 'Cuarto delantero completo',
    methods: ['Estofado', 'Rostizado', 'Guisos'],
    texture: 'firme',
    marbling: 'Medio',
    pricePerKg: 205,
    description: 'Corte rústico y rinde mucho. Rendimiento tradicional en caldos, pozoles de res y platillos de cocción prolongada.'
  },
  {
    id: 'pescuezo',
    name: 'Pescuezo con Hueso',
    english: 'Neck',
    category: 'delantero',
    location: 'Cuello de la res',
    methods: ['Caldo', 'Guisos', 'Birria'],
    texture: 'firme',
    marbling: 'Alto colágeno',
    pricePerKg: 175,
    description: 'Corte con hueso y alto contenido de colágeno. La base obligada para consomés sustanciosos y birria estilo Tijuana.'
  },
  {
    id: 'pecho',
    name: 'Pecho / Brisket',
    english: 'Brisket',
    category: 'delantero',
    location: 'Zona pectoral inferior',
    methods: ['Brasa (low & slow)', 'Estofado', 'Horno'],
    texture: 'firme',
    marbling: 'Capa gruesa de grasa',
    pricePerKg: 250,
    description: 'El afamado Brisket. Corte grande con su capa de grasa ("fat cap"). Ideal para ahumar a baja temperatura durante 10 a 12 horas.'
  },

  // ============== COCCIÓN LENTA ==============
  {
    id: 'chambarete',
    name: 'Chambarete con Tuétano',
    english: 'Cross-Cut Shank',
    category: 'coccion-lenta',
    location: 'Hueso de la pierna, en rodajas',
    methods: ['Caldo', 'Estofado', 'Sopa'],
    texture: 'firme',
    marbling: 'Tuétano central',
    pricePerKg: 195,
    description: 'Rodajas de caña de pierna con tuétano jugoso en el centro. Imprescindible para el cocido sonorense y caldos robustos.'
  },
  {
    id: 'morron',
    name: 'Morrón / Ossobuco',
    english: 'Shank',
    category: 'coccion-lenta',
    location: 'Hueso de la pierna, entero',
    methods: ['Estofado', 'Osso buco', 'Caldo'],
    texture: 'firme',
    marbling: 'Gelatinoso',
    pricePerKg: 190,
    description: 'Corte entero del morcillo con tuétano. Tras cocción lenta al vino tinto o jitomate se vuelve extremadamente suave.'
  },
  {
    id: 'falda',
    name: 'Falda de Res',
    english: 'Flank / Plate',
    category: 'coccion-lenta',
    location: 'Abdomen de la res',
    methods: ['Caldo', 'Birria', 'Barbacoa'],
    texture: 'firme',
    marbling: 'Fibroso',
    pricePerKg: 220,
    description: 'Corte de hebrita fina. Muy apreciado para barbacoa, salpicón y birria por deshebrarse limpiamente y absorber los sazones.'
  },
  {
    id: 'costilla-carga',
    name: 'Costilla de Carga / Short Ribs',
    english: 'Short Ribs / Beef Rib Plate',
    category: 'coccion-lenta',
    location: 'Costillar inferior',
    methods: ['Estofado', 'Brasa (low & slow)', 'Horno'],
    texture: 'firme',
    marbling: 'Grasa rica',
    pricePerKg: 260,
    description: 'Tiras de costilla cargadas de carne marmoleada. Perfectas para dorar en el asador y dejar suavizar lentamente.'
  },

  // ============== CASQUERÍA ==============
  {
    id: 'higado',
    name: 'Hígado Fresco',
    english: 'Liver',
    category: 'casqueria',
    location: 'Víscera principal',
    methods: ['Plancha', 'Salteado', 'Encebollado'],
    texture: 'tierna',
    marbling: 'Magro',
    pricePerKg: 120,
    description: 'Hígado fresco de res del día. Rico en hierro y minerales. Clásico encebollado a la sartén con chile verde.'
  },
  {
    id: 'corazon',
    name: 'Corazón',
    english: 'Heart',
    category: 'casqueria',
    location: 'Víscera muscular',
    methods: ['Asado', 'Brochetas', 'Estofado'],
    texture: 'firme',
    marbling: 'Magro',
    pricePerKg: 140,
    description: 'Músculo limpio y firme sin grasa. Excelente marinado en brochetas a las brasas estilo anticucho.'
  },
  {
    id: 'riñon',
    name: 'Riñón',
    english: 'Kidney',
    category: 'casqueria',
    location: 'Víscera renal',
    methods: ['Estofado', 'Salsa', 'Parrilla'],
    texture: 'intermedia',
    marbling: 'Magro',
    pricePerKg: 130,
    description: 'Riñón de res seleccionado. Cocción rápida al jerez o guisado en salsa verde para un sabor intenso y tradicional.'
  },
  {
    id: 'mollejas',
    name: 'Mollejas de Res',
    english: 'Sweetbreads',
    category: 'casqueria',
    location: 'Glándula timo',
    methods: ['Parrilla', 'Plancha', 'Fritas'],
    texture: 'tierna',
    marbling: 'Cremoso',
    pricePerKg: 280,
    description: 'La joya de la casquería. Textura mantecosa y crujiente al dorarse bien en la parrilla con limón y sal gruesa.'
  },
  {
    id: 'lengua',
    name: 'Lengua de Res',
    english: 'Tongue',
    category: 'casqueria',
    location: 'Órgano bucal',
    methods: ['Estofado', 'Salteado', 'Encurtido', 'Tacos'],
    texture: 'tierna',
    marbling: 'Fino',
    pricePerKg: 310,
    description: 'Pieza entera muy cotizada. Al cocerse lentamente se pela y queda de una suavidad increíble para tacos en salsa verde o al vapor.'
  },
  {
    id: 'tripa',
    name: 'Tripa de Leche',
    english: 'Small Intestines',
    category: 'casqueria',
    location: 'Intestino delgado de leche',
    methods: ['Caldo', 'Frita', 'Asada'],
    texture: 'firme',
    marbling: 'Crujiente',
    pricePerKg: 230,
    description: 'Tripa dorada a fuego directo hasta quedar súper dorada y crujiente ("doradita"). Infaltable en las taquizas norteñas.'
  },
  {
    id: 'rabo',
    name: 'Rabo de Res',
    english: 'Oxtail',
    category: 'casqueria',
    location: 'Cola de la res',
    methods: ['Estofado', 'Caldo', 'Sopa'],
    texture: 'firme',
    marbling: 'Rico en colágeno',
    pricePerKg: 270,
    description: 'Trozos de cola con hueso y médula. Tras horas de hervor produce los estofados y sopas más melosas y nutritivas.'
  }
]

export function getCutsByCategory(categoryId) {
  return cuts.filter(c => c.category === categoryId)
}

export function getCutById(id) {
  return cuts.find(c => c.id === id)
}
