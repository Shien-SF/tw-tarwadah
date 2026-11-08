// Merchant links may navigate within the store or to HTTPS destinations only.
export function actionUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  const input = value.trim();
  if (!input || /[\u0000-\u0020\\]/.test(input) || input.startsWith('//')) return '';
  if (input.startsWith('/') || input.startsWith('#')) return input;
  try {
    const url = new URL(input);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}
