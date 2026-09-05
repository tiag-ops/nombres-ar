// Guías editoriales de NombresAR.
// La guía legal cita el Código Civil y Comercial (arts. 62–64), vigente desde 2015
// (la Ley 18.248 de nombre de pila está derogada). Los datos son de RENAPER.

export interface Guia {
  slug: string;
  titulo: string;
  resumen: string;
  secciones: { h: string; p: string[] }[];
}

export const GUIAS: Guia[] = [
  {
    slug: "nombres-mas-populares-argentina",
    titulo: "Los nombres más elegidos en Argentina (2012–2024)",
    resumen:
      "Ranking oficial RENAPER: quién encabeza el podio, cómo cambió la lista en doce años y qué nombres dominan por provincia.",
    secciones: [
      {
        h: "El ranking nacional",
        p: [
          "Los datos oficiales de RENAPER (Dirección Nacional de Población) muestran el top de nombres por año de nacimiento desde 2012. Benjamín lidera el ránking histórico reciente: 259.663 registros en el período 2012–2024, con un pico de 9.921 en 2013.",
          "Le siguen Valentina (160.448), Jazmín (154.797) y Mateo (147.928). Es decir: el podio está dividido casi por mitades entre nombres masculinos y femeninos, con una particularidad argentina muy marcada: Bautista, un nombre reservado casi exclusivamente al Río de la Plata, está en el top 10.",
        ],
      },
      {
        h: "Lo que cambió en doce años",
        p: [
          "Entre 2012 y 2024 la lista se renovó por completo en la cima. En 2012 Nicolás era el nombre masculino N°1 del país; para 2024 quedó fuera del podio. El cambio más violento es Bautista: +24,9% de variación interanual en 2024, tras años de crecimiento sostenido.",
          "Del lado femenino, Isabella llegó a ser la niña más inscripta del país en 2018 y conserva una posición de elite: 8.379 registros en 2024, segundo puesto general.",
        ],
      },
      {
        h: "Nombres que van y nombres que vuelven",
        p: [
          "Los clásicos (Juan, María, Nicolás, Sofía) siguen presentes pero pierden participación año a año frente a la ola de nombres cortos y de sonoridad internacional (Gael, Noah, Liam, Emma, Mia, Alma).",
          "Santiago mantiene una presencia histórica fuerte, y nombres como Thiago y Santino, de raíz italiana y brasileña, se consolidaron en la década. La tendencia de fondo: nombres de tres sílabas, final en vocal, y fuerte influencia del fútbol y de las series en la elección.",
        ],
      },
      {
        h: "Por provincia, también cambia",
        p: [
          "El top nacional no cuenta toda la historia: cada jurisdicción tiene su propia lista. Los nombres criollos y compuestos pesan más en el interior, mientras CABA y Buenos Aires concentran los nombres de moda internacional.",
          "En cada ficha de nombre de este sitio podés ver el top 3 de provincias donde más se usa, calculado con los mismos datos oficiales.",
        ],
      },
    ],
  },
  {
    slug: "como-elegir-el-nombre-del-bebe",
    titulo: "Cómo elegir el nombre del bebé: qué tener en cuenta",
    resumen:
      "Guía práctica para decidir el nombre: legalidad, pronunciación, familia, apellido y los datos que muestran qué eligen los argentinos.",
    secciones: [
      {
        h: "Antes de enamorarte de un nombre",
        p: [
          "La elección del nombre es una de las decisiones más personales de la vida, pero conviene chequear un par de cosas objetivas: que sea legal en Argentina (ver nuestra guía de nombres prohibidos), que suene bien con el apellido completo y que resista el paso del tiempo (y de la escuela).",
          "Los datos de RENAPER ayudan a cubrir otra pregunta práctica: ¿es un nombre de moda que va a compartir con muchos compañeros, o es raro y único? En este sitio podés ver cuántos niños se llamaron así cada año desde 2012.",
        ],
      },
      {
        h: "Sonido y combinación con el apellido",
        p: [
          "Pronunciá el nombre completo en voz alta, varias veces. Los expertos en onomástica recomiendan evitar la rima entre nombre y apellido, verificar que no forme siglas desafortunadas con las iniciales y probar cómo suena la versión diminutiva (porque la van a usar sus amigos).",
          "Si el apellido es largo, un nombre corto suele funcionar mejor; si el apellido es común, un nombre distintivo ayuda a individualizar.",
        ],
      },
      {
        h: "¿Nombre de familia o de moda?",
        p: [
          "Homenajear a un abuelo o una abuela es la motivación más frecuente detrás de la elección y explica por qué los clásicos nunca desaparecen del ranking aunque pierdan participación.",
          "Si te gusta un nombre de moda, mirá la tendencia: los datos públicos muestran cuánto sube o baja cada nombre año a año. Algunos explotan en dos o tres años y luego se retiran; otros se instalan por décadas.",
        ],
      },
      {
        h: "Los límites legales que sí importan",
        p: [
          "En Argentina el Código Civil y Comercial regula la elección: hasta tres prenombres, sin apellidos como prenombres, sin nombres extravagantes y sin repetir el prenombre de un hermano vivo. Los nombres aborígenes y sus derivados están permitidos.",
          "Nada de esto debería preocuparte si elegís entre los nombres del ranking, pero te recomendamos leer la guía legal completa antes de registrarlo.",
        ],
      },
    ],
  },
  {
    slug: "nombres-prohibidos-argentina",
    titulo: "Nombres prohibidos en Argentina: qué dice la ley",
    resumen:
      "La Ley 18.248 quedó derogada. Hoy rige el Código Civil y Comercial (arts. 62 a 64). Qué nombres no se pueden inscribir y cuáles sí.",
    secciones: [
      {
        h: "El marco legal vigente",
        p: [
          "Desde 2015, la elección del nombre se rige por el Código Civil y Comercial de la Nación (Ley 26.994). La vieja Ley 18.248, que durante décadas reguló el nombre de pila, fue derogada por el artículo 4 de la misma ley que sancionó el nuevo Código, junto con sus reformas (20.668, 23.162, 23.264 y 23.515).",
          "El artículo 62 establece que toda persona tiene el deber y el derecho de usar el prenombre y el apellido que le corresponden. El artículo 63 regula la elección del prenombre y el 64 el apellido de los hijos.",
        ],
      },
      {
        h: "Artículo 63: las reglas del prenombre",
        p: [
          "La elección del prenombre corresponde a los padres, y a falta de ellos, a las personas autorizadas, los guardadores, el Ministerio Público o el Registro del Estado Civil y Capacidad de las Personas según el caso.",
          "Las reglas que limitan la elección son: no pueden inscribirse más de tres prenombres; tampoco pueden inscribirse apellidos como prenombres; no pueden inscribirse prenombres idénticos a los de hermanos vivos; y no pueden inscribirse nombres extravagantes, ridículos, contrarios a nuestras costumbres, que expresen o signifiquen tendencias políticas o ideológicas, o que susciten equívocos respecto del sexo de la persona a quien se impone.",
          "El mismo artículo admite expresamente los nombres aborígenes o derivados de voces aborígenes autóctonas y latinoamericanas, siempre que no contraríen esas prohibiciones.",
        ],
      },
      {
        h: "Artículo 64: el apellido de los hijos",
        p: [
          "El hijo nacido en el matrimonio lleva el apellido de uno de los progenitores. Si no hay acuerdo, los oficiales del Registro del Estado Civil y Capacidad de las Personas deciden por sorteo cuál apellido se impone.",
          "Todos los hijos de un mismo matrimonio deben llevar el apellido con el que se inscribió el primero. El hijo extramatrimonial lleva el apellido del progenitor que lo reconoció.",
        ],
      },
      {
        h: "Mitos comunes sobre nombres prohibidos",
        p: [
          "Mito 1: «debe tener al menos un nombre cristiano». Falso: la ley no exige nombres religiosos.",
          "Mito 2: «no se pueden poner nombres extranjeros». Falso: la antigua Ley 18.248 los restringía, pero el Código Civil y Comercial vigente no contiene esa prohibición. Hoy se inscriben sin problema nombre como Liam, Noah, Emma o Gael.",
          "Mito 3: «los jueces deben aprobar el nombre». Falso: la inscripción se hace directamente en el Registro Civil; la intervención judicial es la excepción, no la regla.",
          "Si el Registro deniega un nombre, los padres pueden recurrir ante el juez competente.",
        ],
      },
    ],
  },
  {
    slug: "segundo-nombre-y-composiciones",
    titulo: "Segundo nombre y composiciones: los límites y la costumbre argentina",
    resumen:
      "Hasta tres prenombres permite el Código Civil y Comercial. Cómo se arman los compuestos clásicos (María José, Ana María, Juan Manuel) y qué dice la costumbre argentina.",
    secciones: [
      {
        h: "Cuántos nombres se pueden poner",
        p: [
          "El artículo 63 del Código Civil y Comercial fija el límite en tres prenombres. Es un máximo: se puede poner uno solo, dos o tres.",
          "Una particularidad argentina: el Registro Civil considera los compuestos tradicionales (María del Carmen, Juan José, Ana Luz) como un único prenombre. Por eso la combinación «María de los Ángeles» no cuenta como cuatro nombres: figura como compuesto.",
        ],
      },
      {
        h: "Los compuestos que nunca mueren",
        p: [
          "María encabeza los femeninos de vida larga en Argentina: su fuerza histórica está en los compuestos. Aunque María como único nombre desciende cada año, María José, María Clara, María Emilia y Ana María mantienen uso estable en todo el país.",
          "Del lado masculino, Juan es el gran generador de compuestos: Juan Manuel, Juan Pablo, Juan Ignacio y Juan Cruz son clásicos del interior y de la Ciudad de Buenos Aires por igual.",
        ],
      },
      {
        h: "Dos nombres: ¿moda o tradición?",
        p: [
          "Los datos de RENAPER muestran que la composición de dos nombres sigue siendo la forma dominante de inscripción en Argentina, incluso cuando cada nombre por separado pasa de moda.",
          "Para la elección del segundo nombre sirven las mismas reglas que para el primero: legalidad, sonoridad y combinación con el apellido. Los límites del artículo 63 aplican a la suma total de prenombres.",
        ],
      },
    ],
  },
  {
    slug: "evolucion-nombres-2012-2024",
    titulo: "Evolución de los nombres de bebé en Argentina (2012–2024)",
    resumen:
      "El análisis completo de la década: cuáles explotaron, cuáles se retiraron, el efecto de los nombres cortos y de dónde salió Bautista.",
    secciones: [
      {
        h: "La transformación de la lista",
        p: [
          "En 2012 los nombres masculinos que dominaban eran Nicolás, Agustín y Mateo. Para 2024 la cima es otra: Benjamín, Mateo y una irrupción notable de Bautista, que duplicó su participación en diez años.",
          "La lista femenina cambió menos de superficie pero mucho de fondo: Jazmín reinó en 2012, Isabella tomó el puesto N°1 en 2018 y hoy Valentina e Isabella se disputan la punta con nombres breves como Mia, Emma y Alma pisando fuerte.",
        ],
      },
      {
        h: "Los que más crecieron y los que más cayeron",
        p: [
          "La tasa de uso por cada 1.000 nacimientos permite comparar años con distinto total de nacimientos (Argentina pasó de 1,38 millones de nacimientos en 2012 a 662 mil en 2024).",
          "Nombres como Gael, Noah, Liam, Ian y Aitana multiplicaron su tasa. En el extremo opuesto, los clásicos pesados (Juan, María, Nicolás, Sebastián, Agustín) perdieron más de la mitad de su participación en la década.",
        ],
      },
      {
        h: "Ciclos cortos vs. clásicos largos",
        p: [
          "Los datos muestran dos patrones: los nombres de explosión rápida (un pico en 3–5 años y retiro paulatino) y los clásicos de larga duración que se mantienen con variaciones suaves. Jazmín es el caso más claro de ciclo completo: N°1 femenino en 2012, fuera del podio en 2024.",
          "En cada ficha de nombre de este sitio podés ver la curva completa 2012–2024 y la tendencia: sube (▲), estable (→) o baja (▼).",
        ],
      },
    ],
  },
  {
    slug: "tasa-por-mil-nacimientos",
    titulo: "Qué significa la tasa cada 1.000 nacimientos",
    resumen:
      "La métrica que usan los demógrafos y cómo la aplicamos en este sitio con los datos oficiales de RENAPER para comparar años distintos.",
    secciones: [
      {
        h: "Por qué no sirve comparar números absolutos",
        p: [
          "Entre 2012 y 2024 los nacimientos en Argentina cayeron de 1.384.256 a 662.466. Si un nombre mantiene el mismo número absoluto de registros, en realidad está creciendo en participación, porque se reparte sobre una base mucho más chica.",
          "La tasa cada 1.000 nacimientos resuelve eso: divide la cantidad de bebés inscriptos con ese nombre en un año por el total de nacimientos de ese año, y multiplica por 1.000. Es la medida estándar de la demografía y la que usa la propia metodología de RENAPER.",
        ],
      },
      {
        h: "Un ejemplo con números reales",
        p: [
          "Benjamín tuvo 8.835 registros en 2024. El total de nacimientos de ese año fue 662.466. La cuenta es 8.835 / 662.466 × 1.000 = 13,34‰. Es decir: de cada 1.000 bebés nacidos en Argentina en 2024, 13 se llamaron Benjamín.",
          "La misma tasa se puede calcular para cualquier año y comparar series largas sin distorsión. Por eso en este sitio la evolución siempre se muestra al lado de la curva absoluta, para que veas ambas lecturas.",
        ],
      },
      {
        h: "Qué no incluye esta métrica",
        p: [
          "La tasa se calcula sobre los registros de nacimiento con nombre conocido. RENAPER agrupa en una categoría separada los nombres que aparecen una sola vez (su efecto es despreciable sobre las tasas de los nombres frecuentes, pero existe).",
          "Además, la estadística cuenta inscripciones, no personas: si un bebé lleva dos nombres, cada registro figura en la estadística de cada nombre. Es una convención oficial de RENAPER.",
        ],
      },
    ],
  },
];

export function guiaPorSlug(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}