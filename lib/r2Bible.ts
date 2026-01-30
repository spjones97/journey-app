export const R2_BASE_URL =
    "https://pub-de614d490a0a4a9b9015654b2b82a6a2.r2.dev";

export async function fetchBible(version: string) {
    const res = await fetch(`${R2_BASE_URL}/${version}.json`);

    if (!res.ok) {
        throw new Error(`Failed to load ${version}`);
    }

    return res.json();
}

export async function fetchAvailableVersions(): Promise<string[]> {
    const res = await fetch(`${R2_BASE_URL}/versions.json`);
    if (!res.ok) throw new Error("Failed to load versions list");

    return res.json();
}

