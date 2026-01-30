import type { BibleVersion } from "./bible";
import { fetchBible, fetchAvailableVersions } from "./r2Bible";

/**
 * Returns translation description for ONE version
 */
export async function getTranslationDescription(
    version: BibleVersion
): Promise<string> {
    try {
        const bible = await fetchBible(version);
        return bible.translation ?? version;
    } catch {
        return version;
    }
}

/**
 * Returns ALL versions → translation description map
 */
export async function getAllTranslations(): Promise<
    Record<BibleVersion, string>
> {
    const versions = await fetchAvailableVersions();

    const results = await Promise.all(
        versions.map(async (v) => {
            const desc = await getTranslationDescription(v);
            return [v, desc] as const;
        })
    );

    return Object.fromEntries(results);
}
