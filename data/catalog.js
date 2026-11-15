/**
 * Catálogo de ejemplo — Tina Valente
 * Edite productores, piezas y experiencias aquí para cargar contenido real.
 */
window.TINA_CATALOG = {
  brand: {
    name: "Tina Valente",
    tagline: "Artesanías que cuentan quiénes las hacen",
    accent: "#8B1E3F",
    studio: "Guru Software Studio — propuesta comercial (demo)"
  },
  producers: [
    {
      id: "maria-chen",
      name: "María Chen López",
      stateId: "oax",
      stateName: "Oaxaca",
      community: "Teotitlán del Valle (comunidad ficticia de ejemplo)",
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
      craft: "Laca de Maque",
      specialty: "Bateas y cajas con laca vegetal",
      story:
        "Lucía aplica capas de maque sobre madera de volteador, puliendo entre cada mano. Sus motivos mezclan flora michoacana con geometría purépecha.",
      imageSeed: "lucia-laca",
      featured: false
    },
    {
      id: "carmen-talavera",
      name: "Carmen de la Rosa",
      stateId: "pue",
      stateName: "Puebla",
      community: "Centro histórico de Puebla (taller ficticio)",
      craft: "Talavera",
      specialty: "Cerámica esmaltada de alta temperatura",
      story:
        "Carmen dirige un taller donde cada pieza pasa por moldeado, bizcocho, esmaltado y cocción a más de mil grados. Los diseños azules cobalto son su firma.",
      imageSeed: "carmen-puebla",
      featured: true
    },
    {
      id: "hector-tatewari",
      name: "Héctor Tatewari",
      stateId: "nay",
      stateName: "Nayarit",
      community: "Sierra Wixárika (comunidad ficticia de ejemplo)",
      craft: "Arte sacro wixárika",
      specialty: "Cuadros con chaquira y cera",
      story:
        "Héctor elabora tablas ceremoniales con chaquiras de colores, siguiendo la cosmovisión wixárika. Tina Valente documenta cada pieza con su bendición comunitaria y contexto cultural.",
      imageSeed: "hector-nayarit",
      featured: false
    },
    {
      id: "rosa-echeverria",
      name: "Rosa Echeverría",
      stateId: "jal",
      stateName: "Jalisco",
      community: "Tonalá (comunidad ficticia de ejemplo)",
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
      id: "pieza-dawn-rug",
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
      id: "pieza-platón-talavera",
      producerId: "carmen-talavera",
      title: "Platón azul cobalto",
      priceMXN: 2800,
      dimensions: "32 cm",
      materials: "Talavera certificada",
      story: "Borde perimetral con motivos vegetales.",
      imageSeed: "platon-talavera"
    },
    {
      id: "pieza-jarrón-puebla",
      producerId: "carmen-talavera",
      title: "Jarrón «Fuente del centro»",
      priceMXN: 8900,
      dimensions: "40 cm alto",
      materials: "Cerámica esmaltada",
      story: "Doble cocción. Diseño exclusivo del taller.",
      imageSeed: "jarron-puebla"
    },
    {
      id: "pieza-tazas-pareja",
      producerId: "carmen-talavera",
      title: "Pareja de tazas vuelo",
      priceMXN: 1900,
      dimensions: "250 ml c/u",
      materials: "Talavera",
      story: "Pájaros en vuelo en esmalte azul.",
      imageSeed: "tazas-pareja"
    },
    {
      id: "pieza-cuadro-chaquira",
      producerId: "hector-tatewari",
      title: "Cuadro chaquira «Venado sol»",
      priceMXN: 24000,
      dimensions: "60 × 60 cm",
      materials: "Chaquira, cera, madera",
      story: "Representación del venado solar. Requiere cuidados de luz indirecta.",
      imageSeed: "cuadro-venado"
    },
    {
      id: "pieza-mascara-chaquira",
      producerId: "hector-tatewari",
      title: "Máscara ceremonial (réplica decorativa)",
      priceMXN: 11200,
      dimensions: "25 × 18 cm",
      materials: "Chaquira sobre papel maché",
      story: "Pieza decorativa, no ceremonial. Contexto cultural incluido.",
      imageSeed: "mascara-chaquira"
    },
    {
      id: "pieza-bolsa-chaquira",
      producerId: "hector-tatewari",
      title: "Bolsa ritual decorativa",
      priceMXN: 6800,
      dimensions: "20 × 15 cm",
      materials: "Chaquira y cera",
      story: "Diseño de ojos de dios estilizado para exhibición en casa.",
      imageSeed: "bolsa-chaquira"
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
      id: "exp-talavera",
      producerId: "carmen-talavera",
      title: "Horneo de talavera",
      dates: ["13 dic 2026", "27 dic 2026"],
      capacity: 10,
      duration: "4 horas",
      priceMXN: 1800,
      location: "Puebla, Puebla",
      description: "Pintado de azulejo y visita a la cámara de cocción."
    },
    {
      id: "exp-wixarika",
      producerId: "hector-tatewari",
      title: "Encuentro cultural wixárika",
      dates: ["Bajo cita — contacto previo"],
      capacity: 4,
      duration: "Día completo",
      priceMXN: 4500,
      location: "Sierra Nayarita",
      description:
        "Visita guiada con contexto cultural, sin grabaciones. Respeto estricto a protocolos comunitarios."
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
    title: "Nuestra historia",
    paragraphs: [
      "Tina Valente nació de una pregunta sencilla: ¿cómo acercar al mundo las manos que crean la artesanía mexicana sin convertirlas en un catálogo anónimo?",
      "Somos una casa editorial y comercio consciente. Cada pieza en esta demo es única y está ligada a una persona, una comunidad y un oficio. No competimos por volumen: competimos por cuidado, trazabilidad y dignidad.",
      "Esta propuesta fue elaborada por Guru Software Studio para mostrar cómo un sitio estático, elegante y centrado en productores puede escalar cuando Tina esté lista para conectar su catálogo real."
    ]
  }
};