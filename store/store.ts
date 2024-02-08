import { Subscription } from "@/types/Subscription";
import { create } from "zustand";

export type LanguagesSupported = 
    | "en"
    | "de"
    | "fr"
    | "es"
    | "ja"
    | "zh"
    | "ar"
    | "he"
    | "bs"
    | "el"
    | "it"
    | "ko"
    | "pt"
    | "ja"
    | "vi";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> ={ 
    en: "Enlgish",
    es: "Spanish",
    de: "German",
    fr: "French",
    ar: "Arabic",
    bs: "Bosnian",
    zh: "Mandarin",
    el: "Greek",
    he: "Hebrew",
    it: "Italian",
    ko: "Korean",
    pt: "Portugese",
    vi: "Vietnamese",
    ja: "Japanese",
};    

interface LanguageState {
    language: LanguagesSupported;
    setLanguage: (language: LanguagesSupported) => void;
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
  }
  
  export const useLanguageStore = create<LanguageState>()((set, get) => ({
    language: "en",
    setLanguage: (language: LanguagesSupported) => set({ language }),
    getLanguages: (isPro: boolean) => {
      // If the user is pro, return all supported languages
      if (isPro)
        return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
  
      // If not pro, return only the first two languages
      return Object.keys(LanguagesSupportedMap).slice(
        0,
        2
      ) as LanguagesSupported[];
    },
    getNotSupportedLanguages: (isPro: boolean) => {
      if (isPro) return []; // No unsupported languages for "pro" users
      return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[]; 
      // Excluding the first two supported languages
    },
  }));

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({subscription}),
}));