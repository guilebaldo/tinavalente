/**
 * Catálogo de ejemplo — Tina Valente
 * Edite productores, piezas y experiencias aquí para cargar contenido real.
 */
window.TINA_CATALOG = {
  brand: {
    legalName: "Casa de Innovación y Diseño Artesano Tina Valente",
    name: "TINA VALENTE",
    logoSub: "Craftswoman / Designer",
    galleryPhrase: "Un lugar en donde resurge el espíritu artístico de México",
    purpose:
      "Dar a conocer y enaltecer el trabajo de las y los artesanos y llevar a cada rincón del mundo el arte hecho por manos mexicanas.",
    tagline:
      "Técnicas ancestrales con una mirada contemporánea — crédito a los saberes comunitarios y de nuestras maestras.",
    studio: "Guru Software Studio — propuesta comercial (demo)"
  },
  stores: [
    {
      name: "Casa del Mendrugo",
      address: "4 Sur 304, Centro Histórico, Puebla, Pue."
    },
    {
      name: "Museo Internacional del Barroco",
      address: "Tienda del museo, Puebla, Pue."
    }
  ],
  producers: [
    {
      id: "maria-chen",
      name: "María Chen López",
      stateId: "oax",
      stateName: "Oaxaca",
      community: "Teotitlán del Valle (perfil de ejemplo)",
      isExampleProfile: true,
      craft: "Textiles en telar de pedal",
      specialty: "Tapetes y piezas con cochinilla y índigo",
      story:
        "María aprendió el telar con su madre y su abuela. En su taller familiar teje motivos zapotecos contemporáneos, cuidando cada paso del teñido natural. Para Tina Valente, su trabajo representa la continuidad de un oficio que honra la tierra y la memoria colectiva.",
      imageSeed: "maria-chen-oaxaca",
      featured: true
    },
    {
      id: "miguel-santiago",
      name: "Miguel Santiago Reyes",
      stateId: "oax",
      stateName: "Oaxaca",
      community: "San Martín Tilcajete (comunidad ficticia de ejemplo)",
      isExampleProfile: true,
      craft: "Alebrijes en copal",
      specialty: "Figuras policromas talladas a mano",
      story:
        "Miguel talla copal recolectado de forma responsable y pinta con acrílicos minerales en capas finas. Sus alebrijes narran animales del valle con fantasía respetuosa de la tradición familiar.",
      imageSeed: "miguel-alebrijes",
      featured: true
    },
    {
      id: "esperanza-ku",
      name: "Esperanza Ku Méndez",
      stateId: "chp",
      stateName: "Chiapas",
      community: "San Andrés Larráinzar (comunidad ficticia de ejemplo)",
      isExampleProfile: true,
      craft: "Brocado maya",
      specialty: "Huipiles y fajas con telar de cintura",
      story:
        "Esperanza coordina un grupo de tejedoras que preservan patrones mayas. Cada pieza tarda semanas: el brocado se inserta línea a línea en el telar de cintura.",
      imageSeed: "esperanza-chiapas",
      featured: false
    },
    {
      id: "tomas-rizo",
      name: "Tomás Rizo Vega",
      stateId: "gro",
      stateName: "Guerrero",
      community: "Taxco el Viejo (comunidad ficticia de ejemplo)",
      isExampleProfile: true,
      craft: "Platería",
      specialty: "Joyería martillada y repujada",
      story:
        "Tomás es tercera generación de plateros taxqueños. Trabaja la plata .925 con martillo y buril, recuperando diseños coloniales y formas contemporáneas.",
      imageSeed: "tomas-taxco",
      featured: true
    },
    {
      id: "lucia-paramo",
      name: "Lucía Páramo Flores",
      stateId: "mic",
      stateName: "Michoacán",
      community: "Uruapan (comunidad ficticia de ejemplo)",
      isExampleProfile: true,
      craft: "Laca de Maque",
      specialty: "Bateas y cajas con laca vegetal",
      story:
        "Lucía aplica capas de maque sobre madera de volteador, puliendo entre cada mano. Sus motivos mezclan flora michoacana con geometría purépecha.",
      imageSeed: "lucia-laca",
      featured: false
    },
    {
      id: "elena-sierra",
      name: "Elena Montes R.",
      stateId: "pue",
      stateName: "Puebla",
      community: "Sierra Nororiental de Puebla (perfil de ejemplo)",
      isExampleProfile: true,
      craft: "Brocado y telar de cintura",
      specialty: "Geometrías de la sierra en lana y algodón",
      story:
        "Perfil ficticio de demostración. Representa a una tejedora de la Sierra Nororiental de Puebla con quien la casa podría colaborar en piezas de autoría compartida.",
      imageSeed: "elena-sierra-pue",
      featured: true
    },
    {
      id: "irene-tenango",
      name: "Irene Santos V.",
      stateId: "hid",
      stateName: "Hidalgo",
      community: "Tenango de Doria (perfil de ejemplo)",
      isExampleProfile: true,
      craft: "Bordado tenangueño",
      specialty: "Textiles narrativos de flora y fauna",
      story:
        "Perfil ficticio de demostración. Ilustra cómo Tina Valente presenta el trabajo de maestras de Hidalgo con crédito visible al oficio y a la comunidad.",
      imageSeed: "irene-tenango-hid",
      featured: false
    },
    {
      id: "rosa-echeverria",
      name: "Rosa Echeverría",
      stateId: "jal",
      stateName: "Jalisco",
      community: "Tonalá (comunidad ficticia de ejemplo)",
      isExampleProfile: true,
      craft: "Barro bruñido",
      specialty: "Jarrones y platos de barro canelo",
      story:
        "Rosa bruñe el barro con hematita hasta lograr un brillo casi metálico. Sus formas recuperan la alfarería de Tonalá con líneas actuales.",
      imageSeed: "rosa-jalisco",
      featured: false
    }
  ],
  pieces: [
    {
      id: "tina-vestido-rebozo-alba",
      collection: "tina",
      title: "Vestido «Alba de rebozo»",
      priceMXN: 14800,
      dimensions: "Talla M (única en demo)",
      materials: "Lana y algodón, tinte con grana cochinilla",
      story:
        "Vestido prêt-à-porter de la colección Tina Valente: silueta contemporánea que integra un rebozo re-tejido. Pieza de ejemplo para la demostración digital.",
      imageSeed: "tina-vestido-alba",
      authorshipType: "Diseño Tina Valente",
      artisanName: "Tina Valente",
      community: "Taller de diseño, Sierra Nororiental de Puebla",
      stateName: "Puebla",
      technique: "Telar de pedal, bordado y confección",
      workHoursApprox: "Aprox. 120 h"
    },
    {
      id: "tina-saco-grana",
      collection: "tina",
      title: "Saco prêt-à-porter «Grana»",
      priceMXN: 11200,
      dimensions: "Talla única",
      materials: "Lana cardada, cochinilla y algodón crudo",
      story: "Saco estructurado con densidad de brocado. Ejemplo de pieza de diseño propio en la vitrina digital.",
      imageSeed: "tina-saco-grana",
      authorshipType: "Diseño Tina Valente",
      artisanName: "Tina Valente",
      community: "Taller de diseño, Puebla",
      stateName: "Puebla",
      technique: "Tejido en telar de pedal y tintes naturales",
      workHoursApprox: "Aprox. 90 h"
    },
    {
      id: "tina-vestido-plumario",
      collection: "tina",
      title: "Vestido «Plumario»",
      priceMXN: 18900,
      dimensions: "Talla S",
      materials: "Algodón, aplicaciones de plumario (arte de ejemplo)",
      story:
        "Pieza que une arte plumario con corte contemporáneo. Contenido ficticio para mostrar la línea prêt-à-porter de la casa.",
      imageSeed: "tina-vestido-plumario",
      authorshipType: "Diseño Tina Valente",
      artisanName: "Tina Valente",
      community: "Taller de diseño, Puebla",
      stateName: "Puebla",
      technique: "Arte plumario y bordado",
      workHoursApprox: "Aprox. 150 h"
    },
    {
      id: "tina-rebozo-corto-pedal",
      collection: "tina",
      title: "Rebozo corto «Pedal»",
      priceMXN: 7600,
      dimensions: "120 × 70 cm",
      materials: "Algodón e índigo",
      story: "Rebozo corto para uso urbano. Ejemplo de pieza única de colección propia.",
      imageSeed: "tina-rebozo-pedal",
      authorshipType: "Diseño Tina Valente",
      artisanName: "Tina Valente",
      community: "Taller de diseño, Puebla",
      stateName: "Puebla",
      technique: "Telar de pedal",
      workHoursApprox: "Aprox. 65 h"
    },
    {
      id: "tina-chaleco-brocado",
      collection: "tina",
      title: "Chaleco «Brocado sierra»",
      priceMXN: 9800,
      dimensions: "Talla M",
      materials: "Lana y algodón brocado",
      story:
        "Chaleco de edición única en demo. Diseño de Tina Valente con tejido en colaboración con maestra de ejemplo de la Sierra Nororiental.",
      imageSeed: "tina-chaleco-brocado",
      authorshipType: "Colaboración",
      artisanName: "Elena Montes R. (perfil de ejemplo)",
      community: "Sierra Nororiental de Puebla (ficticio)",
      stateName: "Puebla",
      technique: "Brocado en telar de cintura y corte Tina Valente",
      workHoursApprox: "Aprox. 80 h"
    },
    {
      id: "pieza-dawn-rug",
      collection: "artesanos",
      producerId: "maria-chen",
      title: "Tapete «Amanecer en el valle»",
      priceMXN: 18500,
      dimensions: "120 × 180 cm",
      materials: "Lana, cochinilla e índigo",
      story:
        "Motivo de diamantes inspirado en el sol nascente sobre el valle. Pieza única tejida en telar de pedal durante seis semanas.",
      imageSeed: "tapete-amanecer"
    },
    {
      id: "pieza-indigo-runner",
      producerId: "maria-chen",
      title: "Camino de mesa índigo",
      priceMXN: 4200,
      dimensions: "40 × 200 cm",
      materials: "Algodón, índigo natural",
      story: "Franjas graduales de azul obtenidas con múltiples inmersiones en baño de índigo.",
      imageSeed: "camino-indigo"
    },
    {
      id: "pieza-cochineal-pillow",
      producerId: "maria-chen",
      title: "Cojín ceremonial cochinilla",
      priceMXN: 2800,
      dimensions: "45 × 45 cm",
      materials: "Lana teñida con grana",
      story: "Diseño de espirales discretas. Incluye funda removible.",
      imageSeed: "cojin-cochineal"
    },
    {
      id: "pieza-alebrije-iguana",
      producerId: "miguel-santiago",
      title: "Alebrije «Iguana turquesa»",
      priceMXN: 8900,
      dimensions: "35 × 18 × 12 cm",
      materials: "Copal, acrílico mineral",
      story: "Iguana con aletas doradas y ojos de luneta. Pieza firmada en la base.",
      imageSeed: "alebrije-iguana"
    },
    {
      id: "pieza-alebrije-zorro",
      producerId: "miguel-santiago",
      title: "Alebrije «Zorro nocturno»",
      priceMXN: 12400,
      dimensions: "42 × 22 × 20 cm",
      materials: "Copal policromo",
      story: "Cola en espiral y alas pequeñas. Secado lento de tres meses.",
      imageSeed: "alebrije-zorro"
    },
    {
      id: "pieza-alebrije-colibri",
      producerId: "miguel-santiago",
      title: "Alebrije «Colibrí lluvia»",
      priceMXN: 5600,
      dimensions: "28 × 15 × 10 cm",
      materials: "Copal tallado",
      story: "Plumaje en tonos violeta y verde agua.",
      imageSeed: "alebrije-colibri"
    },
    {
      id: "pieza-huipil-estrella",
      producerId: "esperanza-ku",
      title: "Huipil «Estrella del oriente»",
      priceMXN: 22000,
      dimensions: "Talla única",
      materials: "Algodón brocado",
      story: "Brocado blanco sobre negro con estrellas mayas. Seis semanas de tejido.",
      imageSeed: "huipil-estrella"
    },
    {
      id: "pieza-faja-jaguar",
      producerId: "esperanza-ku",
      title: "Faja ceremonial jaguar",
      priceMXN: 3600,
      dimensions: "260 × 12 cm",
      materials: "Algodón, brocado rojo",
      story: "Motivo jaguar estilizado en telar de cintura.",
      imageSeed: "faja-jaguar"
    },
    {
      id: "pieza-colgante-luna",
      producerId: "esperanza-ku",
      title: "Colgante tejido luna",
      priceMXN: 2100,
      dimensions: "80 × 15 cm",
      materials: "Algodón natural",
      story: "Pieza decorativa para entrada de casa.",
      imageSeed: "colgante-luna"
    },
    {
      id: "pieza-collar-plata",
      producerId: "tomas-rizo",
      title: "Collar «Luz de mina»",
      priceMXN: 9800,
      dimensions: "45 cm",
      materials: "Plata .925",
      story: "Láminas repujadas que imitan la luz en los túneles de Taxco.",
      imageSeed: "collar-plata"
    },
    {
      id: "pieza-pulsera-hoja",
      producerId: "tomas-rizo",
      title: "Pulsera hoja martillada",
      priceMXN: 3200,
      dimensions: "Ajustable",
      materials: "Plata .925",
      story: "Textura de hoja de sauce en metal.",
      imageSeed: "pulsera-hoja"
    },
    {
      id: "pieza-jarrita-plata",
      producerId: "tomas-rizo",
      title: "Jarrita miniatura",
      priceMXN: 14500,
      dimensions: "12 cm alto",
      materials: "Plata repujada",
      story: "Réplica ornamental de jarra colonial.",
      imageSeed: "jarrita-plata"
    },
    {
      id: "pieza-batea-flores",
      producerId: "lucia-paramo",
      title: "Batea «Flores de niebla»",
      priceMXN: 16800,
      dimensions: "35 cm diámetro",
      materials: "Madera, maque, pigmentos",
      story: "Capas de laca pulidas a mano. Motivo de flores de campo.",
      imageSeed: "batea-flores"
    },
    {
      id: "pieza-caja-laca",
      producerId: "lucia-paramo",
      title: "Caja guardiana",
      priceMXN: 5400,
      dimensions: "18 × 12 × 8 cm",
      materials: "Laca de maque",
      story: "Interior rojo bermellón. Ideal para joyería.",
      imageSeed: "caja-laca"
    },
    {
      id: "pieza-bandeja-laca",
      producerId: "lucia-paramo",
      title: "Bandeja «Rocío»",
      priceMXN: 9200,
      dimensions: "28 × 28 cm",
      materials: "Maque, pigmento azul",
      story: "Geometría purépecha en tonos azules sobre fondo negro pulido.",
      imageSeed: "bandeja-laca"
    },
    {
      id: "pieza-fajon-sierra",
      collection: "artesanos",
      producerId: "elena-sierra",
      title: "Fajón de brocado «Sierra»",
      priceMXN: 4200,
      dimensions: "240 × 14 cm",
      materials: "Lana y algodón",
      story: "Pieza de ejemplo atribuida a perfil ficticio de la Sierra Nororiental.",
      imageSeed: "fajon-sierra",
      authorshipType: "Obra de maestra/o artesano",
      technique: "Telar de cintura",
      workHoursApprox: "Aprox. 40 h"
    },
    {
      id: "pieza-rebozo-sierra",
      collection: "artesanos",
      producerId: "elena-sierra",
      title: "Rebozo «Geometría de niebla»",
      priceMXN: 12500,
      dimensions: "200 × 75 cm",
      materials: "Lana, cochinilla",
      story: "Ejemplo de rebozo tejido con crédito visible a la artesana ficticia.",
      imageSeed: "rebozo-sierra",
      authorshipType: "Obra de maestra/o artesano",
      technique: "Telar de pedal y tinte natural",
      workHoursApprox: "Aprox. 95 h"
    },
    {
      id: "pieza-camino-sierra",
      collection: "artesanos",
      producerId: "elena-sierra",
      title: "Camino de mesa «Cardo»",
      priceMXN: 3800,
      dimensions: "40 × 180 cm",
      materials: "Algodón",
      story: "Pieza única de demostración.",
      imageSeed: "camino-sierra",
      authorshipType: "Obra de maestra/o artesano",
      technique: "Telar de cintura",
      workHoursApprox: "Aprox. 35 h"
    },
    {
      id: "pieza-tenango-ave",
      collection: "artesanos",
      producerId: "irene-tenango",
      title: "Bordado «Aves de niebla»",
      priceMXN: 11200,
      dimensions: "90 × 90 cm",
      materials: "Manta de algodón bordada",
      story: "Textil narrativo de ejemplo, Hidalgo.",
      imageSeed: "tenango-ave",
      authorshipType: "Obra de maestra/o artesano",
      technique: "Bordado tenangueño",
      workHoursApprox: "Aprox. 70 h"
    },
    {
      id: "pieza-tenango-flores",
      collection: "artesanos",
      producerId: "irene-tenango",
      title: "Paño bordado «Flores de milpa»",
      priceMXN: 8600,
      dimensions: "75 × 75 cm",
      materials: "Algodón y hilos de color",
      story: "Pieza ficticia con motivos de campo hidalguense.",
      imageSeed: "tenango-flores",
      authorshipType: "Obra de maestra/o artesano",
      technique: "Bordado tenangueño",
      workHoursApprox: "Aprox. 55 h"
    },
    {
      id: "pieza-tenango-faja",
      collection: "artesanos",
      producerId: "irene-tenango",
      title: "Faja bordada «Camino»",
      priceMXN: 3200,
      dimensions: "250 × 12 cm",
      materials: "Algodón bordado",
      story: "Accesorio textil de demostración.",
      imageSeed: "tenango-faja",
      authorshipType: "Obra de maestra/o artesano",
      technique: "Bordado a mano",
      workHoursApprox: "Aprox. 30 h"
    },
    {
      id: "pieza-jarrón-brunido",
      producerId: "rosa-echeverria",
      title: "Jarrón bruñido canela",
      priceMXN: 7600,
      dimensions: "38 cm alto",
      materials: "Barro canelo bruñido",
      story: "Brillo logrado sin esmalte, solo hematita y pulido.",
      imageSeed: "jarron-brunido"
    },
    {
      id: "pieza-plato-sonido",
      producerId: "rosa-echeverria",
      title: "Plato «Sonido del barro»",
      priceMXN: 2200,
      dimensions: "28 cm",
      materials: "Barro bruñido",
      story: "Ribete inciso a mano.",
      imageSeed: "plato-barro"
    },
    {
      id: "pieza-set-mezcal",
      producerId: "rosa-echeverria",
      title: "Set mezcalero bruñido",
      priceMXN: 4800,
      dimensions: "Copa + jícara",
      materials: "Barro de Tonalá",
      story: "Piezas gemelas con el mismo bruñido.",
      imageSeed: "set-mezcal"
    }
  ],
  experiences: [
    {
      id: "exp-teotitlan",
      producerId: "maria-chen",
      title: "Día en el telar de Teotitlán",
      dates: ["15 dic 2026", "12 ene 2027", "9 feb 2027"],
      capacity: 6,
      duration: "6 horas",
      priceMXN: 2800,
      location: "Teotitlán del Valle, Oaxaca",
      description:
        "Visita el taller, prueba el teñido con índigo y teje un muestra en telar de pedal. Comida comunitaria incluida."
    },
    {
      id: "exp-alebrijes",
      producerId: "miguel-santiago",
      title: "Taller de alebrijes y copal",
      dates: ["6 dic 2026", "10 ene 2027"],
      capacity: 8,
      duration: "5 horas",
      priceMXN: 2200,
      location: "San Martín Tilcajete, Oaxaca",
      description: "Talla una pieza pequeña y aprende la simbología del color."
    },
    {
      id: "exp-chiapas-brocado",
      producerId: "esperanza-ku",
      title: "Mañana de brocado maya",
      dates: ["20 nov 2026", "18 dic 2026"],
      capacity: 5,
      duration: "4 horas",
      priceMXN: 1950,
      location: "San Andrés Larráinzar, Chiapas",
      description: "Iniciación al telar de cintura con las tejedoras del grupo."
    },
    {
      id: "exp-taxco-plata",
      producerId: "tomas-rizo",
      title: "Ruta del platero en Taxco",
      dates: ["Cada sábado — nov 2026", "8 nov 2026", "22 nov 2026"],
      capacity: 4,
      duration: "3.5 horas",
      priceMXN: 3200,
      location: "Taxco, Guerrero",
      description: "Recorrido por el taller, demostración de martillado y café en el centro."
    },
    {
      id: "exp-laca-uruapan",
      producerId: "lucia-paramo",
      title: "Pulido de laca en Uruapan",
      dates: ["1 dic 2026", "15 dic 2026"],
      capacity: 7,
      duration: "5 horas",
      priceMXN: 2650,
      location: "Uruapan, Michoacán",
      description: "Aplica una capa de maque y participa del pulido final."
    },
    {
      id: "exp-sierra-brocado",
      producerId: "elena-sierra",
      title: "Mañana de brocado en la sierra",
      dates: ["7 dic 2026", "14 dic 2026"],
      capacity: 6,
      duration: "5 horas",
      priceMXN: 2100,
      location: "Sierra Nororiental de Puebla (ruta de ejemplo)",
      description:
        "Demostración ficticia: visita a taller de tejido con telar de cintura y explicación de tintes naturales."
    },
    {
      id: "exp-tenango",
      producerId: "irene-tenango",
      title: "Bordado y narrativa en Tenango",
      dates: ["22 nov 2026", "6 dic 2026"],
      capacity: 5,
      duration: "4 horas",
      priceMXN: 1850,
      location: "Tenango de Doria, Hidalgo (ejemplo)",
      description: "Sesión de demostración con perfil ficticio de maestra bordadora."
    },
    {
      id: "exp-tonala",
      producerId: "rosa-echeverria",
      title: "Bruno en el barro de Tonalá",
      dates: ["21 nov 2026", "5 dic 2026", "19 dic 2026"],
      capacity: 6,
      duration: "4 horas",
      priceMXN: 2100,
      location: "Tonalá, Jalisco",
      description: "Modela una pieza y aprende el bruñido con hematita."
    }
  ],
  about: {
    title: "Casa de Innovación y Diseño Artesano",
    galleryPhrase: "Un lugar en donde resurge el espíritu artístico de México",
    paragraphs: [
      "Tina Valente es artesana originaria de la Sierra Nororiental de Puebla. Conoce el oficio desde niña: tejidos y brocados en lana y algodón, arte plumario, tintes naturales como la grana cochinilla, bordado, telar de cintura y telar de pedal. Su casa une técnicas ancestrales con tendencias actuales en colecciones prêt-à-porter — vestidos y sacos de rebozo — y en la curaduría de piezas de maestras y maestros de todo México.",
      "En este sitio de demostración, Tina aparece en su doble papel: diseñadora de su colección propia y curadora que pone al frente el nombre, la comunidad y el oficio de cada artesana y artesano aliado. Como ha expresado en su propio relato público, busca dar «crédito a los saberes comunitarios y de nuestras maestras».",
      "Los perfiles de maestras y maestros incluidos aquí son ficticios y están claramente marcados como ejemplos de vitrina. El catálogo real se cargará después en data/catalog.js."
    ]
  }
};