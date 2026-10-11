import { Product, Coupon } from '../types';

// Assets generated specifically for Atelier Noir
import heroBagImg from '../assets/images/hero_atelier_noir_1791739463278.jpg';
import campaignPortraitImg from '../assets/images/campaign_atelier_noir_1791739473204.jpg';
import perfumeNoirImg from '../assets/images/perfume_noir_absolu_1791739481693.jpg';
import watchTitaniumImg from '../assets/images/watch_minimalist_titanium_1791739490427.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // --- CARTERAS & MARROQUINERÍA ---
  {
    id: 'prod-sac-weekend-noir',
    name: 'Sac Weekend Cuir Végétal',
    subtitle: 'Bolso de viaje en cuero curtido artesanal con detalles en paladio',
    category: 'carteras',
    categoryLabel: 'Carteras & Bolsos',
    price: 680,
    originalPrice: 750,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockCount: 4,
    description: 'Elaborado artesanalmente en Toscana a partir de cuero plena flor con curtición 100% vegetal. Su diseño espacioso cuenta con compartimento acolchado para dispositivos de hasta 16", forro interior de sarga de algodón crudo y cremalleras bidireccionales japonesas YKK Excella en negro mate.',
    details: [
      'Cuero vacuno europeo plena flor curtido vegetal',
      'Herrajes metálicos macizos con acabado paladio mate',
      'Forro textil de algodón orgánico 380 g/m²',
      'Bandolera desmontable y ajustable con hombrera acolchada',
      'Bolsillo exterior con cierre magnético discreto',
      'Hecho a mano en Florencia, Italia'
    ],
    materials: 'Cuero bovino 100% curtición vegetal, herrajes de latón acabado paladio mate, forro de algodón orgánico.',
    dimensionsOrSpecs: '50 × 28 × 24 cm — Capacidad 34 L — Peso 1.65 kg',
    images: [
      heroBagImg,
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Color de Cuero',
      options: [
        { id: 'noir-profond', label: 'Noir Profond', inStock: true },
        { id: 'anthracite', label: 'Anthracite Mat', inStock: true },
        { id: 'brun-terre', label: 'Brun Terre', inStock: false }
      ]
    },
    featured: true
  },
  {
    id: 'prod-portefeuille-plisse',
    name: 'Portefeuille Veau Grainé',
    subtitle: 'Billetera bifold ultra-delgada con bloqueo RFID',
    category: 'carteras',
    categoryLabel: 'Carteras & Bolsos',
    price: 195,
    isNew: true,
    isLimited: false,
    inStock: true,
    stockCount: 12,
    description: 'Billetera clásica de perfil extraplano diseñada para deslizarse imperceptiblemente en el bolsillo de la chaqueta. Cortada a mano en piel de becerro graneada de tacto flexible y resistente a arañazos.',
    details: [
      'Piel de becerro graneada francesa',
      'Capacidad para 8 tarjetas de crédito y compartimento para billetes extendidos',
      'Bordes bruñidos y pintados a mano al tono',
      'Película protectora RFID integrada',
      'Grabado en bajorrelieve ATELIER NOIR en tono platino'
    ],
    materials: 'Piel de becerro francesa, forro en seda otomana y refuerzo de microfibra.',
    dimensionsOrSpecs: '11 × 8.8 × 1.2 cm — Peso 62 g',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606503825008-909a67e63c32?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Acabado Piel',
      options: [
        { id: 'noir-graine', label: 'Noir Grainé', inStock: true },
        { id: 'cuir-lisse', label: 'Cuir Lisse Satiné', inStock: true }
      ]
    },
    featured: false
  },
  {
    id: 'prod-porte-cartes-minimal',
    name: 'Porte-Cartes Silhouette',
    subtitle: 'Tarjetero arquitectónico con ranura central para efectivo',
    category: 'carteras',
    categoryLabel: 'Carteras & Bolsos',
    price: 120,
    isNew: false,
    isLimited: false,
    inStock: true,
    stockCount: 18,
    description: 'La máxima expresión del minimalismo de bolsillo. Con 5 compartimentos biselados que facilitan la extracción rápida sin comprometer la sujeción milimétrica.',
    details: [
      'Cuero Box Calf curtido en Romans-sur-Isère',
      '4 ranuras exteriores biseladas ergonómicas',
      '1 compartimento central con forro de sarga',
      'Espesor inferior a 4 mm en reposo'
    ],
    materials: 'Cuero Box Calf 100%, forro de popelín de algodón técnico.',
    dimensionsOrSpecs: '10 × 7 × 0.4 cm — Peso 28 g',
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Tonalidad',
      options: [
        { id: 'noir-absolu', label: 'Noir Mat', inStock: true },
        { id: 'gris-ardoise', label: 'Gris Ardoise', inStock: true }
      ]
    },
    featured: false
  },

  // --- PERFUMES & FRAGANCIAS DE AUTOR ---
  {
    id: 'prod-perfume-noir-absolu',
    name: 'Noir Absolu Eau de Parfum',
    subtitle: 'Madera de agar ahumada, cardamomo negro y acorde de cuero mineral',
    category: 'perfumes',
    categoryLabel: 'Alta Perfumería',
    price: 240,
    isNew: true,
    isLimited: true,
    inStock: true,
    stockCount: 8,
    description: 'Una composición olfativa de contrastes dramáticos formulada en Grasse por maestros perfumistas de la casa. Abre con la frialdad metálica de la pimienta negra y cardamomo salvaje, dando paso a un corazón resinoso de incienso de Somalia, para asentarse en una base profunda de oud ahumado y ante oscuro.',
    details: [
      'Concentración Eau de Parfum Intense (24% de aceites esenciales puros)',
      'Notas de salida: Cardamomo negro de Ceilán, Pimienta rosa, Bergamota helada',
      'Notas de corazón: Incienso de Somalia, Resina de ládano, Cedro del Atlas',
      'Notas de fondo: Oud ahumado de Trat, Cuero curtido, Almizcle blanco puro',
      'Frasco de cristal pesado ahumado con tapón magnético torneado en aluminio',
      'Elaborado en Grasse, Francia'
    ],
    materials: 'Alcohol etílico de origen vegetal bio, esencias naturales certificadas IFRA, cristal ahumado soplado a boca.',
    dimensionsOrSpecs: 'Frasco recargable con atomizador de microdifusión ultra-fina',
    images: [
      perfumeNoirImg,
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Volumen',
      options: [
        { id: '50ml', label: '50 ml', inStock: true, priceModifier: 0 },
        { id: '100ml', label: '100 ml Flacon', inStock: true, priceModifier: 110 }
      ]
    },
    featured: true
  },
  {
    id: 'prod-perfume-santal-mineral',
    name: 'Santal Minéral Eau de Parfum',
    subtitle: 'Sándalo blanco de Mysore, iris pálido y rocío salino',
    category: 'perfumes',
    categoryLabel: 'Alta Perfumería',
    price: 220,
    isNew: false,
    isLimited: false,
    inStock: true,
    stockCount: 15,
    description: 'La reinterpretación contemporánea de la madera noble. Santal Minéral contrapone la calidez cremosa del sándalo australiano con la textura terrosa de la raíz de orris y un susurro de brisa marina que aporta una frescura luminosa y adictiva.',
    details: [
      'Concentración Eau de Parfum (20% de concentrado aromático)',
      'Notas de salida: Sal marina fósil, Cardamomo verde, Mandarina verde',
      'Notas de corazón: Mantequilla de Orris florentino, Violeta silvestre',
      'Notas de fondo: Sándalo de silvicultura sostenible, Ámbar gris vegetal, Musgo de roble',
      'Difusor de niebla continua para aplicación envolvente'
    ],
    materials: 'Formulación vegana sin ftalatos, alcohol orgánico de caña de azúcar, frasco de vidrio reciclable al 90%.',
    dimensionsOrSpecs: '100 ml / 3.4 FL. OZ.',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Presentación',
      options: [
        { id: '100ml', label: '100 ml', inStock: true },
        { id: 'travel-set', label: 'Set Voyage (3 × 15 ml)', inStock: true, priceModifier: -35 }
      ]
    },
    featured: false
  },
  {
    id: 'prod-perfume-vetiver-fumee',
    name: 'Vétiver Fumée Eau de Parfum',
    subtitle: 'Vetiver de Haití tostado, ceniza de abedul y pachulí oscuro',
    category: 'perfumes',
    categoryLabel: 'Alta Perfumería',
    price: 235,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockCount: 5,
    description: 'Austero, magnético y profundamente enraizado en la tierra. Inspirado en los talleres de herrería y la niebla que envuelve los bosques del norte al amanecer.',
    details: [
      'Notas de salida: Enebro silvestre, Pomelo amargo, Nuez moscada',
      'Notas de corazón: Vetiver de Haití destilado al vapor, Alquitrán de abedul',
      'Notas de fondo: Pachulí madurado en barrica de roble, Cedro ahumado',
      'Embalaje exterior en caja de cartón prensado con grabado ciego'
    ],
    materials: 'Extractos botánicos puros, frasco lacado negro azabache semitransparente.',
    dimensionsOrSpecs: '100 ml — Edición numerada a mano',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
      perfumeNoirImg
    ],
    variants: {
      name: 'Formato',
      options: [
        { id: '100ml', label: '100 ml Edición Numerada', inStock: true }
      ]
    },
    featured: false
  },

  // --- RELOJES & ALTA CRONOMETRÍA ---
  {
    id: 'prod-watch-chronometre-titane',
    name: 'Chronomètre Titane Monolithe',
    subtitle: 'Caja de titanio grado 5 microgranallado con calibre automático suizo',
    category: 'relojes',
    categoryLabel: 'Relojería Mecánica',
    price: 1850,
    originalPrice: 2100,
    isNew: true,
    isLimited: true,
    inStock: true,
    stockCount: 3,
    description: 'La máxima depuración de la relojería utilitaria. Diseñado sin inscripciones superfluas, su esfera en negro mate texturizado presenta índices aplicados con tratamiento superluminova negro stealth y agujas esqueletadas cortadas por láser. Caja en titanio grado 5 ligero y antialérgico con cristal de zafiro de triple tratamiento antirreflejos.',
    details: [
      'Movimiento: Calibre automático suizo Sellita SW300-1 Top Grade regulado en 5 posiciones',
      'Reserva de marcha: 56 horas con rotor esqueletado recubierto en rutenio',
      'Caja: Titanio Grado 5 con acabado microgranallado gris ceniza',
      'Diámetro: 39 mm | Grosor: 9.6 mm | Distancia entre asas: 46 mm',
      'Cristal: Zafiro abombado con 3 capas antirreflejo internas',
      'Resistencia al agua: 10 ATM (100 metros) con corona roscada estriada',
      'Correa: Piel de curtición artesanal y caucho vulcanizado FKM intercambiable'
    ],
    materials: 'Titanio Grado 5, cristal de zafiro sintético 9 Mohs, piel de becerro italiana y caucho FKM.',
    dimensionsOrSpecs: 'Caja 39 mm × 9.6 mm — Peso con correa 68 gramos',
    images: [
      watchTitaniumImg,
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Correa Incluida',
      options: [
        { id: 'cuir-noir', label: 'Cuero Negro Mate', inStock: true },
        { id: 'fkm-stealth', label: 'Caucho FKM Texturizado', inStock: true },
        { id: 'titane-bracelet', label: 'Brazalete Titanio Eslabones (+350 €)', inStock: true, priceModifier: 350 }
      ]
    },
    featured: true
  },
  {
    id: 'prod-watch-chronographe-noir',
    name: 'Chronographe Automatique Noire',
    subtitle: 'Cronógrafo bicompax con bisel de cerámica cepillada',
    category: 'relojes',
    categoryLabel: 'Relojería Mecánica',
    price: 2450,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockCount: 2,
    description: 'Un instrumento de cronometraje de precisión arquitectónica. Caja en acero 316L con recubrimiento DLC (Diamond-Like Carbon) de dureza superior a 3000 Vickers y pulsadores tipo pistón para una respuesta táctil impecable.',
    details: [
      'Calibre cronógrafo automático con rueda de pilares y embrague vertical',
      'Bisel fijo de cerámica de óxido de circonio con escala taquimétrica grabada',
      'Fondo visto de zafiro con masa oscilante personalizada en PVD negro',
      'Subesferas empotradas con guilloché concéntrico azuré',
      'Garantía internacional extendida de 5 años'
    ],
    materials: 'Acero quirúrgico 316L con revestimiento DLC, cerámica técnica, zafiro antirreflejos.',
    dimensionsOrSpecs: 'Caja 41 mm × 12.8 mm — Resistencia al agua 100 m',
    images: [
      'https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1200&q=85',
      watchTitaniumImg
    ],
    variants: {
      name: 'Tipo de Cierre',
      options: [
        { id: 'deployante', label: 'Hebilla Desplegable DLC', inStock: true },
        { id: 'ardillon', label: 'Hebilla Clásica Ardillon', inStock: true }
      ]
    },
    featured: false
  },

  // --- GORRAS & HEADWEAR EDITORIAL ---
  {
    id: 'prod-cap-cashmere-noir',
    name: 'Casquette Cachemire Héritage',
    subtitle: 'Gorra estructurada en sarga de cachemira pura de Cariaggi con cierre de latón envejecido',
    category: 'gorras',
    categoryLabel: 'Headwear & Gorras',
    price: 210,
    isNew: true,
    isLimited: true,
    inStock: true,
    stockCount: 9,
    description: 'La elevación definitiva de una silueta urbana clásica a la más alta sastrería. Confeccionada con cachemira pura tejida en Biella, forrada con popelina de seda para un contacto suave con el cabello y visera moldeable con refuerzo de resina con memoria de forma.',
    details: [
      '100% Cachemira italiana pura 420 g/m² de Cariaggi',
      'Forro interior completo en sarga de seda natural 100%',
      'Cierre trasero ajustable con tira de piel de ternera y hebilla de latón bruñido',
      'Ojales bordados al tono para ventilación anatómica',
      'Banda interior antisudor confeccionada en algodón mercerizado',
      'Confeccionada a mano en Portugal'
    ],
    materials: '100% Cachemira, forro 100% seda, correa en piel de becerro, hebilla metálica.',
    dimensionsOrSpecs: 'Circunferencia regulable: 56 a 61 cm — Visera 7.2 cm',
    images: [
      campaignPortraitImg,
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Talla',
      options: [
        { id: 'size-s-m', label: 'S/M (56-58 cm)', inStock: true },
        { id: 'size-l-xl', label: 'L/XL (59-61 cm)', inStock: true }
      ]
    },
    featured: true
  },
  {
    id: 'prod-cap-twill-architectural',
    name: 'Casquette Twill Sculptée',
    subtitle: 'Gorra de 6 paneles en gabardina de algodón egipcio Giza 87 repelente al agua',
    category: 'gorras',
    categoryLabel: 'Headwear & Gorras',
    price: 135,
    isNew: false,
    isLimited: false,
    inStock: true,
    stockCount: 22,
    description: 'Geometría precisa y durabilidad sin concesiones. Gabardina de algodón peinado de fibra extralarga tratada con cera vegetal ecológica resistente a llovizna urbana y viento.',
    details: [
      'Algodón egipcio Giza 87 tejido denso de alta resistencia',
      'Tratamiento ecológico PFC-Free hidrófugo',
      'Bordado tonal microscópico del monograma de la casa en el panel lateral',
      'Estructura de corona baja y visera plana precurvada',
      'Hebilla metálica con pasador oculto en la tira posterior'
    ],
    materials: '100% Algodón egipcio, herrajes de acero pavonado.',
    dimensionsOrSpecs: 'Talla única ajustable (55 a 61 cm)',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85',
      campaignPortraitImg
    ],
    variants: {
      name: 'Color',
      options: [
        { id: 'noir-charbon', label: 'Noir Charbon', inStock: true },
        { id: 'ardoise-mineral', label: 'Ardoise Minéral', inStock: true }
      ]
    },
    featured: false
  },
  {
    id: 'prod-cap-laine-merinos',
    name: 'Bonnet Laine Mérinos Extra-Fine',
    subtitle: 'Gorro de punto canalé acanalado en lana merina ultrafina de 17.5 micras',
    category: 'gorras',
    categoryLabel: 'Headwear & Gorras',
    price: 95,
    isNew: false,
    isLimited: false,
    inStock: true,
    stockCount: 14,
    description: 'Tejido íntegramente sin costuras (WholeGarment®) para una comodidad ergonómica absoluta sin puntos de fricción. Lana merina termorreguladora que mantiene la cabeza templada y seca.',
    details: [
      '100% Lana Merina ultrafina certificada ZQ (17.5 micras)',
      'Tecnología 3D WholeGarment sin costuras',
      'Puño con dobladillo doble ajustable a la altura deseada',
      'Tratamiento prelavado que previene encogimiento'
    ],
    materials: '100% Lana Merina ZQ.',
    dimensionsOrSpecs: 'Talla única unisex extensible',
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=1200&q=85',
      campaignPortraitImg
    ],
    variants: {
      name: 'Tonalidad',
      options: [
        { id: 'noir-encre', label: 'Noir Encre', inStock: true },
        { id: 'gris-chiné', label: 'Gris Chiné', inStock: true }
      ]
    },
    featured: false
  },

  // --- ACCESORIOS & JOYERÍA ---
  {
    id: 'prod-lunettes-acetate-noir',
    name: 'Lunettes Solaires Forme I',
    subtitle: 'Gafas de sol en acetato de celulosa japonés Mazzucchelli con lentes minerales Zeiss',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Joyería',
    price: 360,
    originalPrice: 400,
    isNew: true,
    isLimited: true,
    inStock: true,
    stockCount: 6,
    description: 'Esculpidas a mano en Japón a partir de planchas de acetato curado durante 3 meses. Silueta geométrica contundente con bisagras de 7 cilindros remachadas a mano que garantizan décadas de apertura suave y firme.',
    details: [
      'Montura de acetato japonés de 8 mm con bordes achaflanados a mano',
      'Lentes de cristal mineral Zeiss con protección 100% UV400 y polarizado antirreflejo',
      'Bisagras de 7 charnelas remachadas a través del frontal',
      'Varillas con núcleo de alambre grabado a la vista',
      'Incluye funda de piel rígida curtida al vegetal y gamuza de microfibra de alta densidad',
      'Hechas a mano en Sabae, Japón'
    ],
    materials: 'Acetato Mazzucchelli 100%, lentes Zeiss de cristal mineral, alma de titanio.',
    dimensionsOrSpecs: 'Calibre 51 mm · Puente 21 mm · Varilla 145 mm',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Tinte de Cristales',
      options: [
        { id: 'smoke-solid', label: 'Noir Fumé Dégradé', inStock: true },
        { id: 'vert-bouteille', label: 'Vert Bouteille Minéral', inStock: true }
      ]
    },
    featured: true
  },
  {
    id: 'prod-manchette-argent-brosse',
    name: 'Manchette Argent Brossé 925',
    subtitle: 'Brazalete escultórico de plata de ley 925 maciza con acabado satinado lineal',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Joyería',
    price: 310,
    isNew: false,
    isLimited: true,
    inStock: true,
    stockCount: 7,
    description: 'Una pieza de orfebrería con peso rotundo y líneas depuradas. Cada pieza es forjada a mano y cepillada individualmente para obtener un brillo sutil mate que adquiere una pátina única con el paso del tiempo.',
    details: [
      'Plata de ley 925 maciza (peso neto 48 gramos)',
      'Acabado cepillado satinado artesanal longitudinal',
      'Contornos interiores pulidos al espejo para máximo confort dérmico',
      'Contraste oficial del laboratorio de metales preciosos y sello de la marca',
      'Ajustable suavemente mediante calor corporal'
    ],
    materials: '100% Plata de ley 925 reciclada certificada RJC.',
    dimensionsOrSpecs: 'Ancho 16 mm · Grosor 3.2 mm · Peso ~48 g',
    images: [
      'https://images.unsplash.com/photo-1611591475152-4783113828af?auto=format&fit=crop&w=1200&q=85',
      campaignPortraitImg
    ],
    variants: {
      name: 'Diámetro de Muñeca',
      options: [
        { id: 'size-medium', label: 'Medium (16 - 18 cm)', inStock: true },
        { id: 'size-large', label: 'Large (18 - 20.5 cm)', inStock: true }
      ]
    },
    featured: false
  },
  {
    id: 'prod-porte-cles-mousqueton',
    name: 'Mousqueton Laiton Massif & Cuir',
    subtitle: 'Mosquetón de diseño industrial con llavero de cuero remachado',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Joyería',
    price: 85,
    isNew: false,
    isLimited: false,
    inStock: true,
    stockCount: 25,
    description: 'Mecanizado a partir de un bloque sólido de latón naval con acabado pavonado negro. Su mecanismo de muelle helicoidal interno asegura una retención infalible.',
    details: [
      'Latón macizo mecanizado por CNC con recubrimiento cerámico negro',
      'Cinta de cuero vegetal curtido de 3 mm remachada a mano',
      '3 anillas planas independientes para llaves',
      'Cierre de seguridad con seguro antidesenganche'
    ],
    materials: 'Latón macizo, cuero bovino plena flor.',
    dimensionsOrSpecs: 'Longitud total 13.5 cm · Ancho 3.2 cm · Peso 75 g',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      heroBagImg
    ],
    variants: {
      name: 'Acabado Metálico',
      options: [
        { id: 'noir-mat', label: 'Noir Mat Pavoné', inStock: true },
        { id: 'laiton-brut', label: 'Laiton Brut Vieilli', inStock: true }
      ]
    },
    featured: false
  },
  {
    id: 'prod-ceinture-reversible-minimal',
    name: 'Ceinture Réversible Silhouette',
    subtitle: 'Cinturón reversible en cuero negro y gris antracita con hebilla de titanio',
    category: 'accesorios',
    categoryLabel: 'Accesorios & Joyería',
    price: 190,
    isNew: true,
    isLimited: false,
    inStock: true,
    stockCount: 11,
    description: 'Diseño reversible de un giro con mecanismo giratorio patentado integrado en la hebilla. Ofrece dos cueros de máxima calidad en un único accesorio esencial.',
    details: [
      'Piel de becerro de doble faz sin costuras visibles',
      'Hebilla de titanio cepillado con bisagra rotatoria de 360°',
      'Ancho formal de 32 mm apto para traje o sastrería relajada',
      'Puntas redondeadas y 5 perforaciones biseladas'
    ],
    materials: 'Piel bovina europea curtición semi-anilina, hebilla de titanio.',
    dimensionsOrSpecs: 'Ancho 32 mm · Largos disponibles de 85 a 110 cm',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85'
    ],
    variants: {
      name: 'Talla de Cintura',
      options: [
        { id: 'size-85', label: '85 cm', inStock: true },
        { id: 'size-95', label: '95 cm', inStock: true },
        { id: 'size-105', label: '105 cm', inStock: true }
      ]
    },
    featured: false
  }
];

export const DEMO_COUPONS: Coupon[] = [
  {
    code: 'BIENVENUE10',
    discountPercent: 10,
    description: '10% de cortesía para nuevos clientes de la Maison'
  },
  {
    code: 'NOIR15',
    discountPercent: 15,
    minAmount: 300,
    description: '15% de reducción en pedidos superiores a 300 €'
  },
  {
    code: 'ATELIERVIP',
    discountPercent: 20,
    minAmount: 600,
    description: '20% exclusivo para miembros del Círculo Privado Atelier'
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'todos', label: 'Todo el Catálogo' },
  { id: 'gorras', label: 'Gorras & Headwear' },
  { id: 'perfumes', label: 'Alta Perfumería' },
  { id: 'relojes', label: 'Relojería Mecánica' },
  { id: 'carteras', label: 'Carteras & Bolsos' },
  { id: 'accesorios', label: 'Accesorios & Joyería' }
] as const;
