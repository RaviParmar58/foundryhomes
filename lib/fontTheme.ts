export type FontCollection = {
  heading: string
  paragraph: string
  span: string
  button: string
  mono: string
}

export const oswald = "'Oswald', Impact, sans-serif"
export const saira = "'Saira Condensed', Impact, sans-serif"
export const inter = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
export const roboto = "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
export const spaceMono = "'Space Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
export const playfair = "'Playfair Display', Georgia, serif"
export const lora = "'Lora', Georgia, serif"
export const montserrat = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

export const sansFonts: FontCollection = {
  heading: saira,
  paragraph: inter,
  span: inter,
  button: inter,
  mono: spaceMono,
}

export const serifFonts: FontCollection = {
  heading: playfair,
  paragraph: lora,
  span: lora,
  button: playfair,
  mono: spaceMono,
}

export const modernFonts: FontCollection = {
  heading: saira,
  paragraph: roboto,
  span: roboto,
  button: montserrat,
  mono: spaceMono,
}

export const activeFontCollection = sansFonts

export const activeFontCssVariables = {
  '--font-heading': activeFontCollection.heading,
  '--font-paragraph': activeFontCollection.paragraph,
  '--font-span': activeFontCollection.span,
  '--font-button': activeFontCollection.button,
  '--font-mono': activeFontCollection.mono,
}

export const googleFontHref =
  'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@300;400;500;600;700;800&family=Bebas+Neue&family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700;800&family=Figtree:wght@300;400;500;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Lora:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Merriweather:wght@300;400;700;900&family=Montserrat:wght@500;600;700;800&family=Noto+Sans:wght@300;400;500;600;700;800&family=Nunito+Sans:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700;800&family=Oswald:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Public+Sans:wght@300;400;500;600;700;800&family=Raleway:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700;900&family=Saira+Condensed:wght@500;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&family=Urbanist:wght@300;400;500;600;700;800&family=Work+Sans:wght@300;400;500;600;700;800&display=swap'
