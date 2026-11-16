// Modelo de cualificación del funnel: UNA sola fuente de verdad.
// Para un cliente nuevo solo se editan QUESTIONS, OBJETIVO y la regla de qualifies().
// Salen del cierre del VSL / de lo que el cliente define como "sí es cliente" (no inventar).
//
// Cada respuesta viaja a GHL como `<key>` (valor interno) y `<key>_label` (texto legible:
// es el que se mapea en los campos personalizados). Ver references/contrato-ghl.md de la skill.
// Los `value` son estables: si GHL ya está mapeado, NO renombrarlos (solo agregar).

export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  key: string
  title: string
  /** Etiqueta corta para la nota del CRM */
  noteLabel: string
  options: readonly QuestionOption[]
}

export const QUESTIONS = [
  {
    key: 'proforma',
    title: '¿Ya tienes la proforma de tu proveedor?',
    noteLabel: 'Proforma',
    options: [
      { value: 'tiene_proforma', label: 'Sí, ya tengo la proforma' },
      { value: 'producto_sin_proforma', label: 'Tengo el producto identificado, pero aún no la proforma' },
      { value: 'sin_producto', label: 'Todavía no sé qué producto traer' },
    ],
  },
  {
    key: 'inversion',
    title: '¿Cuánto piensas invertir aproximadamente en la mercadería?',
    noteLabel: 'Inversión',
    options: [
      { value: 'menos_1k', label: 'Menos de $1,000' },
      { value: '1k_5k', label: 'Entre $1,000 y $5,000' },
      { value: '5k_15k', label: 'Entre $5,000 y $15,000' },
      { value: 'mas_15k', label: 'Más de $15,000' },
    ],
  },
  {
    key: 'plazo',
    title: '¿Para cuándo lo necesitas?',
    noteLabel: 'Para cuándo',
    options: [
      { value: 'este_mes', label: 'Lo antes posible, este mes' },
      { value: '1_3_meses', label: 'En 1 a 3 meses' },
      { value: 'mas_3_meses', label: 'En más de 3 meses' },
    ],
  },
] as const satisfies readonly Question[]

/** Último paso: pregunta abierta (va a GHL como `objetivo`). */
export const OBJETIVO = {
  title: '¿Qué quieres importar?',
  placeholder: 'Ej: 20 paneles de escalada desde China, ya tengo la proforma del proveedor',
  minWords: 4,
}

export type QuestionKey = (typeof QUESTIONS)[number]['key']
export type Answers = Record<QuestionKey, string>

export const emptyAnswers = (): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.key, ''])) as Answers

export function labelFor(key: QuestionKey, value: string): string {
  const q = QUESTIONS.find((x) => x.key === key)
  return q?.options.find((o) => o.value === value)?.label ?? value
}

// ── Regla de cualificación ────────────────────────────────────────────────────
// VSL: "es para ti si ya tienes un producto identificado, idealmente con una proforma".
// Solo se descarta a quien todavía no sabe qué producto traer. Inversión y plazo no descartan:
// sirven para preparar la llamada. (Pendiente: confirmar con ARLOGS si "menos de $1,000" descarta.)
const DISQUALIFY: Partial<Record<QuestionKey, readonly string[]>> = {
  proforma: ['sin_producto'],
}

export function qualifies(a: Answers): boolean {
  return (Object.keys(DISQUALIFY) as QuestionKey[]).every(
    (k) => !(DISQUALIFY[k] ?? []).includes(a[k]),
  )
}
