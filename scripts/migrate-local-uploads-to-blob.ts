import 'dotenv/config'

import { put } from '@vercel/blob'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import path from 'path'
import { readFile } from 'fs/promises'

const LOCAL_UPLOAD_RE = /\/assets\/uploads\/[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp|gif)/gi

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DIRECT_URL or DATABASE_URL is required.')
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error('BLOB_READ_WRITE_TOKEN is required to upload local files to Vercel Blob.')
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

function uniqueLocalUploadUrls(...values: Array<string | null | undefined>) {
  const urls = new Set<string>()

  for (const value of values) {
    if (!value) continue
    const matches = value.match(LOCAL_UPLOAD_RE) ?? []
    for (let index = 0; index < matches.length; index += 1) {
      urls.add(matches[index])
    }
  }

  return Array.from(urls)
}

function contentTypeFor(filename: string) {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.gif') return 'image/gif'
  return 'application/octet-stream'
}

async function uploadLocalUrl(localUrl: string) {
  const filename = path.basename(localUrl)
  const filePath = path.join(process.cwd(), 'public', 'assets', 'uploads', filename)
  const file = await readFile(filePath)

  const blob = await put(`uploads/migrated-${Date.now()}-${filename}`, file, {
    access: 'public',
    contentType: contentTypeFor(filename),
  })

  return blob.url
}

async function main() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      slug: true,
      featuredImage: true,
      content: true,
    },
  })

  const urlMap = new Map<string, string>()
  let updatedPosts = 0

  for (const post of posts) {
    const localUrls = uniqueLocalUploadUrls(post.featuredImage, post.content)
    if (localUrls.length === 0) continue

    let nextFeaturedImage = post.featuredImage
    let nextContent = post.content

    for (const localUrl of localUrls) {
      let blobUrl = urlMap.get(localUrl)
      if (!blobUrl) {
        blobUrl = await uploadLocalUrl(localUrl)
        urlMap.set(localUrl, blobUrl)
        console.log(`Uploaded ${localUrl} -> ${blobUrl}`)
      }

      if (nextFeaturedImage === localUrl) {
        nextFeaturedImage = blobUrl
      }

      nextContent = nextContent.split(localUrl).join(blobUrl)
    }

    await prisma.post.update({
      where: { id: post.id },
      data: {
        featuredImage: nextFeaturedImage,
        content: nextContent,
      },
    })

    updatedPosts += 1
    console.log(`Updated post: ${post.slug}`)
  }

  console.log(`Done. Uploaded ${urlMap.size} image(s), updated ${updatedPosts} post(s).`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
