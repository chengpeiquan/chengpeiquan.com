import { isString } from '@bassist/utils'

type WithBaseUrl = { baseUrl: string }

type DecoratedFetchMethod = (
  this: WithBaseUrl,
  endpoint: string,
  ...rest: unknown[]
) => Promise<Response>

// A decorator that adds the base URL to each request
const addBaseUrl = (
  _target: unknown,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value as DecoratedFetchMethod

  descriptor.value = async function (this: WithBaseUrl, ...args: unknown[]) {
    const endpoint = args[0]
    if (!isString(endpoint)) {
      throw new TypeError('Expected first argument to be a string endpoint')
    }
    const resolved = new URL(endpoint, this.baseUrl).toString()
    return originalMethod.call(this, resolved, ...args.slice(1))
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
    const headers = new Headers({ 'Content-Type': 'application/json' })
    if (options.headers !== undefined) {
      new Headers(options.headers).forEach((value, key) => {
        headers.set(key, value)
      })
    }
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
