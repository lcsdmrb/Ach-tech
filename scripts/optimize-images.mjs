/**
 * Script d'optimisation des images — Ach'Tech
 * Usage : node scripts/optimize-images.mjs
 *
 * - Redimensionne les images trop grandes (max 1920px)
 * - Compresse JPEG à 82%, PNG converti en JPEG si > 500KB
 * - Conserve les originaux avec suffix .bak
 */

import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'fs/promises'
import { join, extname, basename, dirname } from 'path'
import { existsSync } from 'fs'

const PUBLIC = new URL('../public', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const TARGETS = [
  { dir: 'hero',         maxW: 1920, jpegQ: 82, pngToJpeg: true  },
  { dir: 'realisations', maxW: 1200, jpegQ: 80, pngToJpeg: true  },
  { dir: 'kitchen',      maxW: 1280, jpegQ: 80, pngToJpeg: false },
  { dir: '',             maxW: 512,  jpegQ: 90, pngToJpeg: false, files: ['logo.png','logo-v2.png'] },
]

async function processFile(filePath, maxW, jpegQ, pngToJpeg) {
  const ext  = extname(filePath).toLowerCase()
  const name = basename(filePath, ext)
  const dir  = dirname(filePath)

  const before = (await stat(filePath)).size

  try {
    const img = sharp(filePath)
    const meta = await img.metadata()

    if (!meta.width) { console.log(`  SKIP (no meta): ${basename(filePath)}`); return }

    const needsResize = meta.width > maxW
    let pipeline = needsResize ? img.resize(maxW, null, { withoutEnlargement: true }) : img

    let outPath = filePath

    if (ext === '.png' && pngToJpeg && before > 300 * 1024) {
      // Convertir PNG lourd en JPEG
      outPath = join(dir, name + '.jpg')
      await pipeline.jpeg({ quality: jpegQ, progressive: true, mozjpeg: true }).toFile(outPath + '.tmp')
      await rename(filePath, filePath + '.bak')
      await rename(outPath + '.tmp', outPath)
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: jpegQ, progressive: true, mozjpeg: true }).toFile(filePath + '.tmp')
      await rename(filePath + '.tmp', filePath)
    } else if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(filePath + '.tmp')
      await rename(filePath + '.tmp', filePath)
    } else {
      return
    }

    const after = (await stat(outPath)).size
    const pct   = Math.round((1 - after / before) * 100)
    console.log(`  ✓ ${basename(filePath)} → ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${pct}%)`)
  } catch (err) {
    console.error(`  ✗ ${basename(filePath)}: ${err.message}`)
  }
}

async function run() {
  console.log('🖼  Optimisation des images Ach\'Tech\n')

  for (const target of TARGETS) {
    const dirPath = join(PUBLIC, target.dir)
    console.log(`📁 ${target.dir || 'public/'} (max ${target.maxW}px, q${target.jpegQ}):`)

    if (target.files) {
      for (const f of target.files) {
        const fp = join(dirPath, f)
        if (existsSync(fp)) await processFile(fp, target.maxW, target.jpegQ, target.pngToJpeg)
      }
    } else {
      try {
        const entries = await readdir(dirPath)
        for (const entry of entries) {
          const fp  = join(dirPath, entry)
          const ext = extname(entry).toLowerCase()
          if (['.jpg','.jpeg','.png','.webp'].includes(ext)) {
            await processFile(fp, target.maxW, target.jpegQ, target.pngToJpeg)
          }
        }
      } catch { console.log('  (dossier absent)') }
    }
    console.log()
  }

  console.log('✅ Terminé. Les fichiers .bak peuvent être supprimés une fois les résultats vérifiés.')
}

run()
