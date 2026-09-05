/** Contrato de transporte HTTP (DIP: los servicios dependen de esta abstraccion). */
export interface HttpClient {
  get<T>(path: string, init?: RequestInit): Promise<T>;
  post<T>(path: string, body: unknown, init?: RequestInit): Promise<T>;
}

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

interface ApiErrorBody {
  message?: string | string[];
  error?: string;
}

function extractMessage(status: number, body: unknown): string {
  const parsed = body as ApiErrorBody | null;
  const raw = parsed?.message ?? parsed?.error;
  if (Array.isArray(raw)) return raw.join('. ');
  if (typeof raw === 'string' && raw.trim()) return raw;
  return `Error ${status}`;
}

export class FetchHttpClient implements HttpClient {
  constructor(private readonly baseUrl: string) {}

  get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...init, method: 'GET' });
  }

  post<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...init,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      body: JSON.stringify(body),
    });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, init);
    const text = await response.text();
    const payload: unknown = text ? safeParse(text) : null;

    if (!response.ok) {
      throw new HttpError(response.status, extractMessage(response.status, payload), payload);
    }
    return payload as T;
  }
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
