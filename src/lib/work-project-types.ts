export const WORK_PROJECT_TYPES = [
  "Business Systems",
  "SaaS Platforms",
  "E-Commerce Websites",
  "Websites",
  "Automation & AI",
] as const;

export type WorkProjectType = (typeof WORK_PROJECT_TYPES)[number];

export const WORK_PROJECT_TYPE_OPTIONS = WORK_PROJECT_TYPES.map((type) => ({
  value: type,
  label: type,
}));

export function isWorkProjectType(value: string): value is WorkProjectType {
  return WORK_PROJECT_TYPES.includes(value as WorkProjectType);
}

export function normalizeWorkProjectType(value: string) {
  const cleanValue = value
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
    .trim();

  if (isWorkProjectType(cleanValue)) {
    return cleanValue;
  }

  const lowerValue = cleanValue.toLowerCase();

  if (
    lowerValue.includes("saas") ||
    lowerValue.includes("platform")
  ) {
    return "SaaS Platforms";
  }

  if (
    lowerValue.includes("e-commerce") ||
    lowerValue.includes("ecommerce") ||
    lowerValue.includes("commerce")
  ) {
    return "E-Commerce Websites";
  }

  if (
    lowerValue.includes("web design") ||
    lowerValue.includes("web development") ||
    lowerValue.includes("website")
  ) {
    return "Websites";
  }

  if (
    lowerValue.includes("automation") ||
    lowerValue.includes("ai")
  ) {
    return "Automation & AI";
  }

  return "Business Systems";
}

export function slugifyWorkProjectType(value: string) {
  return normalizeWorkProjectType(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
