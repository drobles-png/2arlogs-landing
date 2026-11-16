// Textos de la página. Un cliente nuevo edita SOLO este archivo (y config/funnel.ts).
// Todo lo que está entre [corchetes] es un marcador: reemplazar con lo que dice el VSL del cliente.
// No inventar cifras, testimonios, garantías ni bonos.
import { BRAND_NAME, PERSON_NAME } from '@/config/funnel'

export interface Testimonial {
  name: string
  role: string
  quote: string
  /** Resultado concreto que dijo el testimonio (opcional): "+30% en ventas" */
  result?: string
  photo?: string
}

export interface TeamMember {
  name: string
  role: string
  bio?: string
  photo?: string
}

export const SEO = {
  landing: {
    title: `${BRAND_NAME} | Conoce el costo real de tu importación antes de comprar`,
    description:
      'Si ya tienes un producto o una proforma de tu proveedor, conoce cuánto te cuesta de verdad ponerlo en tu bodega en Ecuador antes de comprar.',
  },
  video: {
    title: `Mira el video | ${BRAND_NAME}`,
    description: 'Cómo trabajamos una importación, cuánto cuesta y cuál es el siguiente paso.',
  },
  booking: { title: `Agenda tu llamada | ${BRAND_NAME}`, description: 'Elige el día y la hora.' },
  booked: { title: `Llamada confirmada | ${BRAND_NAME}`, description: 'Tu llamada está confirmada.' },
  noSpace: { title: `Todavía no es el momento | ${BRAND_NAME}`, description: 'Gracias por tu interés.' },
  pago: { title: `Confirma tu lugar | ${BRAND_NAME}`, description: 'Completa tu inscripción.' },
  confirmada: { title: `Inscripción confirmada | ${BRAND_NAME}`, description: 'Tu lugar está confirmado.' },
  privacy: { title: `Política de privacidad | ${BRAND_NAME}`, description: `Política de privacidad de ${BRAND_NAME}.` },
  legal: { title: `Aviso legal | ${BRAND_NAME}`, description: `Aviso legal de ${BRAND_NAME}.` },
}

