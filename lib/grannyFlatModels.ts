export type GrannyFlatModel = {
  slug: string
  name: string
  bedrooms: number
  bathrooms: number
  internalArea: number
  externalArea: number
  tagline: string
  heroImage: string
  galleryImages: string[]
  /** Real architectural floor-plan drawing. Falls back to a text-only note when absent. */
  floorPlanImage?: string
  /** Downloadable brochure PDF for this model. */
  brochurePdf?: string
}

export const STANDARD_INCLUSIONS = [
  'Light-gauge steel frame and roof trusses - no timber frame',
  'Vertical timber-look cladding (Duragroove / Niagara profile)',
  'Long-run Coloursteel trapezoid roofing',
  'Thermally broken, double-glazed aluminium joinery throughout',
  'Ceiling and subfloor insulation, plus insulated wall battens',
  'Choice of carpet and vinyl flooring',
  'Melteca kitchen joinery with stone-look benchtops',
  'Acrylic shower, vitreous china toilet, quality tapware',
  'Kitchen appliances fitted as standard',
  'Heat pump included for year-round comfort',
  'Built to NZS 3604 and NASH steel-framing standards',
  "Backed by a 10-year builder's guarantee",
]

export const SERVICE_INCLUSIONS = [
  'Steel frame construction',
  'Full council compliance',
  'Clear price contract',
  'Architectural design',
  'NZ trusted suppliers',
  'Turnkey handover',
]

export const FLOOR_PLAN_NOTE =
  "This is a concept plan based on preliminary information. The final layout may change once we've confirmed your site details and any council requirements."

