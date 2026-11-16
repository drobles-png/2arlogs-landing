# ARLOGS — Landing 2 · "La Ruta ARLOGS" (funnel VSL de agenda)

Cliente Bakano **ARLOGS** (logística de importación, Guayaquil). Habla **Ángel Rodríguez**.
Creada desde la plantilla `drobles-png/landings-vsl` (skill `landings-vsl`). La landing 1
(`arlogs-landing`, masterclass de $20 con Payphone) es otro repo; esta NO cobra.
Estrategia en Metrics: venta de ticket alto · objetivo **citas agendadas**.

## Flujo
```
/            landing + registro → GHL contacto (registro) · CompleteRegistration
/ver-video   VSL Wistia hnck8wn24b + formulario → GHL cualificación · Lead (si califica)
  ├ califica    → /agendar (calendario GHL juIoDHRJl4kJXiC7oWyB) → /cita-confirmada · Schedule
  └ no califica → /sin-espacio (cooldown 24 h)
```
Stack, convenciones y envíos: ver README de la plantilla. Config en `src/config/funnel.ts`,
textos en `src/content/copy.ts`, preguntas en `src/utils/qualification.ts`.

## Config
- Pixel `1791691808756260` · CAPI token solo en `.env.local` y Vercel (`META_CAPI_TOKEN`).
- Webhooks GHL (subcuenta `TvW9G67TrCg2VD5ZORoO`): contacto `…PUsDVYOWIJLzZkdpblb8`,
  cualificación `…NhFFAXICHPte9CnIB`.
- `FUNNEL_TAG` `funnel-arlogs-ruta` · `STORAGE_PREFIX` `ar2` · dominio previsto
  `arlogs-lng.vercel.app` (la landing 1 ahora es `arlogs-masterclas.vercel.app`).

## Cualificación (del cierre del VSL)
`proforma` (tiene_proforma / producto_sin_proforma / sin_producto) · `inversion` (menos_1k / 1k_5k /
5k_15k / mas_15k) · `plazo` (este_mes / 1_3_meses / mas_3_meses) · `objetivo` = ¿qué quieres importar?
**Descalifica solo `proforma = sin_producto`** ("es para ti si ya tienes un producto identificado").
Los `value` no se renombran una vez mapeados en GHL.

## Diseño
Distinto a la landing 1 (navy + Lato): fondo claro tipo papel, Anton (títulos) + Montserrat (texto)
de la ficha + IBM Plex Mono (cifras). Recurso propio: los 3 paneles inclinados del logo (azul, índigo,
naranja) en el hero, los marcadores de la ruta y la foto; hoja de costos con puntos guía.
4 secciones: hero → tres números (paneles de escalada) → Ruta ARLOGS (4 paradas) → Ángel (cifras,
"es para ti si…", cinta de lo que han traído).

## Pendientes
- Portada del video: fotograma del VSL (la foto real de Ángel va en su sección).
- Confirmar con ARLOGS si "menos de $1,000" de inversión descalifica.
- Datos legales: razón social, RUC, correo.
- Revisar workflows de GHL "OBTENER CONTACTO | funnel", "OBTENER CUALIFICACIÓN | funnel", "CALENDARIO | FUNNEL" con una prueba real (con permiso). CAPI sale de la landing (GHL no tiene la acción de Meta).
