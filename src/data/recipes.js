/**
 * Recetario Gourmet — Carnicería La Ponderosa 22
 */

export const recipes = [
  {
    id: 'cabreria-chiltepin',
    title: 'Cabrería Sonorense con Mantequilla de Chiltepín',
    subtitle: 'El clásico de la casa con el toque picante y ahumado del desierto sonorense.',
    cutId: 'cabreria',
    cutName: 'Cabrería Sonorense',
    prepTime: '20 min',
    cookTime: '15 min',
    difficulty: 'Fácil',
    servings: '2 personas',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
    ingredients: [
      '2 piezas gruesas de Cabrería Sonorense La Ponderosa 22',
      '2 cucharadas de Sal de grano o Sal de Colima',
      '90g de mantequilla sin sal a temperatura ambiente',
      '10-12 chiltepines secos martajados',
      '1 diente de ajo finamente picado',
      '1 cucharada de cilantro fresco picado',
      'Jugo de 1 limón real'
    ],
    steps: [
      'Saca la carne del refrigerador 30 minutos antes para que tome temperatura ambiente.',
      'Mezcla la mantequilla blanda con el chiltepín martajado, ajo picado, cilantro y jugo de limón. Enfría ligeramente.',
      'Prepara el asador a fuego alto directo (brasas al rojo vivo).',
      'Sazona generosamente la Cabrería con la sal de grano justo antes de colocarla en la parrilla.',
      'Asa 4 minutos por lado para término medio (58°C internos).',
      'Coloca un cubo de la mantequilla de chiltepín sobre el hueso y la carne inmediatamente al retirarla del fuego.',
      'Deja reposar 5 minutos cubierto con papel aluminio antes de cortar.'
    ],
    proTip: 'No muevas el corte constantemente en la parrilla; déjalo sellar para marcar las barras de hierro y retener sus jugos.'
  },
  {
    id: 'tomahawk-reverse-sear',
    title: 'Tomahawk Steak con Reverse Sear a la Brasa',
    subtitle: 'Técnica profesional para un corte grueso: cocción interna perfecta y corteza crujiente.',
    cutId: 'tomahawk',
    cutName: 'Tomahawk Steak',
    prepTime: '25 min',
    cookTime: '45 min',
    difficulty: 'Avanzado',
    servings: '3-4 personas',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    ingredients: [
      '1 Tomahawk Steak La Ponderosa 22 (1.2 - 1.5 kg)',
      'Sal kosher y pimienta negra recién quebrada',
      '3 ramitas de romero fresco',
      '4 dientes de ajo con piel aplastados',
      'Aceite de oliva virgen extra'
    ],
    steps: [
      'Sazona el Tomahawk por todos sus lados con abundante sal kosher y pimienta 1 hora antes.',
      'Prepara el asador en dos zonas: brasas de un solo lado para crear zona de calor indirecto (125°C - 140°C).',
      'Coloca el Tomahawk en la zona fría sin brasas directas. Cierra la tapa del asador.',
      'Cocina a fuego indirecto durante 35-40 minutos hasta alcanzar 48°C de temperatura interna.',
      'Pasa el Tomahawk directamente sobre las brasas ardientes a fuego máximo durante 2 minutos por lado.',
      'Baña con romero sumergido en aceite de oliva y ajo durante el sellado final.',
      'Retira a 55°C (término medio jugoso) y reposa 8 minutos en tabla de madera.'
    ],
    proTip: 'Usa un termómetro digital de sonda insertado al centro del ojo del ribeye sin tocar el hueso.'
  },
  {
    id: 'tacos-arrachera-marinada',
    title: 'Tacos de Arrachera Marinada estilo La Ponderosa',
    subtitle: 'Carne asada rápida, suave y jugosa para taquiza familiar inolvidable.',
    cutId: 'arrachera',
    cutName: 'Arrachera Marinada',
    prepTime: '15 min',
    cookTime: '10 min',
    difficulty: 'Fácil',
    servings: '4-6 personas',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    ingredients: [
      '1.5 kg de Arrachera Marinada La Ponderosa 22',
      'Tortillas de maíz recién hechas o de harina sonorenses',
      'Guacamole con pico de gallo y salsa verde de chiltepín',
      'Cebollitas cambray asadas',
      'Limones frescos cortados a la mitad'
    ],
    steps: [
      'Mantén la arrachera en su marinado hasta el momento de llevar a las brasas.',
      'Prepara el carbón bien prendido y la parrilla limpia y bien caliente.',
      'Coloca las tiras de arrachera directamente a fuego vivo. Se cocinarán rápido (3 a 4 minutos por lado).',
      'Retira cuando esté dorada por fuera pero jugosa al centro.',
      'Pica la carne a contra-fibra (perpendicular a las líneas de la fibra muscular) en cubos medianos.',
      'Sirve inmediatamente en tortillas calientes con guacamole, cebollita asada y unas gotas de limón.'
    ],
    proTip: 'Cortar la carne perpendicular a la fibra es el secreto de oro para que cada bocado se deshaga en la boca.'
  },
  {
    id: 'mollejas-crujientes',
    title: 'Mollejas Crujientes al Carbón con Limón y Sal Gruesa',
    subtitle: 'La botana perfecta para iniciar la carne asada mientras se prenden las brasas fuertes.',
    cutId: 'mollejas',
    cutName: 'Mollejas de Res',
    prepTime: '20 min',
    cookTime: '25 min',
    difficulty: 'Intermedio',
    servings: '4 personas',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    ingredients: [
      '1 kg de Mollejas de Res La Ponderosa 22',
      'Sal de mar gruesa',
      '4 limones reales jugosos',
      '1 pizca de orégano seco sonorense'
    ],
    steps: [
      'Enjuaga las mollejas y retira cualquier exceso de tela dura exterior.',
      'Blanquea en agua hirviendo con sal y orégano durante 8 minutos. Escurre y seca muy bien.',
      'Corta las mollejas en trozos medianos bite-size.',
      'Llévalas a la parrilla a fuego medio constante. El objetivo es dorarlas despacio.',
      'Voltea cada 5 minutos hasta que adquieran un color dorado dorado crocante (aprox. 20 min).',
      'Espolvorea sal gruesa abundante y exprime jugo de limón directo en la parrilla.'
    ],
    proTip: 'La clave de las mollejas es la paciencia a fuego medio para lograr la textura cremosa por dentro y bien crujiente por fuera.'
  }
]
