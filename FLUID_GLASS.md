# Fluid glass integration

The site uses the stable Liquid Glass APIs from `blackwork@0.13.0` and
`@blackwork/docs@0.6.0`.

- Header: full-width rounded glass surface with SVG refraction in Chrome, a
  subtle fluid navigation highlight, and uniform 36-pixel icon buttons.
- Home: the original content remains; the duplicate demo navigation was removed.
- Search: Command-K, a floating glass panel, an inline aligned close button,
  readable results, and Escape.
- Mobile: floating glass menu panel, navigation grid, and close button.

Start locally:

```sh
pnpm exec next dev --webpack -p 4833
```

The standard `blackwork/tailwind.css` import includes the glass styles. Chromium
uses the SVG edge-refraction path; Safari and Firefox use Blackwork's frosted
fallback. Check the header, search dialog, navigation sheet, category actions,
and music player in light and dark themes at desktop and mobile widths.
