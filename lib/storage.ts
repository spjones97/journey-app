import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@journey:userData";

export type StoredUserData = {
    highlights: Record<string, boolean>;
    notes: Record<string, string>;
};

const EMPTY_DATA: StoredUserData = {
    highlights: {},
    notes: {},
};

export async function loadUserData(): Promise<StoredUserData> {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return EMPTY_DATA;
        return JSON.parse(raw);
    } catch (e) {
        console.warn("Failed to load user data", e);
        return EMPTY_DATA;
    }
}

export async function saveUserData(data: StoredUserData) {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn("Failed to save user data", e);
    }
}
