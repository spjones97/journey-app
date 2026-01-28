import kjvRaw from '@/assets/bible/KJV.json'
import asvRaw from '@/assets/bible/ASV.json'
import webRaw from '@/assets/bible/WEB.json'

export type BibleVersion = 'KJV' | 'ASV' | 'WEB'

const normalize = (mod: any) => mod.default ?? mod

const BIBLES: Record<BibleVersion, any> = {
    KJV: normalize(kjvRaw),
    ASV: normalize(asvRaw),
    WEB: normalize(webRaw),
}

export function getBooks(version: BibleVersion): string[] {
    return BIBLES[version].books.map((b: any) => b.name)
}

export function getChapterCount(
    version: BibleVersion,
    book: string
): number {
    const bookData = BIBLES[version].books.find(
        (b: any) => b.name === book
    )
    return bookData ? bookData.chapters.length : 0
}

export function getChapter(
    version: BibleVersion,
    book: string,
    chapter: number
): string[] {
    const bookData = BIBLES[version].books.find(
        (b: any) => b.name === book
    )
    if (!bookData) return []

    const chapterData = bookData.chapters.find(
        (c: any) => c.chapter === chapter
    )
    if (!chapterData) return []

    return chapterData.verses.map((v: any) => v.text)
}

export function getTranslationInfo(version: BibleVersion): string {
    return BIBLES[version].translation
}

