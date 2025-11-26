import { MMKV } from "react-native-mmkv";
import translate from "translate";

// Optional: use Google Cloud Translate API key if you have one
translate.engine = "google";
translate.key = process.env.GOOGLE_API_KEY || "";

// Persistent MMKV cache for translations
const translationCache = new MMKV({ id: "translation-cache" });

// Current language stored here
export const languageStorage = new MMKV({ id: "language-storage" });

// Default fallback language
export const getCurrentLanguage = () =>
  languageStorage.getString("user-language") || "en";

export const setCurrentLanguage = (
  lang: string | number | boolean | ArrayBuffer
) => {
  languageStorage.set("user-language", lang);
};

// Core translation function
export const translateText = async (text: string) => {
  const lang = getCurrentLanguage();

  // Don’t translate API data or dynamic numbers
  if (!text || lang === "en" || /\d/.test(text)) return text;

  const cacheKey = `${lang}:${text}`;

  // Check cache first
  const cached = translationCache.getString(cacheKey);
  if (cached) return cached;

  try {
    const translated = await translate(text, lang);
    translationCache.set(cacheKey, translated);
    return translated;
  } catch (err) {
    if (err instanceof Error) {
      console.warn("Translation failed for:", text, err.message);
    } else {
      console.warn("Translation failed for:", text, err);
    }
    return text; // fallback
  }
};
