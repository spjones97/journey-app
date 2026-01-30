import { fetchBible } from "./r2Bible";

export type BibleVersion = string;

const CACHE: Record<string, any> = {};
const META_CACHE: Record<string, string> = {};

/* ---------------- LOAD FULL BIBLE ---------------- */

async function getBible(version: BibleVersion) {
    if (!CACHE[version]) {
        const bible = await fetchBible(version);
        CACHE[version] = bible;

        if (bible.translation) {
            META_CACHE[version] = bible.translation;
        }
    }

    return CACHE[version];
}

/* ---------------- BOOK HELPERS ---------------- */

export async function getBooks(version: BibleVersion) {
    const bible = await getBible(version);
    return bible.books.map((b: any) => b.name);
}

export async function getChapterCount(
    version: BibleVersion,
    book: string
) {
    const bible = await getBible(version);

    const bookData = bible.books.find((b: any) => b.name === book);
    return bookData ? bookData.chapters.length : 0;
}

export async function getChapter(
    version: BibleVersion,
    book: string,
    chapter: number
) {
    const bible = await getBible(version);

    const bookData = bible.books.find((b: any) => b.name === book);
    if (!bookData) return [];

    const chapterData = bookData.chapters.find(
        (c: any) => c.chapter === chapter
    );

    if (!chapterData) return [];

    return chapterData.verses.map((v: any) => v.text);
}

/* ---------------- TRANSLATION META ---------------- */

export async function getTranslationInfo(version: BibleVersion) {
    if (META_CACHE[version]) return META_CACHE[version];

    const bible = await getBible(version);
    return bible.translation ?? version;
}

/* ---------------- VERSION LIST ---------------- */

export async function getAllTranslations(
    versions: BibleVersion[]
) {
    const result: Record<string, string> = {};

    await Promise.all(
        versions.map(async (v) => {
            result[v] = await getTranslationInfo(v);
        })
    );

    return result;
}
