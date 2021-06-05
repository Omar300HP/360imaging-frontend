import { english_locale } from "./EN.js";

export default function renderStaticText(key) {
  return english_locale[key];
}
