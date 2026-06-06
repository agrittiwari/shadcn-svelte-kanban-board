type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassValue = ClassDictionary | ClassValue[] | bigint | number | string | false | null | undefined;

function flattenClassValue(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenClassValue);
  }

  if (typeof value === 'object') {
    return Object.entries(value)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([className]) => className);
  }

  return [String(value)];
}

export function cn(...values: unknown[]) {
  return values.flatMap(flattenClassValue).join(' ');
}

export function createId(prefix = 'item') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
