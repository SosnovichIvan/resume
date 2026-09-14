# Resume Site — Design System

Source of truth for the visual redesign. Page overrides, when present in `pages/`, take precedence.

## Direction

- Product: personal portfolio for a Senior Frontend Engineer / Team Lead with AI-assisted delivery experience.
- Pattern: scroll-driven engineering story — promise, proof, expertise, selected work, writing, current role, contact.
- Style: precise editorial bento. Visible grid, strong typography, restrained motion, no decorative gradients competing with content.
- Themes: graphite + mint in dark mode; ivory + terracotta in light mode.

## Tokens

| Role | Light | Dark |
| --- | --- | --- |
| Background | `#F3EFE7` | `#0B1014` |
| Surface | `#FFFDF9` | `#11181D` |
| Elevated surface | `#F7F2EA` | `#0D1418` |
| Border | `#D9D3C8` | `#263138` |
| Text | `#0F172A` | `#F8FAFC` |
| Muted text | `#64748B` | `#94A3B8` |
| Primary accent | `#CA6039` | `#72E5CA` |
| Focus ring | `#E17A50` | `#4DD6B9` |

Typography: Manrope for interface and editorial headings; IBM Plex Mono for labels, metadata and technical metrics. Both are loaded once through `next/font` in the root layout.

Spacing uses a 4/8px base. Main content max-width is 1152px. Section rhythm: 64px desktop, 48px mobile. Cards use 20px radius; primary controls use 12px radius and at least 44px touch size.

## Components

- Hero: asymmetric 65/35 split, outcome-led H1, human profile snapshot and four measurable proof points.
- Section heading: numbered mono eyebrow, strong editorial title, optional 44px action.
- Cards: low shadow, visible border, no layout-shifting scale; interactive cards may lift by 2px.
- Featured case: text plus accessible metric bars; meaning must remain available as text.
- CTA: one high-contrast solid surface, one primary action.
- Chips: compact metadata only; do not use chips for paragraphs or core navigation.

## Interaction and accessibility

- All interactive controls have native semantics, visible focus and a minimum 44×44px target.
- Color contrast must meet 4.5:1 for normal text in both themes.
- DOM and reading order stay complete without animation. `prefers-reduced-motion` disables non-essential motion.
- No horizontal page scroll at 375px; cards stack before content becomes cramped.
- Images use `next/image` with intrinsic dimensions or `fill` inside a reserved aspect-ratio container.
- Hover is enhancement only. Links and controls remain understandable without pointer hover.

## Responsive checkpoints

- 375px: single column, two-column proof grid, no clipped chips or actions.
- 768px: comfortable card grids and full section actions.
- 1024px: hero and featured cases switch to split layouts.
- 1440px: content remains constrained to 1152px for readable line length.

## Avoid

- Purple/pink AI gradients, glass everywhere, excessive pills and indistinguishable cards.
- Tiny gray-on-gray text, hidden actions, animation-driven reading order and fake terminal decoration without useful information.
