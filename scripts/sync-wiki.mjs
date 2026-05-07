#!/usr/bin/env node
// Walks docs/, mirrors its hierarchy into a flat wiki layout, rewrites internal
// markdown links to wiki page slugs, and emits a _Sidebar.md.
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

const DISPLAY_NAMES = {
    'user-guide': 'User-Guide',
    systemHierarchy: 'System-Hierarchy',
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

function rewriteLinks(content, srcAbs, manifest) {
    return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, text, link) => {
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

    await fs.mkdir(WIKI_OUT, { recursive: true })

    const existing = await fs.readdir(WIKI_OUT).catch(() => [])
    for (const name of existing) {
        if (name.endsWith('.md')) {
            await fs.unlink(path.join(WIKI_OUT, name))
        }
    }

    for (const f of files) {
        const rel = path.relative(DOCS, f).split(path.sep).join('/')
        const slug = manifest[rel]
        const raw = await fs.readFile(f, 'utf8')
        const rewritten = rewriteLinks(raw, f, manifest)
        await fs.writeFile(path.join(WIKI_OUT, `${slug}.md`), rewritten)
    }

    await fs.writeFile(path.join(WIKI_OUT, '_Sidebar.md'), buildSidebar(manifest))

    console.log(`Synced ${files.length} pages to ${WIKI_OUT}`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
