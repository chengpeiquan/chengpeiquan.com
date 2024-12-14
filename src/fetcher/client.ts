// A decorator that adds the base URL to each request
const addBaseUrl = (
  _target: unknown,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: unknown[]) {
    const endpoint = args[0]
    // @ts-expect-error Unimportant type warnings
    args[0] = new URL(endpoint, this.baseUrl).toString()
    return originalMethod.apply(this, args)
  }
}

interface RequestOptions extends RequestInit {
  queryParams?: Record<string, string>
}

export class FetchClient {
  constructor(private baseUrl: string) {}

  @addBaseUrl
  public async get(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<Response> {
    return this.request(endpoint, { method: 'GET', ...options })
  }

  @addBaseUrl
  public async post(
    endpoint: string,
    body: any,
    options?: RequestOptions,
  ): Promise<Response> {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    })
  }

  @addBaseUrl
  public async put(
    endpoint: string,
    body: any,
    options?: RequestOptions,
  ): Promise<Response> {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    })
  }

  @addBaseUrl
  public async delete(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<Response> {
    return this.request(endpoint, { method: 'DELETE', ...options })
  }

  private async request(
    endpoint: string,
    options: RequestOptions,
  ): Promise<any> {
    const url = this.buildUrl(endpoint, options.queryParams)
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    })
    const requestOptions: RequestInit = { ...options, headers }

    const response = await fetch(url, requestOptions)
    return response
  }

  private buildUrl(
    endpoint: string,
    queryParams?: Record<string, string>,
  ): string {
    const url = new URL(endpoint, this.baseUrl)
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
    return url.toString()
  }
}