// ── Landing (/) ───────────────────────────────────────────────────────────────
export const LANDING = {
  topbarTag: 'Logística de importación',
  // Temporizador del encabezado (components/CountdownTimer.vue). short = versión de celular.
  timer: { label: 'Revisión de casos', short: 'Revisión', prefix: 'Cierra en' },
  headline: 'Antes de comprar,',
  headlineAccent: 'conoce el número real.',
  sub: 'Si ya hablaste con un proveedor en China, tienes una proforma en la mano o sabes qué producto quieres traer, te explico cuánto te va a costar de verdad ponerlo aquí en Ecuador.',
  videoCaption: 'Cómo trabajamos una importación, cuánto cuesta y cuál es el siguiente paso',
  cta: 'Ver el video completo',
  ctaNote: 'Solo te pedimos tus datos para mostrártelo',

  // Banda: el caso de los paneles de escalada (VSL, tercer paso)
  example: {
    title: 'Tres números en la mesa',
    lead: 'Un cliente quería traer veinte paneles de escalada. Con estos tres números, la decisión es mucho más fácil.',
    rows: [
      { label: 'En China', note: '20 paneles × $175', value: '$3,500' },
      { label: 'Puestos en Guayaquil', note: 'Con todo', value: '≈ $5,500', key: true },
      { label: 'Comprados aquí', note: 'A alguien que ya los trae', value: '$9,900' },
    ],
    outro: 'Revisamos juntos los números y me encargó toda la importación.',
  },

  // La Ruta ARLOGS (VSL: cuatro pasos)
  route: {
    title: 'La Ruta ARLOGS',
    lead: 'Cuatro pasos con un mismo objetivo: que sepas exactamente cuánto te cuesta tu producto antes de comprarlo, y que llegue hasta tu bodega sin sorpresas.',
    items: [
      {
        code: 'PROFORMA',
        title: 'Analizamos tu producto',
        text: 'Nos cuentas qué quieres traer, y si ya tienes la proforma de tu proveedor, mucho mejor. Identificamos la partida arancelaria y el tratamiento que le va a dar la aduana.',
      },
      {
        code: 'LANDED COST',
        title: 'Calculamos el costo puesto en tu bodega',
        text: 'Desde que sale de tu proveedor hasta que llega a tu bodega. No hasta el puerto: hasta tu bodega. Puede tomar varios días.',
        tag: 'Análisis: $40',
      },
      {
        code: 'DECISIÓN',
        title: 'Decides con números',
        text: 'Precio en China, costo puesto aquí y lo que te cobran localmente. Esa decisión es tuya.',
      },
      {
        code: 'BODEGA',
        title: 'Lo traemos hasta tu bodega',
        text: 'Flete internacional, gastos locales, coordinación con la agencia de aduana, transporte interno y almacenaje. Todo a tu nombre.',
      },
    ],
    cta: 'Quiero conocer mi número real',
  },

  // Quién habla
  about: {
    title: 'Solo importaciones, de principio a fin',
    lead: 'Soy Ángel, de ARLOGS. Nos dedicamos a la logística y al comercio exterior, y trabajamos únicamente con importaciones: prefiero trabajar solo con lo que puedo controlar de principio a fin.',
    quote: 'No te cobro según lo que vale tu mercadería, sino según el espacio que ocupa.',
    figures: [
      { value: '$40', label: 'el análisis: partida, tratamiento y costo real puesto en tu bodega' },
      { value: '$800–900', label: 'nuestro servicio de logística en una primera importación (sin producto ni tributos)' },
      { value: '≈ 1 m³', label: 'ocupaba un robot soldador de más de $15,000, y se cobró como una carga pequeña' },
    ],
    cargo: [
      'Robots soldadores',
      'Máquinas de corte de metal',
      'Tornos',
      'Motores y piezas especializadas',
      'Máquinas de empaquetado y troquelado',
      'Vending machines',
      'Máquinas para lavar y secar zapatos',
      'Paneles solares con el equipo completo',
    ],
    fitTitle: 'Es para ti si…',
    fit: [
      'Ya tienes un producto identificado, idealmente con una proforma de tu proveedor.',
      'Quieres saber el costo real antes de comprar.',
      'Quieres que alguien se encargue de todo y que todo quede a tu nombre.',
      'Ves la importación como una inversión, no como una apuesta.',
    ],
    cta: 'Ver el video completo',
  },

  // Opcionales de la plantilla (sin items no se muestran): solo testimonios y equipo reales
  testimonials: { eyebrow: '', title: '', items: [] as Testimonial[] },
  team: { eyebrow: '', title: '', items: [] as TeamMember[] },

  sticky: { title: 'Conoce el número real', sub: `Video de ${PERSON_NAME}`, cta: 'Ver video' },
  disclaimer:
    'Los resultados dependen de cada caso. Este sitio no está respaldado por Meta Platforms, Inc. ni forma parte de Facebook.',
}

// ── Modal de registro ─────────────────────────────────────────────────────────
export const REGISTRO = {
  eyebrow: 'La Ruta ARLOGS',
  title: 'Mira el video completo',
  sub: 'Te explico cómo trabajamos una importación, cuánto cuesta y cuál es el siguiente paso.',
  submit: 'Ver el video completo',
  submitPago: 'Continuar',
  legal: 'Tus datos están seguros · No spam',
}

// ── /ver-video ────────────────────────────────────────────────────────────────
export const VIDEO = {
  step: 'Paso 1 de 2',
  eyebrow: `${PERSON_NAME} · ${BRAND_NAME}`,
  title: 'Antes de comprar, conoce el número real',
  sub: 'Quédate hasta el final. Debajo del video está el formulario para revisar tu caso.',
  lockText: 'El formulario se habilita en',
  cta: 'Quiero que revisen mi caso',
  trust: 'Revisamos tu caso y te contactamos para agendar una llamada',
}

// ── Cualificación (las preguntas están en utils/qualification.ts) ─────────────
export const CUALIFICACION = {
  eyebrow: 'Empecemos tu Ruta ARLOGS',
  title: 'Cuéntanos de tu importación',
  sub: 'Una pregunta a la vez. Te toma un minuto.',
  consent: `Acepto que ${BRAND_NAME} me contacte por WhatsApp y correo, y acepto su`,
  submit: 'Ver horarios disponibles',
}

