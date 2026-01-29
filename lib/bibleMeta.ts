import kjvRaw from "@/assets/bible/KJV.json";
import asvRaw from "@/assets/bible/ASV.json";
import webRaw from "@/assets/bible/Webster.json";
import type { BibleVersion } from "./bible";

const normalize = (mod: any) => mod.default ?? mod;

const BIBLES: Record<BibleVersion, any> = {
    KJV: normalize(kjvRaw),
    ASV: normalize(asvRaw),
    WEB: normalize(webRaw),
};

/* ------------------ BOOK HELPERS ------------------ */

export function getBooks(version: BibleVersion): string[] {
    return BIBLES[version]?.books?.map((b: any) => b.name) ?? [];
}

export function getChapterCount(
    version: BibleVersion,
    book: string
): number {
    const bookData = BIBLES[version]?.books?.find(
        (b: any) => b.name === book
    );

    if (!bookData) return 0;
    return bookData.chapters.length;
}

/* ------------------ NEW: TRANSLATION META ------------------ */

export function getTranslationDescription(
    version: BibleVersion
): string {
    return BIBLES[version]?.translation ?? version;
}

export function getAllTranslations(): Record<
    BibleVersion,
    string
> {
    return {
        KJV: getTranslationDescription("KJV"),
        ASV: getTranslationDescription("ASV"),
        WEB: getTranslationDescription("WEB"),
    };
}

export { BIBLES };