const modelsWithoutAssets: Omit<GrannyFlatModel, 'floorPlanImage' | 'brochurePdf'>[] = [
  {
    slug: 'foundry-36',
    name: 'Foundry 36',
    bedrooms: 1,
    bathrooms: 1,
    internalArea: 33.95,
    externalArea: 36.45,
    tagline: 'A compact one-bedroom studio built for independent living, a home office, or extra rental income.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_36.jpg',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_2.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_12.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_13.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_14.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_15.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_2.jpg',
    ],
  },
  {
    slug: 'foundry-51',
    name: 'Foundry 51',
    bedrooms: 2,
    bathrooms: 1,
    internalArea: 48.47,
    externalArea: 51.84,
    tagline: 'A two-bedroom minor dwelling with room to breathe, ideal for family or guests close to home.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_51.jpeg',
    galleryImages: [
      '/assets/Internal Renders/25-4721-Foundry-Homes-Standard-Range---51-IR01---Living.jpg',
      '/assets/Internal Renders/25-4721-Foundry-Homes-Standard-Range---51-IR02---Bedroom.jpg',
      '/assets/Internal Renders/25-4721-Foundry-Homes-Standard-Range---51-IR03---Bedroom.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_16.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_17.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_4.jpg',
    ],
  },
  {
    slug: 'foundry-52',
    name: 'Foundry 52',
    bedrooms: 2,
    bathrooms: 1,
    internalArea: 49.07,
    externalArea: 52.06,
    tagline: 'A well-proportioned two-bedroom layout with a slightly larger footprint for everyday comfort.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_52.jpeg',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_18.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_19.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_20.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_21.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_22.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_5.jpg',
    ],
  },
  {
    slug: 'foundry-57',
    name: 'Foundry 57',
    bedrooms: 2,
    bathrooms: 1,
    internalArea: 53.55,
    externalArea: 57.48,
    tagline: 'A spacious two-bedroom minor dwelling with generous living space and storage.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_57.jpeg',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_23.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_24.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_25.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_26.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_27.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing.jpg',
    ],
  },
  {
    slug: 'foundry-59',
    name: 'Foundry 59',
    bedrooms: 2,
    bathrooms: 1,
    internalArea: 55.77,
    externalArea: 59.45,
    tagline: 'A larger two-bedroom option with flexible living zones for growing families.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_59.webp',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_2.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_12.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_13.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_14.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_15.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_2.jpg',
    ],
  },
  {
    slug: 'foundry-62',
    name: 'Foundry 62',
    bedrooms: 3,
    bathrooms: 1,
    internalArea: 59.22,
    externalArea: 62.25,
    tagline: 'A three-bedroom minor dwelling that works as a full family home on a smaller footprint.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_62.jpeg',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_16.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_17.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_18.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_19.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_20.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_4.jpg',
    ],
  },
  {
    slug: 'foundry-69',
    name: 'Foundry 69',
    bedrooms: 3,
    bathrooms: 1,
    internalArea: 65.92,
    externalArea: 69.0,
    tagline: 'A roomier three-bedroom layout with extra living space, well suited to full-time family living.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_69.png',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_21.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_22.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_23.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_24.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_25.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_5.jpg',
    ],
  },
  {
    slug: 'foundry-73',
    name: 'Foundry 73',
    bedrooms: 3,
    bathrooms: 2,
    internalArea: 69.77,
    externalArea: 73.8,
    tagline: 'A three-bedroom, two-bathroom home designed for families who want an ensuite and extra privacy.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_73.jpeg',
    galleryImages: [
      '/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR01---Living.jpg',
      '/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR01---Living_B.jpg',
      '/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR02---Living.jpg',
      '/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR03---Living.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_26.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing.jpg',
    ],
  },
  {
    slug: 'foundry-73b',
    name: 'Foundry 73B',
    bedrooms: 1,
    bathrooms: 1,
    internalArea: 70.0,
    externalArea: 73.54,
    tagline: 'A generously sized one-bedroom home with room for a larger living and kitchen area.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_73(B).jpg',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_27.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_2.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_12.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_13.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_14.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_2.jpg',
    ],
  },
  {
    slug: 'foundry-80',
    name: 'Foundry 80',
    bedrooms: 3,
    bathrooms: 2,
    internalArea: 76.32,
    externalArea: 80.52,
    tagline: 'A larger three-bedroom, two-bathroom home suited to full-time family living on your section.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_80.png',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_15.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_16.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_17.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_18.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_19.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_4.jpg',
    ],
  },
  {
    slug: 'foundry-85',
    name: 'Foundry 85',
    bedrooms: 3,
    bathrooms: 1,
    internalArea: 81.32,
    externalArea: 85.74,
    tagline: 'A spacious three-bedroom home with an expanded floor plan for larger households.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_85.jpeg',
    galleryImages: [
      '/assets/Internal Renders/264819-Foundry-Homes-Standard-Range---85-IR01---Bathroom.jpg',
      '/assets/Internal Renders/264819-Foundry-Homes-Standard-Range---85-IR02---Bathroom.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_20.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_21.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_22.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing_5.jpg',
    ],
  },
  {
    slug: 'foundry-99',
    name: 'Foundry 99',
    bedrooms: 4,
    bathrooms: 2,
    internalArea: 95.65,
    externalArea: 99.57,
    tagline: 'Our largest model - a full four-bedroom, two-bathroom home for families who need the extra space.',
    heroImage: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_99.jpeg',
    galleryImages: [
      '/assets/SHOWHOME/Foundry_Homes_Showhome_23.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_24.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_25.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_26.jpg',
      '/assets/SHOWHOME/Foundry_Homes_Showhome_27.jpg',
      '/assets/Steel imagery/Foundry_Homes_Steel_framing.jpg',
    ],
  },
]

export const grannyFlatModels: GrannyFlatModel[] = modelsWithoutAssets.map((m) => ({
  ...m,
  floorPlanImage: `/assets/floor-plan/${m.slug}.jpg`,
  brochurePdf: `/assets/pdfs/${m.slug}.pdf`,
}))

export const getModelBySlug = (slug: string): GrannyFlatModel | undefined =>
  grannyFlatModels.find((m) => m.slug === slug)