// ── /agendar ──────────────────────────────────────────────────────────────────
export const BOOKING = {
  step: 'Paso 2 de 2',
  title: 'Elige tu horario',
  sub: 'Revisamos tu producto, tu proveedor, tus números y tu objetivo.',
  pending:
    'Estamos terminando de configurar el calendario. Te escribiremos por WhatsApp para coordinar tu llamada.',
}

// ── /cita-confirmada ──────────────────────────────────────────────────────────
export const BOOKED = {
  title: 'Tu llamada está confirmada',
  sub: 'Te enviamos los detalles a tu correo.',
  steps: [
    { icon: 'fa-solid fa-envelope', title: 'Revisa tu correo', text: 'Ahí tienes la fecha, la hora y el enlace.' },
    { icon: 'fa-brands fa-whatsapp', title: 'Te escribimos por WhatsApp', text: 'Para confirmar y resolver dudas antes.' },
    {
      icon: 'fa-solid fa-file-invoice-dollar',
      title: 'Ten a mano tu proforma',
      text: 'Si ya la tienes, con ella sabemos cuánto te costaría tu producto puesto aquí.',
    },
  ],
}

// ── /sin-espacio ──────────────────────────────────────────────────────────────
export const NO_SPACE = {
  title: 'Todavía no es el momento, y está bien',
  text: 'Para revisar tu caso necesitamos un producto identificado. Cuando sepas qué quieres traer, aquí estamos.',
  cooldown: 'Ya enviaste una solicitud. Podrás intentarlo de nuevo en',
  resourcesTitle: `Sigue aprendiendo con ${BRAND_NAME}`,
  resourcesText: 'Síguenos en nuestras redes.',
}

// ── Pago (opcional) ───────────────────────────────────────────────────────────
export const PAGO = {
  step: 'Paso 2 de 2 · Confirma tu lugar',
  title: 'falta un paso para confirmar tu lugar',
  sub: 'Tu lugar queda reservado cuando completas el pago.',
  bullets: ['[Formato: en vivo, en línea]', '[Qué se lleva el asistente]'],
  noLink: 'Recibimos tus datos. Te enviaremos el enlace de pago a tu WhatsApp y a tu correo.',
  whatsappMsg: (nombre: string) => `Hola, soy ${nombre}. Me registré y quiero completar mi pago.`,
  expired: 'El formulario de pago venció por seguridad. Ábrelo de nuevo para pagar.',
  loadError: 'No pudimos cargar el pago. Inténtalo de nuevo o escríbenos.',
}

export const CONFIRMADA = {
  title: 'Tu lugar está confirmado',
  steps: [
    { icon: 'fa-solid fa-envelope-open-text', text: 'Revisa tu correo: ahí te llega la confirmación y el acceso.' },
    { icon: 'fa-brands fa-whatsapp', text: 'Te escribiremos por WhatsApp antes de empezar.' },
    { icon: 'fa-solid fa-list-check', text: '[Qué preparar antes del evento]' },
  ],
  calendarTitle: '¿Prefieres que veamos tu caso? Agenda una reunión',
  calendarButton: 'Agendar una reunión',
  // Solo con Payphone: estados mientras se confirma el pago o si no se aprobó
  checking: 'Confirmando tu pago…',
  checkingSub: 'No cierres esta página, toma unos segundos.',
  failedTitle: 'Tu pago no se completó',
  failedSub: 'Payphone no aprobó el cobro. Puedes intentarlo de nuevo con otra tarjeta.',
  nodataTitle: 'No encontramos un pago en este enlace',
  nodataSub: 'Si ya pagaste, te llega la confirmación a tu correo. Si no, completa tu pago aquí.',
  errorTitle: 'No pudimos confirmar tu pago',
  errorSub: 'Si se te descontó el dinero, escríbenos con este número de transacción y lo revisamos.',
  helpMsg: (nombre: string, tx: string) =>
    `Hola, soy ${nombre}. Pagué y no me aparece confirmado${tx ? ` (transacción ${tx})` : ''}.`,
}
