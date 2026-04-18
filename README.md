# Domotic E Ingeniería

> Tecnología a tu alcance — domótica, cámaras de seguridad, cerraduras inteligentes y puertas automáticas en Pereira, Risaralda.

E-commerce + landing de servicios para [Domotic E Ingeniería](#). Stack 100% en tiers gratuitos (Next.js + Supabase + Vercel).

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript** estricto
- **Tailwind CSS v4** + **shadcn/ui**
- **Supabase** — Postgres + Auth + Storage + RLS
- **Zustand** — estado del carrito con persist a `localStorage`
- **Zod + react-hook-form** — validación de formularios
- **Wompi** — pasarela de pagos (modo sandbox)
- **Resend** — correos transaccionales (tier gratis)
- **Vercel** — hosting + CI/CD

## Setup local

```bash
pnpm install
# Configurá las variables de entorno (ver bloque de abajo)
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Qué hace |
|--------|----------|
| `pnpm dev` | Servidor de desarrollo con Turbopack |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint con auto-fix |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm format` | Prettier sobre todo el repo |
| `pnpm format:check` | Verifica formato sin cambiar archivos |

## Variables de entorno

Creá un archivo `.env.local` en la raíz con el siguiente contenido (los valores los rellenás con tus keys reales):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Wompi — pasarela colombiana (sandbox/prod)
WOMPI_PUBLIC_KEY=
WOMPI_PRIVATE_KEY=
WOMPI_EVENTS_SECRET=

# Email transaccional (Resend tier gratis)
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# WhatsApp — formato internacional sin espacios: +573001234567
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

> Importante: `.env.local` está ignorado por git. **Nunca** lo commitees. Las claves `SERVICE_ROLE_KEY` y `WOMPI_PRIVATE_KEY` son de servidor — no las expongas con prefijo `NEXT_PUBLIC_`.

## Estructura

```
app/                      → rutas y layouts (App Router)
components/
  ui/                     → primitivos de shadcn/ui
  layout/                 → navbar, footer, wrappers
  shared/                 → componentes de negocio reutilizables
lib/
  supabase/               → clients (browser/server) y queries
  constants.ts            → SITE, CONTACT, SHIPPING, helpers
  utils.ts                → cn() y utilitarios
types/                    → tipos globales + tipos de Supabase
supabase/
  migrations/             → SQL versionado
  seeds/                  → datos iniciales (productos, servicios, categorías)
assets/                   → logo y recursos de marca (no públicos)
public/                   → estáticos públicos
```

## Branding

Paleta derivada del logo (fondo negro + acentos):

| Token Tailwind | Hex | Uso |
|----------------|-----|-----|
| `brand-black` | `#000000` | fondo principal |
| `brand-cyan` | `#06b6d4` | CTA primario, badges |
| `brand-magenta` | `#ec4899` | acentos, destacados |
| `brand-yellow` | `#facc15` | alertas, promos |
| `brand-green` | `#22c55e` | éxito, stock disponible |

Dark mode por defecto. Tipografía: Geist (ya configurada via `next/font`).

## Deploy

1. Conectá el repo a Vercel.
2. Cargá las variables de entorno del bloque de arriba.
3. Push a `main` → deploy de producción.
4. PRs → preview deploy automático.

## Roadmap por fases

- [x] **Fase 0** — Setup del proyecto
- [ ] **Fase 1** — Supabase (migraciones, RLS, seeds, tipos)
- [ ] **Fase 2** — Layout global (Navbar, Footer, WhatsApp flotante)
- [ ] **Fase 3** — Páginas públicas estáticas (Home, Servicios, Contacto, legales)
- [ ] **Fase 4** — Catálogo + detalle de producto
- [ ] **Fase 5** — Carrito + Checkout (Wompi + WhatsApp)
- [ ] **Fase 6** — Auth y cuenta de usuario
- [ ] **Fase 7** — Cotizaciones
- [ ] **Fase 8** — Panel admin
- [ ] **Fase 9** — SEO, performance, pulido
- [ ] **Fase 10** — CI/CD y documentación final
