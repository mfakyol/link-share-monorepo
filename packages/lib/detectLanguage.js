export default function detectLanguage(window) {
  return window?.navigator?.language?.split("-")[0] || "en";
}
