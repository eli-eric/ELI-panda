#!/usr/bin/env node
// Walks docs/, mirrors its hierarchy into a flat wiki layout, rewrites internal
// markdown links to wiki page slugs, copies image assets, and emits a _Sidebar.md.
//
// Usage:
//   WIKI_OUT=/path/to/wiki-checkout node scripts/sync-wiki.mjs
//
// Conventions:
//   docs/Home.md                                          -> Home.md
//   docs/<top>/README.md                                  -> <Top>.md
//   docs/<top>/<file>.md                                  -> <Top>-<File>.md
//   docs/<top>/<sub>/README.md                            -> <Top>-<Sub>.md
//   docs/<top>/<sub>/<group>/<file>.md                    -> <Top>-<Sub>-<File>.md  (selected groups skipped)
//   docs/<any>/images/<file>.png                          -> images/<any>-images-<file>.png
//
// Because the wiki is a flat namespace, images are flattened the same way pages
// are and every relative image link is rewritten to the flattened name.
//
// Folder display names and skipped groups are configured in DISPLAY_NAMES and
// SKIP_FOLDERS below.

import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('.')
const DOCS = path.join(ROOT, 'docs')
const WIKI_OUT = process.env.WIKI_OUT || path.join(ROOT, '.wiki-out')

// Folders skipped entirely (no wiki output for any file inside).
const SKIP_TREES = new Set(['_template', 'implementation-plans'])

// Folders whose name is dropped from the slug (children appear directly under parent slug).
const SKIP_FOLDERS = new Set(['workflows'])

// Asset types copied verbatim into the wiki's flat images/ folder.
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'])

// Subfolder of the wiki checkout that receives the flattened assets.
const WIKI_IMAGE_DIR = 'images'

const DISPLAY_NAMES = {
    'user-guide': 'User-Guide',
    systemHierarchy: 'System-Hierarchy',
    systemsRelations: 'Systems-Relations',
    systemsMoving: 'Systems-Moving',
    systemsMultiMove: 'Systems-Multi-Move',
    systemTypeEdit: 'System-Type-Edit',
    roomCards: 'Room-Cards',
    controlSystems: 'Control-Systems',
    technical: 'Technical-Documentation',
}

function capFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function segmentToSlug(seg) {
    if (DISPLAY_NAMES[seg]) return DISPLAY_NAMES[seg]
    return capFirst(seg)
}

function relPathToSlug(relPath) {
    if (relPath === 'Home.md') return 'Home'
    const parts = relPath.replace(/\.md$/, '').split('/')
    const filtered = parts.filter((p) => !SKIP_FOLDERS.has(p))
    if (filtered[filtered.length - 1] === 'README') filtered.pop()
    return filtered.map(segmentToSlug).join('-')
}

async function walk(dir) {
    const out = []
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const e of entries) {
        if (SKIP_TREES.has(e.name)) continue
        const p = path.join(dir, e.name)
        if (e.isDirectory()) {
            out.push(...(await walk(p)))
        } else if (e.name.endsWith('.md')) {
            out.push(p)
        }
    }
    return out
}

async function walkImages(dir) {
    const out = []
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const e of entries) {
        if (SKIP_TREES.has(e.name)) continue
        const p = path.join(dir, e.name)
        if (e.isDirectory()) {
            out.push(...(await walkImages(p)))
        } else if (IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase())) {
            out.push(p)
        }
    }
    return out
}

// docs/user-guide/zones/images/zones-list.png -> images/user-guide-zones-images-zones-list.png
function imageRelToWikiName(relPath) {
    return `${WIKI_IMAGE_DIR}/${relPath.split('/').join('-')}`
}

function resolveLink(currentSrcAbs, linkPath, manifest) {
    if (
        linkPath.startsWith('http://') ||
        linkPath.startsWith('https://') ||
        linkPath.startsWith('mailto:') ||
        linkPath.startsWith('#')
    ) {
        return null
    }
    const [pathPart, hash] = linkPath.split('#')
    if (!pathPart || !pathPart.endsWith('.md')) return null
    const targetAbs = path.resolve(path.dirname(currentSrcAbs), pathPart)
    const targetRel = path.relative(DOCS, targetAbs)
    const slug = manifest[targetRel]
    if (!slug) return null
    return hash ? `${slug}#${hash}` : slug
}

function resolveImage(currentSrcAbs, linkPath, imageManifest) {
    if (
        linkPath.startsWith('http://') ||
        linkPath.startsWith('https://') ||
        linkPath.startsWith('data:')
    ) {
        return null
    }
    const [pathPart] = linkPath.split('#')
    if (!pathPart) return null
    if (!IMAGE_EXTENSIONS.has(path.extname(pathPart).toLowerCase())) return null
    const targetAbs = path.resolve(path.dirname(currentSrcAbs), pathPart)
    const targetRel = path.relative(DOCS, targetAbs).split(path.sep).join('/')
    return imageManifest[targetRel] ?? null
}

