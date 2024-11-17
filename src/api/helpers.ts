import { API_BASE_URL, API_KEY } from "@config/constants";

export async function apiFetcher(url: string, config?: RequestInit) {
  const headers = new Headers();
  headers.append("x_cg_demo_api_key", API_KEY);

  const response = await fetch(API_BASE_URL + url, { method: "GET", headers, ...config });
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  else throw data;
}
