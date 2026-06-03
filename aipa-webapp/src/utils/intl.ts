import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ru from "./lang/ru.json";
import en from "./lang/en.json";
import ua from "./lang/ua.json";

const dictionaries: Record<string, Record<string, string>> = {
  RU: ru as Record<string, string>,
  EN: en as Record<string, string>,
  UA: ua as Record<string, string>,
};

export function useTranslation() {
  const lang = useSelector((state: RootState) => state.main.lang) || "EN";
  
  const t = (key: string, defaultMessage?: string): string => {
    const activeLang = lang.toUpperCase();
    const dict = dictionaries[activeLang] || dictionaries.EN;
    if (dict && dict[key]) {
      return dict[key];
    }
    return defaultMessage || key;
  };

  return { t, lang };
}