function rewriteLinks(content, srcAbs, manifest, imageManifest) {
    // Images first: ![alt](path) is also matched by the link pattern below.
    const withImages = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, link) => {
        const resolved = resolveImage(srcAbs, link, imageManifest)
        if (resolved === null) return full
        return `![${alt}](${resolved})`
    })

    return withImages.replace(/(!?)\[([^\]]+)\]\(([^)]+)\)/g, (full, bang, text, link) => {
        if (bang) return full
        const resolved = resolveLink(srcAbs, link, manifest)
        if (resolved === null) return full
        return `[${text}](${resolved})`
    })
}

function buildSidebar(manifest) {
    const groups = {}
    for (const rel of Object.keys(manifest)) {
        if (rel === 'Home.md') continue
        const top = rel.split('/')[0]
        if (!groups[top]) groups[top] = []
        groups[top].push(rel)
    }

    const ordered = ['user-guide', 'technical', ...Object.keys(groups).filter((g) => !['user-guide', 'technical'].includes(g))]

    let out = '## ELI PANDA\n\n[Home](Home)\n\n'

    for (const top of ordered) {
        const items = groups[top]
        if (!items) continue
        const topSlug = relPathToSlug(`${top}/README.md`)
        const topTitle = (DISPLAY_NAMES[top] || capFirst(top)).replace(/-/g, ' ')
        out += `### [${topTitle}](${topSlug})\n\n`

        const others = items
            .filter((rel) => rel !== `${top}/README.md`)
            .sort((a, b) => a.localeCompare(b))
        for (const rel of others) {
            const slug = manifest[rel]
            // Use the file's basename (or, for README under a sub-folder, the parent folder name)
            const segs = rel.replace(/\.md$/, '').split('/').filter((p) => !SKIP_FOLDERS.has(p))
            if (segs[segs.length - 1] === 'README') segs.pop()
            const lastSeg = segs[segs.length - 1]
            const displayName = (DISPLAY_NAMES[lastSeg] || capFirst(lastSeg)).replace(/-/g, ' ')
            const indent = '  '.repeat(Math.max(0, segs.length - 2))
            out += `${indent}- [${displayName}](${slug})\n`
        }
        out += '\n'
    }

    out += '\n---\n\n*Sources in [`docs/`](https://github.com/eli-eric/ELI-panda/tree/dev/docs); auto-synced on merge to `dev`.*\n'
    return out
}

async function main() {
    const files = await walk(DOCS)
    const manifest = {}
    for (const f of files) {
        const rel = path.relative(DOCS, f).split(path.sep).join('/')
        manifest[rel] = relPathToSlug(rel)
    }

    const images = await walkImages(DOCS)
    const imageManifest = {}
    for (const f of images) {
        const rel = path.relative(DOCS, f).split(path.sep).join('/')
        imageManifest[rel] = imageRelToWikiName(rel)
    }

    await fs.mkdir(WIKI_OUT, { recursive: true })
    await fs.mkdir(path.join(WIKI_OUT, WIKI_IMAGE_DIR), { recursive: true })

    const existing = await fs.readdir(WIKI_OUT).catch(() => [])
    for (const name of existing) {
        if (name.endsWith('.md')) {
            await fs.unlink(path.join(WIKI_OUT, name))
        }
    }

    // Drop assets that no longer exist in docs/ so the wiki does not accumulate orphans.
    const keep = new Set(Object.values(imageManifest).map(n => path.basename(n)))
    const existingImages = await fs.readdir(path.join(WIKI_OUT, WIKI_IMAGE_DIR)).catch(() => [])
    for (const name of existingImages) {
        if (!keep.has(name)) {
            await fs.unlink(path.join(WIKI_OUT, WIKI_IMAGE_DIR, name))
        }
    }

    for (const f of files) {
        const rel = path.relative(DOCS, f).split(path.sep).join('/')
        const slug = manifest[rel]
        const raw = await fs.readFile(f, 'utf8')
        const rewritten = rewriteLinks(raw, f, manifest, imageManifest)
        await fs.writeFile(path.join(WIKI_OUT, `${slug}.md`), rewritten)
    }

    for (const f of images) {
        const rel = path.relative(DOCS, f).split(path.sep).join('/')
        await fs.copyFile(f, path.join(WIKI_OUT, imageManifest[rel]))
    }

    await fs.writeFile(path.join(WIKI_OUT, '_Sidebar.md'), buildSidebar(manifest))

    console.log(`Synced ${files.length} pages and ${images.length} images to ${WIKI_OUT}`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
