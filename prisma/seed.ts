import { PrismaClient, Category, PostStatus } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const seedPosts = [
  {
    title: 'The Future of Steel-Framed Housing in New Zealand',
    slug: 'future-steel-framed-housing-nz',
    category: Category.INDUSTRY_INSIGHTS,
    tags: ['steel framing', 'NZ housing', 'innovation'],
    excerpt:
      'Steel framing is redefining modern home construction across New Zealand - stronger, straighter, and built to last a lifetime.',
    content:
      '<p>Steel framing is redefining modern home construction across New Zealand. From coastal homes battling salt air to urban builds demanding precision, the shift away from timber is accelerating.</p><h2>Why Now?</h2><p>The combination of material science improvements, supply chain maturity, and growing builder awareness has made steel the material of choice for forward-thinking builders.</p>',
    featuredImage: '/assets/images/homes/laura-cleffmann-MMQwPNWZbUM-unsplash.jpg',
    status: PostStatus.PUBLISHED,
    author: 'Foundry Team',
    views: 847,
    publishedAt: new Date('2025-06-01'),
  },
  {
    title: 'Why Steel Outperforms Timber in NZ Conditions',
    slug: 'steel-vs-timber-nz',
    category: Category.STEEL_FRAMING,
    tags: ['steel', 'timber', 'comparison', 'NZ'],
    excerpt:
      "From coastal salt air to alpine freeze-thaw cycles, NZ conditions test every building material. Here's why steel consistently wins.",
    content:
      "<p>From coastal salt air to alpine freeze-thaw cycles, NZ conditions test every building material.</p><h2>The Case for Steel</h2><p>Steel doesn't warp, twist, or shrink - meaning your doors keep closing and your walls stay straight, year after year.</p>",
    featuredImage: '/assets/images/homes/tuaans-nDULbGdEwDM-unsplash.jpg',
    status: PostStatus.PUBLISHED,
    author: 'James R.',
    views: 623,
    publishedAt: new Date('2025-05-10'),
  },
  {
    title: 'Designing Your Perfect Granny Flat: 5 Key Considerations',
    slug: 'designing-perfect-granny-flat',
    category: Category.DESIGN,
    tags: ['granny flat', 'design', 'minor dwelling'],
    excerpt:
      'Small footprint, big impact. The key design decisions that separate a great minor dwelling from a mediocre one.',
    content:
      "<p>Small footprint, big impact. Granny flats are one of New Zealand's fastest-growing housing categories.</p>",
    featuredImage: '/assets/images/homes/photorealistic-wooden-house-with-timber-structure.jpg',
    status: PostStatus.PUBLISHED,
    author: 'Sarah M.',
    views: 412,
    publishedAt: new Date('2025-04-18'),
  },
  {
    title: 'Understanding Home Loan Options in NZ',
    slug: 'home-loan-options-nz',
    category: Category.FINANCE,
    tags: ['finance', 'mortgage', 'first home buyer'],
    excerpt:
      'Our finance partner Autumn Financial breaks down what every Kiwi builder should know before signing.',
    content:
      "<p>Finance for your Foundry build - we've partnered with Autumn Financial to make this as straightforward as possible.</p>",
    featuredImage: '/assets/images/homes/point3d-commercial-imaging-ltd-sXMmFigM3p4-unsplash.jpg',
    status: PostStatus.DRAFT,
    author: 'Melanie A.',
    views: 0,
    publishedAt: null,
  },
  {
    title: 'The Complete NZ Building Process, Explained',
    slug: 'complete-nz-building-process',
    category: Category.BUILDING_TIPS,
    tags: ['building process', 'consent', 'NZ build'],
    excerpt:
      'Consent, contract, construction - we walk you through every stage from first concept to handover day.',
    content: '<p>The building process in New Zealand is well-structured once you understand each stage.</p>',
    featuredImage: '/assets/images/homes/phil-hearing-6lvui3Ak-eA-unsplash.jpg',
    status: PostStatus.DRAFT,
    author: 'Foundry Team',
    views: 0,
    publishedAt: null,
  },
  {
    title: 'Modern Family Home in Whangarei - Case Study',
    slug: 'family-home-whangarei-case-study',
    category: Category.CASE_STUDIES,
    tags: ['case study', 'Whangarei', 'family home'],
    excerpt:
      'A 4-bedroom steel-framed family home delivered on time and on budget. See how we handled design, consents, and the full build.',
    content: '<p>This Whangarei build is a great example of what steel-framed construction can achieve.</p>',
    featuredImage: '/assets/images/homes/salman-saqib-93AF-d_y8rI-unsplash.jpg',
    status: PostStatus.PUBLISHED,
    author: 'Foundry Team',
    views: 298,
    publishedAt: new Date('2025-01-08'),
  },
]

async function main() {
  for (const post of seedPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }
  console.log(`Seeded ${seedPosts.length} posts.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
