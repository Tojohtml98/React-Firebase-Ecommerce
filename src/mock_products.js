const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?w=900&h=900&fit=crop&auto=compress`
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=900&h=900&fit=crop&auto=format&q=80`

export const products = [
  // Mates Tradicionales
  {
    id: 'p1',
    title: 'Mate Imperial de Calabaza Premium',
    price: 8500,
    stock: 12,
    category: 'mates',
    image: pexels(25436071),
    description: 'Mate tradicional de calabaza lagenaria curada por 6 meses. Virola de alpaca plateada con grabados pampeanos. Capacidad: 250ml. Incluye instructivo de curado. Origen: Santiago del Estero.'
  },
  {
    id: 'p2',
    title: 'Mate Artesanal de Algarrobo del Norte',
    price: 12000,
    stock: 8,
    category: 'mates',
    image: pexels(33181412),
    description: 'Tallado a mano en madera de algarrobo blanco. Diseño ergonómico con base antideslizante. Dimensiones: 9cm x 7cm. Tratamiento con aceite de tung natural. Resistente al agua y cambios de temperatura.'
  },
  {
    id: 'p3',
    title: 'Mate Camionero Patagónico',
    price: 15500,
    stock: 6,
    category: 'mates',
    image: pexels(13246779),
    description: 'Forrado en cuero vacuno curtido al tanino. Base de goma antideslizante reforzada. Ideal para viajes largos. Virola de acero inoxidable. Capacidad: 300ml. Resistente a golpes y caídas.'
  },
  {
    id: 'p4',
    title: 'Mate Imperial Edición Bicentenario',
    price: 18000,
    stock: 4,
    category: 'mates',
    image: pexels(15347184),
    description: 'Calabaza seleccionada con grabados del escudo nacional. Virola de plata 900 con baño de oro. Edición limitada numerada. Incluye certificado de autenticidad y estuche de terciopelo.'
  },

  // Bombillas Premium
  {
    id: 'p5',
    title: 'Bombilla Alpaca Plateada Clásica',
    price: 3500,
    stock: 25,
    category: 'bombillas',
    image: pexels(33181401),
    description: 'Aleación de alpaca con terminación plateada. Filtro de orificios finos para yerba premium. Largo: 17cm. Pico anatómico anti-quemaduras. Fácil limpieza con cepillo incluido.'
  },
  {
    id: 'p6',
    title: 'Bombilla Quirúrgica Premium',
    price: 4200,
    stock: 20,
    category: 'bombillas',
    image: pexels(25436250),
    description: 'Acero inoxidable 316L grado médico. Filtro desmontable de malla fina. Resistente a ácidos y corrosión. Largo: 18cm. Ideal para yerbas compuestas y con hierbas.'
  },
  {
    id: 'p7',
    title: 'Bombilla Artesanal de Alpaca',
    price: 5800,
    stock: 15,
    category: 'bombillas',
    image: pexels(787674),
    description: 'Alpaca martillada a mano. Pico ergonómico anti-quemaduras. Filtro cónico de múltiples niveles. Diseño tradicional argentino. Largo: 16cm.'
  },
  {
    id: 'p8',
    title: 'Bombilla Premium de Plata',
    price: 25000,
    stock: 3,
    category: 'bombillas',
    image: pexels(8649382),
    description: 'Plata de ley con terminación pulida. Filtro de malla fina. Pico curvado para mayor comodidad. Estuche de cuero incluido. Pieza premium para colección.'
  },

  // Yerbas Seleccionadas
  {
    id: 'p9',
    title: 'Yerba Mate Taragüí · Paquete Familiar 1kg',
    price: 2800,
    stock: 50,
    category: 'yerbas',
    image: unsplash('1568500129174-607d7e48fbb4'),
    description: 'Cosecha 2024 de Misiones. Estacionamiento natural de 18 meses. Blend 70% hoja, 30% palo. Sabor intenso y duradero. Sin aditivos artificiales. Certificación orgánica.'
  },
  {
    id: 'p10',
    title: 'Yerba Mate La Merced · Selección Especial',
    price: 3200,
    stock: 40,
    category: 'yerbas',
    image: pexels(10908708),
    description: 'Yerba premium con palo de Corrientes. Molienda gruesa tradicional. Estacionamiento en cámaras de roble. Notas herbales y cítricas. Ideal para cebar todo el día.'
  },
  {
    id: 'p11',
    title: 'Yerba Mate Cruz de Malta · Clásica',
    price: 2900,
    stock: 45,
    category: 'yerbas',
    image: unsplash('1709133706836-aa2d177a30da'),
    description: 'La yerba de los argentinos desde 1921. Blend equilibrado 60/40. Secado a leña de eucalipto. Sabor tradicional y consistente. Envasado al vacío para mayor frescura.'
  },
  {
    id: 'p12',
    title: 'Yerba Mate Amanda · Suave con Hierbas',
    price: 3100,
    stock: 35,
    category: 'yerbas',
    image: unsplash('1675001077097-4a2f0496aab3'),
    description: 'Blend suave con menta, peperina y cedrón. Ideal para principiantes. Sin polvo. Molienda media. Cultivada en suelos rojos misioneros. Certificación sustentable.'
  },
  {
    id: 'p13',
    title: 'Yerba Mate Rosamonte · Especial Despalada',
    price: 3400,
    stock: 30,
    category: 'yerbas',
    image: unsplash('1675001077188-809370ce3279'),
    description: 'Sin palo, 100% hoja pura. Sabor intenso y concentrado. Estacionamiento de 24 meses. Origen: Oberá, Misiones. Para paladares exigentes. Molienda fina premium.'
  },

  // Termos Profesionales
  {
    id: 'p14',
    title: 'Termo Stanley Classic 1L · Verde Militar',
    price: 18500,
    stock: 12,
    category: 'termos',
    image: pexels(29307238),
    description: 'Acero inoxidable 18/8. Mantiene calor por 24hs, frío por 48hs. Tapa-vaso de 236ml. Manija plegable. Garantía de por vida. Resistente a golpes. Apto lavavajillas.'
  },
  {
    id: 'p15',
    title: 'Termo Lumilagro Clásico 1L · Acero',
    price: 12000,
    stock: 18,
    category: 'termos',
    image: pexels(10939968),
    description: 'Fabricación nacional argentina. Doble pared al vacío. Conserva temperatura por 12hs. Pico vertedor anti-goteo. Base antideslizante. Repuestos disponibles.'
  },
  {
    id: 'p16',
    title: 'Termo Contigo West Loop 750ml',
    price: 22000,
    stock: 8,
    category: 'termos',
    image: pexels(35992195),
    description: 'Sistema AUTOSEAL anti-derrame. Una mano para abrir/cerrar. Acero inoxidable premium. Mantiene calor 5hs. Apto para auto. Libre de BPA. Garantía 2 años.'
  },
  {
    id: 'p17',
    title: 'Termo Waterdog Familiar 1.2L',
    price: 9500,
    stock: 20,
    category: 'termos',
    image: pexels(35965453),
    description: 'Gran capacidad para compartir. Doble pared aislante. Tapa rosca hermética. Conserva temperatura 8hs. Acero inoxidable 304. Excelente relación precio-calidad.'
  },

  // Accesorios Materos
  {
    id: 'p18',
    title: 'Azucarera Artesanal de Quebracho',
    price: 4500,
    stock: 15,
    category: 'accesorios',
    image: pexels(3359197),
    description: 'Tallada en madera de quebracho colorado. Tapa hermética con imán. Cuchara de algarrobo incluida. Capacidad: 200g. Tratamiento anti-humedad. Diseño tradicional del NOA.'
  },
  {
    id: 'p19',
    title: 'Yerbera Gaucha de Cuero Repujado',
    price: 6800,
    stock: 12,
    category: 'accesorios',
    image: pexels(8279921),
    description: 'Cuero vacuno curtido vegetal. Repujado a mano con motivos criollos. Cierre magnético invisible. Capacidad: 500g. Forro interior impermeable. Correa ajustable.'
  },
  {
    id: 'p21',
    title: 'Porta Mate Patagónico de Cuero',
    price: 3200,
    stock: 18,
    category: 'accesorios',
    image: pexels(33181410),
    description: 'Cuero de guanaco sintético. Forro acolchado interno. Cierre con velcro reforzado. Mosquetón para enganchar. Colores: marrón, negro, bordó. Lavable.'
  },
  {
    id: 'p22',
    title: 'Bandeja Matera "El Fogón"',
    price: 8900,
    stock: 10,
    category: 'accesorios',
    image: pexels(33183922),
    description: 'Madera de caldén con lustre natural. Espacios para mate, bombilla, azúcar y yerba. Dimensiones: 25x15cm. Patas antideslizantes. Grabado láser personalizable.'
  },

  // Sets Materos Completos
  {
    id: 'p23',
    title: 'Set Matero "Primer Mate" · Iniciación',
    price: 15800,
    stock: 8,
    category: 'sets',
    image: pexels(13526973),
    description: 'Kit completo para principiantes: mate de calabaza curado + bombilla de alpaca + yerba Amanda 500g + termo Waterdog 750ml + instructivo ilustrado + video tutorial QR.'
  },
  {
    id: 'p24',
    title: 'Set Matero "El Patrón" · Premium',
    price: 35000,
    stock: 5,
    category: 'sets',
    image: pexels(33181412),
    description: 'Colección de lujo: mate de algarrobo tallado + bombilla de plata + termo Stanley + yerbera de cuero + azucarera + bandeja + yerba premium. Estuche de madera.'
  },
  {
    id: 'p25',
    title: 'Set Matero "Ruta 40" · Viajero',
    price: 22500,
    stock: 7,
    category: 'sets',
    image: pexels(16358504),
    description: 'Kit portátil: mate camionero + termo compacto + yerbera plegable + kit limpieza + yerba en sachets x20 + bolso organizador impermeable. Ideal para aventuras.'
  },

  // Mates de Colección
  {
    id: 'p26',
    title: 'Mate Ancestral de Asta Patagónica',
    price: 28000,
    stock: 3,
    category: 'mates',
    image: pexels(8279935),
    description: 'Tallado en asta de búfalo de la Patagonia. Pieza única numerada. Grabados tehuelches auténticos. Virola de plata mapuche. Certificado de origen. Estuche de cuero crudo.'
  },
  {
    id: 'p27',
    title: 'Mate de Porcelana "Tradición Porteña"',
    price: 16500,
    stock: 6,
    category: 'mates',
    image: pexels(25436250),
    description: 'Porcelana de Limoges francesa. Diseños de fileteado porteño. Doble pared térmica. Base de silicona antideslizante. Apto microondas y lavavajillas. Edición limitada.'
  },
  {
    id: 'p28',
    title: 'Mate Térmico "Innovación Gaucha"',
    price: 19800,
    stock: 9,
    category: 'mates',
    image: pexels(787670),
    description: 'Tecnología de doble pared al vacío. Mantiene yerba a temperatura ideal por 2hs. Acero inoxidable 316L. Indicador LED de temperatura. Base magnética. Carga USB.'
  }
]
