export function cooperfilmeApi(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "localhost:3000";
  const url = new URL(path, baseUrl);

  return fetch(url, init);
}
