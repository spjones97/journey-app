import kjvRaw from '@/assets/bible/KJV.json'
import asvRaw from '@/assets/bible/ASV.json'
import webRaw from '@/assets/bible/WEB.json'
import type { BibleVersion } from './bible'

const normalize = (mod: any) => mod.default ?? mod

const BIBLES: Record<BibleVersion, any> = {
    KJV: normalize(kjvRaw),
    ASV: normalize(asvRaw),
    WEB: normalize(webRaw),
}

export function getBooks(version: BibleVersion): string[] {
    return Object.keys(BIBLES[version] ?? {})
}

export function getChapterCount(
    version: BibleVersion,
    book: string
): number {
    const bookData = BIBLES[version]?.[book]
    if (!bookData) return 0
    return Object.keys(bookData).length
}
