export type FontRole = {
  label: string
  stack: string
}

export type FontPreviewPairing = {
  id: string
  label: string
  description: string
  heading: FontRole
  body: FontRole
  ui: FontRole
}

export const FONT_PREVIEW_STORAGE_KEY = 'foundry-font-preview-pairing'

const systemSans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"

export const fontPreviewPairings: FontPreviewPairing[] = [
  {
    id: 'foundry-modern',
    label: 'Foundry Modern',
    description: 'Confident startup/corporate pairing with strong architectural headings.',
    heading: { label: 'Saira Condensed', stack: "'Saira Condensed', Impact, sans-serif" },
    body: { label: 'Inter', stack: "'Inter', " + systemSans },
    ui: { label: 'Space Mono', stack: "'Space Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
  },
  {
    id: 'executive-sans',
    label: 'Executive Sans',
    description: 'Clean SaaS style with polished, readable text and crisp controls.',
    heading: { label: 'Montserrat', stack: "'Montserrat', " + systemSans },
    body: { label: 'Inter', stack: "'Inter', " + systemSans },
    ui: { label: 'DM Sans', stack: "'DM Sans', " + systemSans },
  },
  {
    id: 'product-led',
    label: 'Product Led',
    description: 'Friendly startup UI with a rounded, contemporary feel.',
    heading: { label: 'Poppins', stack: "'Poppins', " + systemSans },
    body: { label: 'Inter', stack: "'Inter', " + systemSans },
    ui: { label: 'Manrope', stack: "'Manrope', " + systemSans },
  },
  {
    id: 'venture-ui',
    label: 'Venture UI',
    description: 'Modern SaaS pairing with warm geometry and high clarity.',
    heading: { label: 'Plus Jakarta Sans', stack: "'Plus Jakarta Sans', " + systemSans },
    body: { label: 'Inter', stack: "'Inter', " + systemSans },
    ui: { label: 'DM Sans', stack: "'DM Sans', " + systemSans },
  },
  {
    id: 'studio-minimal',
    label: 'Studio Minimal',
    description: 'Portfolio-friendly, calm, and elegant without feeling decorative.',
    heading: { label: 'Raleway', stack: "'Raleway', " + systemSans },
    body: { label: 'Lora', stack: "'Lora', Georgia, serif" },
    ui: { label: 'Inter', stack: "'Inter', " + systemSans },
  },
  {
    id: 'editorial-tech',
    label: 'Editorial Tech',
    description: 'Premium editorial headings with practical product UI.',
    heading: { label: 'Playfair Display', stack: "'Playfair Display', Georgia, serif" },
    body: { label: 'Inter', stack: "'Inter', " + systemSans },
    ui: { label: 'Manrope', stack: "'Manrope', " + systemSans },
  },
  {
    id: 'corporate-trust',
    label: 'Corporate Trust',
    description: 'Dependable enterprise style with excellent long-form readability.',
    heading: { label: 'Merriweather', stack: "'Merriweather', Georgia, serif" },
    body: { label: 'Source Sans 3', stack: "'Source Sans 3', " + systemSans },
    ui: { label: 'Inter', stack: "'Inter', " + systemSans },
  },
  {
    id: 'premium-build',
    label: 'Premium Build',
    description: 'Refined property/construction pairing with quiet luxury.',
    heading: { label: 'Cormorant Garamond', stack: "'Cormorant Garamond', Georgia, serif" },
    body: { label: 'Manrope', stack: "'Manrope', " + systemSans },
    ui: { label: 'Inter', stack: "'Inter', " + systemSans },
  },
  {
    id: 'bold-launch',
    label: 'Bold Launch',
    description: 'High-impact landing page style for strong first impressions.',
    heading: { label: 'Bebas Neue', stack: "'Bebas Neue', Impact, sans-serif" },
    body: { label: 'Inter', stack: "'Inter', " + systemSans },
    ui: { label: 'DM Sans', stack: "'DM Sans', " + systemSans },
  },
  {
    id: 'industrial-edge',
    label: 'Industrial Edge',
    description: 'Strong, direct, and useful for technical or building brands.',
    heading: { label: 'Anton', stack: "'Anton', Impact, sans-serif" },
    body: { label: 'Roboto', stack: "'Roboto', " + systemSans },
    ui: { label: 'Archivo', stack: "'Archivo', " + systemSans },
  },
  {
    id: 'balanced-scale',
    label: 'Balanced Scale',
    description: 'Reliable corporate/product mix that works across dense pages.',
    heading: { label: 'Archivo', stack: "'Archivo', " + systemSans },
    body: { label: 'Work Sans', stack: "'Work Sans', " + systemSans },
    ui: { label: 'Inter', stack: "'Inter', " + systemSans },
  },
  {
    id: 'soft-saas',
    label: 'Soft SaaS',
    description: 'Approachable and modern, good for service businesses and startups.',
    heading: { label: 'Manrope', stack: "'Manrope', " + systemSans },
    body: { label: 'Nunito Sans', stack: "'Nunito Sans', " + systemSans },
    ui: { label: 'DM Sans', stack: "'DM Sans', " + systemSans },
  },
  {
    id: 'clean-growth',
    label: 'Clean Growth',
    description: 'Neutral, spacious, and common in modern growth-stage websites.',
    heading: { label: 'Outfit', stack: "'Outfit', " + systemSans },
    body: { label: 'Inter', stack: "'Inter', " + systemSans },
    ui: { label: 'Figtree', stack: "'Figtree', " + systemSans },
  },
  {
    id: 'precision-platform',
    label: 'Precision Platform',
    description: 'Technical platform feel with compact UI and sturdy headings.',
    heading: { label: 'IBM Plex Sans', stack: "'IBM Plex Sans', " + systemSans },
    body: { label: 'IBM Plex Sans', stack: "'IBM Plex Sans', " + systemSans },
    ui: { label: 'Space Mono', stack: "'Space Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
  },
  {
    id: 'portfolio-polish',
    label: 'Portfolio Polish',
    description: 'Expressive portfolio pairing with readable editorial body copy.',
    heading: { label: 'Oswald', stack: "'Oswald', Impact, sans-serif" },
    body: { label: 'Lora', stack: "'Lora', Georgia, serif" },
    ui: { label: 'Montserrat', stack: "'Montserrat', " + systemSans },
  },
  {
    id: 'humanist-pro',
    label: 'Humanist Pro',
    description: 'Warm corporate pairing for trustworthy service pages.',
    heading: { label: 'Raleway', stack: "'Raleway', " + systemSans },
    body: { label: 'Open Sans', stack: "'Open Sans', " + systemSans },
    ui: { label: 'Inter', stack: "'Inter', " + systemSans },
  },
  {
    id: 'global-product',
    label: 'Global Product',
    description: 'International SaaS feel with broad character support.',
    heading: { label: 'Noto Sans', stack: "'Noto Sans', " + systemSans },
    body: { label: 'Noto Sans', stack: "'Noto Sans', " + systemSans },
    ui: { label: 'Inter', stack: "'Inter', " + systemSans },
  },
  {
    id: 'public-sector',
    label: 'Public Sector',
    description: 'Clear, accessible, and professional for corporate information sites.',
    heading: { label: 'Public Sans', stack: "'Public Sans', " + systemSans },
    body: { label: 'Source Sans 3', stack: "'Source Sans 3', " + systemSans },
    ui: { label: 'Public Sans', stack: "'Public Sans', " + systemSans },
  },
  {
    id: 'future-brand',
    label: 'Future Brand',
    description: 'Contemporary brand system with a clean digital character.',
    heading: { label: 'Urbanist', stack: "'Urbanist', " + systemSans },
    body: { label: 'Manrope', stack: "'Manrope', " + systemSans },
    ui: { label: 'DM Sans', stack: "'DM Sans', " + systemSans },
  },
  {
    id: 'classic-startup',
    label: 'Classic Startup',
    description: 'A proven startup pairing: bold sans headings, comfortable text.',
    heading: { label: 'Poppins', stack: "'Poppins', " + systemSans },
    body: { label: 'Roboto', stack: "'Roboto', " + systemSans },
    ui: { label: 'Montserrat', stack: "'Montserrat', " + systemSans },
  },
]

export function findFontPreviewPairing(id: string | null) {
  return fontPreviewPairings.find((font) => font.id === id) ?? null
}

export function getFontPreviewCss(pairings = fontPreviewPairings) {
  return `(function(){try{var k='${FONT_PREVIEW_STORAGE_KEY}';var id=localStorage.getItem(k);var pairings=${JSON.stringify(pairings)};var p=pairings.find(function(f){return f.id===id});if(!p)return;var root=document.documentElement;root.setAttribute('data-font-preview-active','true');root.setAttribute('data-font-preview-pairing',p.id);root.style.setProperty('--display',p.heading.stack);root.style.setProperty('--body',p.body.stack);root.style.setProperty('--mono',p.ui.stack);root.style.setProperty('--font-heading',p.heading.stack);root.style.setProperty('--font-paragraph',p.body.stack);root.style.setProperty('--font-span',p.body.stack);root.style.setProperty('--font-button',p.ui.stack);root.style.setProperty('--font-mono',p.ui.stack)}catch(e){}})();`
}
