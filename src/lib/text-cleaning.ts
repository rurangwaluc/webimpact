export function cleanText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";

  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/[\u00A0]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .trim();
}

export function cleanLongText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";

  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .replace(/[\u00A0]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function cleanSlug(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function cleanKeywordList(value: FormDataEntryValue | null) {
  return cleanText(value)
    .split(",")
    .map((item) => cleanText(item))
    .filter(Boolean);
}

export function cleanFaqList(value: FormDataEntryValue | null) {
  return cleanLongText(value)
    .split(/\n{1,}/)
    .map((line) => cleanText(line))
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf("|");

      if (separatorIndex === -1) return null;

      const question = cleanText(line.slice(0, separatorIndex));
      const answer = cleanText(line.slice(separatorIndex + 1));

      if (!question || !answer) return null;

      return { question, answer };
    })
    .filter(
      (item): item is { question: string; answer: string } => Boolean(item),
    );
}
