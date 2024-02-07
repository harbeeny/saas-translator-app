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

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({subscription}),
}));