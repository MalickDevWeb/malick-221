import 'dotenv/config';

export const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:6302';
export const testPassword = process.env.SEED_TEST_PASSWORD ?? 'TestOnly-Malick-2026!';

export async function apiRequest(
  method: string,
  path: string,
  options: { token?: string; body?: unknown; headers?: Record<string, string> } = {},
) {
  const headers = new Headers(options.headers);
  if (options.token) headers.set('Authorization', `Bearer ${options.token}`);
  if (options.body !== undefined) headers.set('Content-Type', 'application/json');

  const response = await fetch(new URL(path, apiBaseUrl), {
    method,
    headers,
    ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
  });
  const text = await response.text();
  let data: any;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { status: response.status, data };
}

export async function login(identity: string, endpoint = '/auth/login') {
  const result = await apiRequest('POST', endpoint, {
    body: { identity, password: testPassword },
  });
  if (result.status !== 200) throw new Error(`Login ${identity} a répondu ${result.status}.`);
  return result.data.accessToken as string;
}
