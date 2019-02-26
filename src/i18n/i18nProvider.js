import portugueseMessages from "../i18n/pt-BR";
import englishMessages from "../i18n/en";

const i18nProvider = locale => {
  if (locale === "en") {
    return englishMessages;
  }

  return portugueseMessages;
};

export default i18nProvider;
